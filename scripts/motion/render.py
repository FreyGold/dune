#!/usr/bin/env python3
"""Render a short project film from labeled footage and a JSON storyboard.

Run from the repository root: python3 scripts/motion/render.py scripts/motion/cortex.json
The project descriptions are supplied in JSON so that each film can state its
footage source and verification limits. The only dependencies are Pillow and
FFmpeg.
"""
import argparse
import json
import math
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

W, H, FPS, SECONDS = 1280, 720, 24, 18
SANS = '/usr/share/fonts/liberation/LiberationSans-Regular.ttf'
BOLD = '/usr/share/fonts/liberation/LiberationSans-Bold.ttf'
MONO = '/usr/share/fonts/liberation/LiberationMono-Regular.ttf'
SERIF = '/usr/share/fonts/liberation/LiberationSerif-Bold.ttf'
FONTS = {}


def font(size, kind='bold'):
    key = (size, kind)
    if key not in FONTS:
        FONTS[key] = ImageFont.truetype({'bold': BOLD, 'regular': SANS, 'mono': MONO, 'serif': SERIF}[kind], size)
    return FONTS[key]


def clamp(x):
    return max(0.0, min(1.0, x))


def ease(x):
    x = clamp(x)
    return 1 - (1 - x) ** 3


def interval(t, a, b):
    return ease((t - a) / (b - a))


def rgb(hex_color):
    v = hex_color.lstrip('#')
    return tuple(int(v[i:i+2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    t = clamp(t)
    return tuple(round(x + (y-x)*t) for x,y in zip(a,b))


def write(draw, pos, value, size, color, kind='bold', anchor=None):
    draw.text(pos, value, font=font(size, kind), fill=color, anchor=anchor, stroke_width=0)


def light_theme(c):
    return c.get('identity') in ('paper', 'sunrise', 'humanist', 'ledger')


def theme_base(c):
    return {'paper':(245,241,233), 'sunrise':(255,237,218),
            'humanist':(230,242,234), 'ledger':(246,237,229)}.get(c.get('identity'),(7,13,25))


def background(t, accent, c):
    identity=c.get('identity', 'orbit')
    bases={'paper': (245,241,233), 'sunrise': (255,237,218), 'humanist':(230,242,234),
           'ledger':(246,237,229), 'sound': (26,15,39),
           'studio': (24,19,42), 'music': (10,18,58), 'blueprint': (8,31,52),
           'field': (8,37,27), 'orbit': (7,13,25)}
    base=bases.get(identity, bases['orbit'])
    im = Image.new('RGB', (W,H), base)
    d = ImageDraw.Draw(im)
    if identity in ('paper','sunrise','humanist','ledger'):
        if identity=='ledger':
            for y in range(0,H,80): d.line((0,y,W,y),fill=mix(base,accent,.12),width=2)
            for x in range(500,W,200): d.line((x,0,x,H),fill=mix(base,accent,.12),width=2)
            d.rectangle((0,0,17,H),fill=accent)
            return im
        if identity=='humanist':
            for i in range(4):
                x=880+i*85; y=150+i*64
                d.ellipse((x,y,x+175,y+175),outline=mix(base,accent,.28),width=3)
            d.rectangle((0,0,17,H),fill=accent)
            return im
        for i in range(6):
            x=920+i*70+int(t*4)%70
            d.line((x,0,x-230,H),fill=mix(base,accent,.12),width=2)
        d.ellipse((970,350,1510,890),outline=mix(base,accent,.18),width=3)
        d.rectangle((0,0,17,H),fill=accent)
        return im
    if identity == 'sound':
        for i in range(35):
            x=790+i*13
            h=30+125*abs(math.sin(i*.31+t*.8))
            d.line((x,390-h,x,390+h),fill=mix(base,accent,.18),width=3)
        return im
    if identity == 'field':
        for x in range(30,W,180): d.line((x,0,x,H),fill=(13,55,39),width=1)
        d.rectangle((720,120,1220,600),outline=(32,85,58),width=3)
        d.line((970,120,970,600),fill=(32,85,58),width=3)
        d.ellipse((900,290,1040,430),outline=(32,85,58),width=3)
        return im
    if identity in ('studio','music'):
        for i in range(5):
            off=i*45+int(t*5)%45
            d.rounded_rectangle((790+off,85+off,1130+off,425+off),25,outline=mix(base,accent,.17),width=2)
        if identity=='music':
            d.ellipse((880,80,1380,580),outline=mix(base,accent,.3),width=2)
        return im
    # An asymmetric technical grid moves at a different speed from the text.
    for x in range(-100, W+200, 92):
        xx = x + int((t*9) % 92)
        d.line((xx, 0, xx-190, H), fill=(13, 26, 43), width=1)
    for y in range(90, H, 90):
        d.line((0, y, W, y), fill=(13, 26, 43), width=1)
    cx, cy = 1010, 340
    for radius in (120, 220, 330):
        d.ellipse((cx-radius,cy-radius,cx+radius,cy+radius), outline=(19,38,57), width=1)
    angle = t * 0.5
    for radius in (120,220,330):
        x = cx+math.cos(angle+radius/100)*radius
        y = cy+math.sin(angle+radius/100)*radius
        d.ellipse((x-4,y-4,x+4,y+4), fill=accent)
    return im


def opening(t, c, accent):
    im = background(t, accent, c)
    d=ImageDraw.Draw(im)
    if light_theme(c):
        base=theme_base(c)
        a=interval(t,.1,.9)
        if c.get('identity') in ('sunrise','humanist','ledger'):
            write(d,(75,65),c['project']+'  /  '+c['kicker'],17,(69,66,61),'mono')
            for n,line in enumerate(c['opening'][:2]):
                p=interval(t,.15+n*.2,.85+n*.2)
                write(d,(75+int((1-p)*55),185+n*115),line,91,mix(base,(32,32,31) if n==0 else accent,p),'serif')
            d.line((75,470,75+int(460*a),470),fill=accent,width=3)
            write(d,(75,510),c['subhead'],22,(65,65,62),'regular')
            if c.get('identity')=='sunrise':
                d.ellipse((855,170,1145,460),outline=accent,width=4)
                d.arc((880,195,1120,435),-90,-90+int(310*interval(t,.2,2.3)),fill=accent,width=12)
            elif c.get('identity')=='ledger':
                for i in range(3):
                    y=215+i*73
                    d.rectangle((850,y,850+int((280-i*55)*interval(t,.3+i*.2,1+i*.2)),y+25),fill=accent)
            else:
                for i in range(3):
                    x=905+i*82
                    d.ellipse((x,260,x+48,308),outline=accent,width=3)
            return im
        write(d,(640,70),c['project']+'  /  '+c['kicker'],16,(69,66,61),'mono',anchor='ma')
        for n,line in enumerate(c['opening'][:2]):
            p=interval(t,.15+n*.2,.85+n*.2)
            write(d,(640,190+n*120+int((1-p)*50)),line,100,mix(base,(32,32,31) if n==0 else accent,p),'serif',anchor='ma')
        d.line((440,495,440+int(400*a),495),fill=accent,width=3)
        write(d,(640,535),c['subhead'],23,(65,65,62),'regular',anchor='ma')
        return im
    if c.get('identity') in ('sound','studio','music'):
        p=interval(t,0,.8)
        write(d,(55,65),c['project']+'  /  '+c['kicker'],17,(185,172,208),'mono')
        if c.get('identity')=='music':
            d.ellipse((840,145,1190,495),outline=accent,width=4)
            for r in (125,85,45): d.ellipse((1015-r,320-r,1015+r,320+r),outline=mix((10,18,58),accent,.45),width=2)
        elif c.get('identity')=='studio':
            d.rounded_rectangle((50,125,54+int(770*p),480),18,outline=mix((24,19,42),accent,.65),width=2)
        else:
            d.line((55,130,55+int(760*p),130),fill=accent,width=4)
        for n,line in enumerate(c['opening'][:2]):
            a=interval(t,.2+n*.2,.8+n*.2)
            write(d,(85+int((1-a)*50),175+n*105),line,83,mix((24,19,42),(246,246,250) if n==0 else accent,a))
        write(d,(85,423),c['subhead'],21,(195,194,208),'regular')
        write(d,(58,650),'PROJECT FILM',15,accent,'mono')
        return im
    d.rectangle((54,50,54+260*interval(t,0,.7),54), fill=accent)
    write(d,(55,75),c['project']+'  /  '+c['kicker'],15,(162,189,209),'mono')
    lines = c['opening']
    for n,line in enumerate(lines[:2]):
        a = interval(t,.25+n*.18,.85+n*.18)
        y = int(160+n*111+(1-a)*60)
        color = mix((7,13,25), (244,249,252) if n==0 else accent, a)
        write(d,(50,y),line,100,color)
    a=interval(t,1.0,1.7)
    write(d,(57,426+int((1-a)*20)),c['subhead'],23,mix((7,13,25),(184,199,210),a),'regular')
    d.line((57,500,57+int(300*interval(t,1.4,2.6)),500), fill=accent, width=3)
    write(d,(57,640),'PROJECT FILM  /  01',15,(111,147,172),'mono')
    write(d,(1190,645),'→',30,accent,anchor='ra')
    return im


def feature_scene(t, c, accent):
    variant = c.get('layout', 'cards')
    if variant == 'flow':
        return flow_scene(t, c, accent)
    if variant == 'planner':
        return planner_scene(t, c, accent)
    if variant == 'transform':
        return transform_scene(t, c, accent)
    if variant == 'stock':
        return stock_scene(t, c, accent)
    if variant == 'jobs':
        return jobs_scene(t, c, accent)
    if variant == 'voice':
        return voice_scene(t, c, accent)
    if variant == 'music':
        return music_scene(t, c, accent)
    if variant == 'architecture':
        return architecture_scene(t, c, accent)
    if variant == 'solver':
        return solver_scene(t, c, accent)
    im=background(t*.4,accent,c)
    d=ImageDraw.Draw(im)
    write(d,(56,53),c['project']+'  /  THE IDEA',15,(148,180,204),'mono')
    headline = c.get('feature_headline', ['THE PROJECT', 'AT A GLANCE.'])
    write(d,(53,95),headline[0],59,(240,246,250))
    write(d,(53,161),headline[1],59,accent)
    write(d,(56,247),c['feature_note'],22,(178,200,215),'regular')
    features=c['features']
    top=312
    for i,(num,title,desc) in enumerate(features[:3]):
        a=interval(t,.15+i*.27,.8+i*.27)
        x=55+i*405
        y=top+int((1-a)*85)
        fill=mix((8,16,29),(15,32,50),a)
        d.rounded_rectangle((x,y,x+379,y+235),radius=6,fill=fill,outline=mix((8,16,29),(40,74,96),a),width=2)
        d.rectangle((x+23,y+26,x+23+int(60*a),y+29),fill=accent)
        write(d,(x+24,y+44),num,16,mix(fill,accent,a),'mono')
        write(d,(x+24,y+85),title,31,mix(fill,(240,247,250),a))
        write(d,(x+24,y+145),desc,18,mix(fill,(174,196,207),a),'regular')
        # Bars appear in sequence instead of simulating a working feature.
        for j in range(3):
            width=int((250-j*48)*interval(t,.8+i*.27+j*.1,1.25+i*.27+j*.1))
            d.rounded_rectangle((x+24,y+184+j*12,x+24+width,y+188+j*12),radius=2,fill=(34,67,88))
    d.line((55,620,1225,620),fill=(42,65,82),width=1)
    write(d,(55,638),c.get('feature_footer','THE PROJECT DESCRIBES THESE FEATURES'),18,(160,187,206),'regular')
    return im


def scene_title(d, c, accent):
    primary=(35,38,37) if light_theme(c) else (239,247,250)
    secondary=(75,75,70) if light_theme(c) else (151,180,200)
    write(d,(56,48),c['project']+'  /  PROJECT OVERVIEW',15,secondary,'mono')
    lines=c['feature_headline']
    write(d,(53,90),lines[0],53,primary)
    write(d,(53,151),lines[1],53,accent)
    write(d,(57,224),c['feature_note'],24,secondary,'regular')


def flow_scene(t, c, accent):
    """Show records, requests and messages as linked workspace areas."""
    im=background(t*.4,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    yy=428
    for i,(num,title,desc) in enumerate(c['features']):
        a=interval(t,.15+i*.3,.9+i*.3)
        x=210+i*430
        radius=int(53*a)
        if i<2:
            length=int(260*interval(t,.7+i*.3,1.6+i*.3))
            d.line((x+75,yy,x+75+length,yy),fill=(43,94,91),width=3)
            if length>70:
                pulse=(t*110+i*95)%length
                d.ellipse((x+75+pulse-5,yy-5,x+75+pulse+5,yy+5),fill=accent)
        if radius:
            d.ellipse((x-radius,yy-radius,x+radius,yy+radius),fill=(241,248,240) if light_theme(c) else (13,39,39),outline=accent,width=2)
            write(d,(x,yy),num,23,accent,'mono',anchor='mm')
        start=theme_base(c) if light_theme(c) else (7,13,25)
        write(d,(x,510+int((1-a)*15)),title,27,mix(start,(29,45,39) if light_theme(c) else (241,249,246),a),anchor='ma')
        write(d,(x,553+int((1-a)*15)),desc,16,mix(start,(71,83,76) if light_theme(c) else (174,200,195),a),'regular',anchor='ma')
    return im


def planner_scene(t,c,accent):
    """Animate a planning sequence and a focus timer as an illustration."""
    im=background(t*.35,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    a=interval(t,.15,.9)
    x,y=65,315+int((1-a)*35)
    d.rounded_rectangle((x,y,x+640,y+286),16,fill=(20,29,47),outline=(54,72,99),width=2)
    write(d,(x+28,y+25),'STUDY PLAN',17,(169,190,214),'mono')
    tasks=['Choose a task','Make time to focus','Review your progress']
    for i,line in enumerate(tasks):
        show=interval(t,.35+i*.35,.9+i*.35)
        ry=y+72+i*62
        d.rounded_rectangle((x+28,ry,x+606,ry+47),7,fill=(29,40,61))
        d.ellipse((x+42,ry+12,x+64,ry+34),outline=accent,width=2)
        if show>.45:
            d.line((x+47,ry+23,x+52,ry+29,x+60,ry+18),fill=accent,width=3)
        write(d,(x+79,ry+12),line,20,mix((29,40,61),(225,235,244),show),'regular')
    cx,cy=985,458
    d.ellipse((cx-130,cy-130,cx+130,cy+130),outline=(46,66,90),width=12)
    d.arc((cx-130,cy-130,cx+130,cy+130),-90,-90+int(310*interval(t,.3,3.8)),fill=accent,width=12)
    write(d,(cx,cy-28),'FOCUS',18,(172,190,207),'mono',anchor='mm')
    write(d,(cx,cy+18),'25:00',49,(245,248,252),anchor='mm')
    write(d,(985,622),'ILLUSTRATED WORKFLOW',16,(75,67,59) if light_theme(c) else (143,165,183),'mono',anchor='ma')
    return im


def transform_scene(t,c,accent):
    """Animate source material into a conceptual Markdown note."""
    im=background(t*.35,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    show=interval(t,.1,.8)
    x1,y=76+int((1-show)*-90),307
    x2=798+int((1-show)*90)
    d.rounded_rectangle((x1,y,x1+375,y+285),10,fill=(24,28,44),outline=(69,77,111),width=2)
    d.rounded_rectangle((x2,y,x2+398,y+285),10,fill=(24,28,44),outline=accent,width=2)
    write(d,(x1+25,y+24),'SOURCE MATERIAL',17,accent,'mono')
    write(d,(x2+25,y+24),'MARKDOWN NOTE',17,accent,'mono')
    for i,width in enumerate((290,265,310,200,276)):
        w=int(width*interval(t,.25+i*.13,.65+i*.13))
        d.rounded_rectangle((x1+25,y+80+i*30,x1+25+w,y+86+i*30),3,fill=(83,96,124))
    write(d,(x2+25,y+80),'# Structured note',25,(236,240,251))
    for i,width in enumerate((290,245,286)):
        w=int(width*interval(t,1.5+i*.2,1.9+i*.2))
        d.rounded_rectangle((x2+25,y+132+i*35,x2+25+w,y+138+i*35),3,fill=(90,103,144))
    start,end=x1+400,x2-35
    d.line((start,y+142,end,y+142),fill=(68,79,126),width=3)
    for i in range(3):
        phase=clamp((t-.65-i*.25)/1.4)
        if 0<phase<1:
            xx=start+(end-start)*ease(phase)
            d.ellipse((xx-7,y+135,xx+7,y+149),fill=accent)
    write(d,(640,635),'ILLUSTRATION • GENERATION NOT TESTED',13,(158,173,201),'mono',anchor='ma')
    return im


def stock_scene(t,c,accent):
    """Show sample stock flowing to invoices and reports."""
    im=background(t*.35,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    x,y=58,309
    d.rounded_rectangle((x,y,x+510,y+290),12,fill=(35,25,31),outline=(96,58,65),width=2)
    write(d,(x+26,y+23),'SAMPLE STOCK',17,accent,'mono')
    for i,(label,bar) in enumerate((('CEMENT',.72),('STEEL',.48),('PAINT',.29))):
        yy=y+76+i*63
        write(d,(x+27,yy),label,16,(223,211,211),'mono')
        d.rounded_rectangle((x+152,yy+4,x+472,yy+19),5,fill=(70,43,48))
        width=int(320*bar*interval(t,.3+i*.22,1.2+i*.22))
        d.rounded_rectangle((x+152,yy+4,x+152+width,yy+19),5,fill=accent)
    for i,(label,detail) in enumerate((('INVOICES','Review a sale'),('REPORTS','See low stock'))):
        a=interval(t,.8+i*.4,1.5+i*.4)
        xx=660+int((1-a)*60)
        yy=327+i*150
        d.rounded_rectangle((xx,yy,1208,yy+121),10,fill=(35,25,31),outline=(111,65,69),width=2)
        d.rectangle((xx,yy,xx+6,yy+121),fill=accent)
        write(d,(xx+32,yy+22),label,28,(246,237,236))
        write(d,(xx+32,yy+67),detail,18,(197,175,177),'regular')
    write(d,(58,631),'BROWSER PREVIEW  /  SAMPLE DATA  /  READ-ONLY',16,(77,62,61) if light_theme(c) else (178,152,155),'mono')
    return im


def jobs_scene(t,c,accent):
    """Move from a search query to a stack of listing cards."""
    im=background(t*.3,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    d.rounded_rectangle((65,318,600,390),12,fill=(37,31,31),outline=accent,width=2)
    d.ellipse((89,337,114,362),outline=accent,width=3)
    d.line((109,358,119,368),fill=accent,width=3)
    query='Search by keyword'
    length=int(len(query)*interval(t,.2,1.5))
    write(d,(140,338),query[:length],21,(235,228,220),'regular')
    for i,label in enumerate(('KEYWORD','LOCATION','WORK MODE')):
        a=interval(t,.6+i*.18,1+i*.18)
        d.rounded_rectangle((67+i*165,425,214+i*165,464),18,fill=mix((7,13,25),(78,52,44),a))
        write(d,(80+i*165,435),label,13,mix((7,13,25),(235,192,167),a),'mono')
    for i in range(3):
        a=interval(t,.7+i*.27,1.4+i*.27)
        x=680+int((1-a)*135); y=300+i*112
        d.rounded_rectangle((x,y,1190,y+93),9,fill=(38,31,33),outline=(101,71,59),width=2)
        d.rectangle((x+19,y+17,x+24,y+76),fill=accent)
        write(d,(x+45,y+15),'LISTING',17,(237,228,218),'mono')
        for j,w in enumerate((215,145)):
            d.rectangle((x+45,y+45+j*17,x+45+int(w*a),y+49+j*17),fill=(120,91,78))
    write(d,(65,615),'CONCEPT ANIMATION  /  LISTINGS APPEAR IN THE RECORDING',16,(83,71,63) if light_theme(c) else (170,150,141),'mono')
    return im


def voice_scene(t,c,accent):
    """Animate a waveform crossing into text."""
    im=background(t*.35,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    x,y=75,335
    d.rounded_rectangle((x,y,568,y+210),14,fill=(17,28,49),outline=(52,74,107),width=2)
    write(d,(x+24,y+22),'SPEECH INPUT',17,accent,'mono')
    for i in range(35):
        xx=x+32+i*12
        active=interval(t,.15+i*.025,.45+i*.025)
        h=(8+48*abs(math.sin(i*.64+t*3)))*active
        d.rounded_rectangle((xx,y+120-h,xx+5,y+120+h),2,fill=accent)
    d.line((594,y+105,704,y+105),fill=(65,82,125),width=3)
    phase=(t*.7)%1
    xx=594+110*phase
    d.ellipse((xx-6,y+99,xx+6,y+111),fill=accent)
    d.rounded_rectangle((726,y,1200,y+210),14,fill=(17,28,49),outline=accent,width=2)
    write(d,(750,y+22),'TEXT OUTPUT',17,accent,'mono')
    line='Words appear in the active app.'
    n=int(len(line)*interval(t,1.0,3.4))
    write(d,(750,y+92),line[:n],23,(236,242,252),'regular')
    cursor_x=750+int(font(23,'regular').getlength(line[:n]))
    if (int(t*2)%2)==0:
        d.rectangle((cursor_x+3,y+90,cursor_x+5,y+122),fill=accent)
    write(d,(77,615),'ILLUSTRATED FLOW  /  OWNER FOOTAGE FOLLOWS',13,(145,165,190),'mono')
    return im


def music_scene(t,c,accent):
    """Animate the described server-to-phone music flow."""
    im=background(t*.3,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    nodes=[(180,'LINK','A track or playlist'),(565,'SERVER','Prepares audio'),(990,'IPHONE','Stores tracks')]
    for i,(cx,title,desc) in enumerate(nodes):
        a=interval(t,.1+i*.25,.7+i*.25)
        if i<2:
            xx=nodes[i+1][0]
            end=cx+90+int((xx-cx-180)*interval(t,.5+i*.45,1.3+i*.45))
            d.line((cx+90,421,end,421),fill=(54,101,149),width=3)
            dot=cx+90+max(0,end-cx-90)*((t*.6)%1)
            d.ellipse((dot-5,416,dot+5,426),fill=accent)
        boxw=150 if i<2 else 108
        d.rounded_rectangle((cx-boxw/2,335,cx+boxw/2,507),15,fill=(17,29,50),outline=mix((17,29,50),accent,a),width=2)
        if i==0:
            write(d,(cx,398),'♪',66,mix((17,29,50),accent,a),'regular',anchor='mm')
        elif i==1:
            for j in range(3):
                d.rounded_rectangle((cx-48,376+j*29,cx+48,395+j*29),4,outline=accent,width=2)
        else:
            d.rounded_rectangle((cx-33,355,cx+33,482),8,outline=accent,width=2)
            write(d,(cx,418),'↓',44,accent,'regular',anchor='mm')
        write(d,(cx,535),title,25,(236,245,250),anchor='ma')
        write(d,(cx,574),desc,16,(159,184,202),'regular',anchor='ma')
    write(d,(640,646),'SOURCE-BASED CONCEPT  /  CURRENT NATIVE APP NOT SHOWN',13,(139,164,188),'mono',anchor='ma')
    return im


def architecture_scene(t,c,accent):
    """Show frontend outside Compose and services inside it."""
    im=background(t*.3,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    d.rounded_rectangle((465,290,1223,611),18,outline=(47,96,91),width=2)
    write(d,(492,305),'DOCKER COMPOSE',15,accent,'mono')
    boxes=[(55,385,350,520,'FRONTEND','Runs separately'),(520,385,810,520,'GO SERVICE','Application'),
           (875,335,1178,432,'POSTGRESQL','Persistence'),(875,472,1178,569,'REDIS','Job storage')]
    for i,(x1,y1,x2,y2,title,desc) in enumerate(boxes):
        a=interval(t,.1+i*.23,.7+i*.23)
        d.rounded_rectangle((x1,y1,x2,y2),10,fill=(17,42,43),outline=mix((17,42,43),accent,a),width=2)
        write(d,(x1+21,y1+23),title,21,mix((17,42,43),(229,248,241),a))
        write(d,(x1+21,y1+62),desc,16,mix((17,42,43),(160,199,188),a),'regular')
    d.line((350,453,515,453),fill=accent,width=3)
    d.line((810,423,870,385),fill=accent,width=3)
    d.line((810,490,870,520),fill=accent,width=3)
    p=(t*.5)%1
    d.ellipse((350+165*p-5,448,350+165*p+5,458),fill=(233,255,247))
    write(d,(56,645),'SOURCE DIAGRAM  /  WELCOME TASK ENQUEUE IS NOT IMPLEMENTED',13,(139,178,170),'mono')
    return im


def solver_scene(t,c,accent):
    """Animate challenge requirements passing through a local solver."""
    im=background(t*.3,accent,c)
    d=ImageDraw.Draw(im)
    scene_title(d,c,accent)
    labels=[('01','WEB APP'),('02','EXTENSION'),('03','LOCAL API'),('04','SOLVER')]
    for i,(num,label) in enumerate(labels):
        cx=145+i*328; cy=390
        a=interval(t,.1+i*.23,.7+i*.23)
        if i<3:
            end=cx+80+int(168*interval(t,.5+i*.25,1.2+i*.25))
            d.line((cx+80,cy,end,cy),fill=(67,121,92),width=3)
            pulse=cx+80+max(0,end-cx-80)*((t*.8+i*.2)%1)
            d.ellipse((pulse-5,cy-5,pulse+5,cy+5),fill=accent)
        d.rounded_rectangle((cx-70,cy-65,cx+70,cy+65),12,fill=(17,39,34),outline=mix((17,39,34),accent,a),width=2)
        write(d,(cx,cy-28),num,16,accent,'mono',anchor='mm')
        write(d,(cx,cy+12),label,16,(225,243,229),anchor='mm')
    # The return path is drawn after the forward path.
    length=int(940*interval(t,1.8,3.2))
    d.line((1130,470,1130,515,1130-length,515),fill=accent,width=3)
    write(d,(640,565),'PROPOSED SQUAD RETURNS TO THE WEB APP',16,(178,218,185),'mono',anchor='ma')
    write(d,(640,630),'SOURCE-BASED DIAGRAM  /  GAME NOT RECORDED',13,(143,179,151),'mono',anchor='ma')
    return im


def screen_scene(t, c, accent, screen):
    im=background(t*.4,accent,c)
    d=ImageDraw.Draw(im)
    # Scale to preserve the source aspect ratio; the source fills most of the frame.
    target_w=1152
    target_h=560
    frame=screen.resize((target_w,target_h),Image.Resampling.LANCZOS)
    if c.get('screen_mode')=='job_montage' and t>=4.8:
        # Enlarge the centre of the detail page after the list and filter shots.
        frame=frame.crop((276,0,876,292)).resize((target_w,target_h),Image.Resampling.LANCZOS)
    entrance=interval(t,0,.85)
    x=int(64+(1-entrance)*240)
    im.paste(frame,(x,0))
    d=ImageDraw.Draw(im)
    # A translucent lower third is separate from the footage and labels it.
    shade=Image.new('RGBA',(W,H),(0,0,0,0))
    sd=ImageDraw.Draw(shade)
    sd.rectangle((0,560,W,H),fill=(5,13,24,224))
    sd.rectangle((0,560,int(W*interval(t,.2,1.1)),564),fill=(*accent,255))
    slide=interval(t,.35,1.05)
    write(sd,(58,573+int((1-slide)*18)),c['screen_title'],36,(255,255,255,255))
    lines=[]
    line=''
    for word in c['screen_note'].split():
        candidate=(line+' '+word).strip()
        if sd.textlength(candidate,font=font(40,'regular'))>W-120 and line:
            lines.append(line)
            line=word
        else:
            line=candidate
    if line: lines.append(line)
    for i,line in enumerate(lines[:2]):
        write(sd,(59,618+i*43+int((1-slide)*10)),line,40,(195,220,234,255),'regular')
    im=Image.alpha_composite(im.convert('RGBA'),shade).convert('RGB')
    return im


def closing(t,c,accent):
    im=background(t,accent,c)
    d=ImageDraw.Draw(im)
    if light_theme(c):
        base=theme_base(c)
        if c.get('identity') in ('sunrise','humanist','ledger'):
            write(d,(75,75),c['project']+'  /  PROJECT FILM',17,(67,68,64),'mono')
            for i,line in enumerate(c['closing'][:3]):
                a=interval(t,.1+i*.2,.7+i*.2)
                write(d,(75+int((1-a)*65),165+i*100),line,70,mix(base,(32,38,36) if i!=1 else accent,a),'serif')
            d.line((75,525,75+int(650*interval(t,.4,1.5)),525),fill=accent,width=3)
            write(d,(75,560),c['closing_note'],22,(61,68,63),'regular')
            return im
        write(d,(640,95),c['project']+'  /  PROJECT FILM',17,(67,68,64),'mono',anchor='ma')
        for i,line in enumerate(c['closing'][:3]):
            a=interval(t,.1+i*.2,.7+i*.2)
            write(d,(230+i*410,280+int((1-a)*65)),line,45,mix(base,(32,38,36) if i!=1 else accent,a),'serif',anchor='ma')
        d.line((140,395,140+int(1000*interval(t,.4,1.5)),395),fill=accent,width=3)
        write(d,(640,455),c['closing_note'],21,(61,68,63),'regular',anchor='ma')
        return im
    if c.get('identity') in ('sound','music','studio'):
        for i,line in enumerate(c['closing'][:3]):
            a=interval(t,.05+i*.17,.7+i*.17)
            write(d,(110+int((1-a)*80),110+i*130),line,76,mix((24,19,42),(244,246,250) if i!=1 else accent,a))
            d.line((900,135+i*130,900+int(220*a),135+i*130),fill=accent,width=5)
        write(d,(110,590),c['project']+'  /  '+c['closing_note'],20,(188,197,215),'regular')
        return im
    d.rectangle((55,60,55+int(300*interval(t,0,.8)),64),fill=accent)
    for i,line in enumerate(c['closing'][:3]):
        a=interval(t,.1+i*.15,.65+i*.15)
        write(d,(54+int((1-a)*70),150+i*105),line,82,mix((7,13,25),accent if i==2 else (240,247,250),a))
    write(d,(57,545),c['project']+'  /  '+c['closing_note'],16,(151,180,202),'mono')
    d.ellipse((1010,235,1180,405),outline=accent,width=2)
    a=t*.9
    x=1095+85*math.cos(a); y=320+85*math.sin(a)
    d.ellipse((x-6,y-6,x+6,y+6),fill=accent)
    return im


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('storyboard')
    args=parser.parse_args()
    with open(args.storyboard,encoding='utf-8') as f: c=json.load(f)
    accent=rgb(c['accent'])
    segments=c.get('screen_segments')
    if segments:
        choices='+'.join('between(t,%s,%s)' % (a,b) for a,b in segments)
        time_filter="select='%s',setpts=N/24/TB,fps=24,tpad=stop_mode=clone:stop_duration=2," % choices
        source_args=['-i',c['screen']]
    else:
        time_filter='fps=24,'
        source_args=['-stream_loop','-1','-i',c['screen']]
    if c.get('screen_mode')=='portrait_closeup':
        # Crop the tall source after enlarging it and move through its content.
        geometry="scale=750:-2,crop=750:560:0:'(in_h-out_h)*(0.5+0.4*sin(t*0.6))',pad=1152:560:(ow-iw)/2:(oh-ih)/2:color=0x070d19"
    else:
        geometry='scale=1152:560:force_original_aspect_ratio=decrease,pad=1152:560:(ow-iw)/2:(oh-ih)/2:color=0x070d19'
    decoder=subprocess.Popen(['ffmpeg','-v','error']+source_args+['-vf',time_filter+geometry,
        '-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE,stderr=subprocess.DEVNULL)
    output=c['output']
    os.makedirs(os.path.dirname(output),exist_ok=True)
    encoder=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24',
        '-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','fast',
        '-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',output],stdin=subprocess.PIPE)
    try:
        for frame_num in range(SECONDS*FPS):
            t=frame_num/FPS
            if t < 3.5:
                im=opening(t,c,accent)
            elif t < 8.0:
                im=feature_scene(t-3.5,c,accent)
            elif t < 15.4:
                raw=decoder.stdout.read(1152*560*3)
                if len(raw)!=1152*560*3: raise RuntimeError('Screen recording ended early')
                im=screen_scene(t-8,c,accent,Image.frombytes('RGB',(1152,560),raw))
            else:
                im=closing(t-15.4,c,accent)
            # A fast full-frame colour wipe makes each cut visible as motion.
            for boundary in (3.5,8.0,15.4):
                dt=t-boundary
                if -.22 <= dt < .22:
                    phase=(dt+.22)/.44
                    left=int(-W+2*W*phase)
                    d=ImageDraw.Draw(im)
                    kind=c.get('transition','diagonal')
                    if kind=='vertical':
                        top=int(-H+2*H*phase)
                        d.rectangle((0,top,W,top+H),fill=accent)
                    elif kind=='split':
                        size=int(W*min(2*phase,2-2*phase)/2)
                        d.rectangle((0,0,size,H),fill=accent)
                        d.rectangle((W-size,0,W,H),fill=accent)
                    elif kind=='circle':
                        radius=int(900*min(2*phase,2-2*phase))
                        d.ellipse((W/2-radius,H/2-radius,W/2+radius,H/2+radius),fill=accent)
                    else:
                        d.polygon([(left,0),(left+W,0),(left+W-220,H),(left-220,H)], fill=accent)
                    break
            encoder.stdin.write(im.tobytes())
        encoder.stdin.close()
        if encoder.wait()!=0: raise RuntimeError('Video encoding failed')
    finally:
        decoder.stdout.close()
        decoder.terminate()
        try:
            decoder.wait(timeout=3)
        except subprocess.TimeoutExpired:
            decoder.kill()
            decoder.wait()
    print(output)


if __name__=='__main__':
    main()

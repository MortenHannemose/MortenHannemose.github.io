"use strict";function teapot(r){function a(r,a,t){for(var h=0;h<u.length;h++)u[h][0]+=r,u[h][1]+=a,u[h][2]+=t}function t(r,a,t){for(var h=0;h<u.length;h++)u[h][0]*=r,u[h][1]*=a,u[h][2]*=t;for(h=0;h<M.length;h++)M[h][0]/=r,M[h][1]/=a,M[h][2]/=t}function h(r,a){for(var t=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]),h=a[0]/t,s=a[1]/t,o=a[2]/t,n=Math.cos(radians(r)),e=1-n,f=Math.sin(radians(r)),p=[[h*h*e+n,h*s*e-o*f,h*o*e+s*f],[h*s*e+o*f,s*s*e+n,s*o*e-h*f],[h*o*e-s*f,s*o*e+h*f,o*o*e+n]],v=0;v<u.length;v++){for(var c=[0,0,0],i=[0,0,0],w=0;w<3;w++)for(var y=0;y<3;y++)c[w]+=p[w][y]*u[v][y],i[w]+=p[w][y]*M[v][y];for(w=0;w<3;w++)u[v][w]=c[w],M[v][w]=i[w]}}var s,o={};s=r||3;var n=[[1.4,0,2.4],[1.4,-.784,2.4],[.784,-1.4,2.4],[0,-1.4,2.4],[1.3375,0,2.53125],[1.3375,-.749,2.53125],[.749,-1.3375,2.53125],[0,-1.3375,2.53125],[1.4375,0,2.53125],[1.4375,-.805,2.53125],[.805,-1.4375,2.53125],[0,-1.4375,2.53125],[1.5,0,2.4],[1.5,-.84,2.4],[.84,-1.5,2.4],[0,-1.5,2.4],[-.784,-1.4,2.4],[-1.4,-.784,2.4],[-1.4,0,2.4],[-.749,-1.3375,2.53125],[-1.3375,-.749,2.53125],[-1.3375,0,2.53125],[-.805,-1.4375,2.53125],[-1.4375,-.805,2.53125],[-1.4375,0,2.53125],[-.84,-1.5,2.4],[-1.5,-.84,2.4],[-1.5,0,2.4],[-1.4,.784,2.4],[-.784,1.4,2.4],[0,1.4,2.4],[-1.3375,.749,2.53125],[-.749,1.3375,2.53125],[0,1.3375,2.53125],[-1.4375,.805,2.53125],[-.805,1.4375,2.53125],[0,1.4375,2.53125],[-1.5,.84,2.4],[-.84,1.5,2.4],[0,1.5,2.4],[.784,1.4,2.4],[1.4,.784,2.4],[.749,1.3375,2.53125],[1.3375,.749,2.53125],[.805,1.4375,2.53125],[1.4375,.805,2.53125],[.84,1.5,2.4],[1.5,.84,2.4],[1.75,0,1.875],[1.75,-.98,1.875],[.98,-1.75,1.875],[0,-1.75,1.875],[2,0,1.35],[2,-1.12,1.35],[1.12,-2,1.35],[0,-2,1.35],[2,0,.9],[2,-1.12,.9],[1.12,-2,.9],[0,-2,.9],[-.98,-1.75,1.875],[-1.75,-.98,1.875],[-1.75,0,1.875],[-1.12,-2,1.35],[-2,-1.12,1.35],[-2,0,1.35],[-1.12,-2,.9],[-2,-1.12,.9],[-2,0,.9],[-1.75,.98,1.875],[-.98,1.75,1.875],[0,1.75,1.875],[-2,1.12,1.35],[-1.12,2,1.35],[0,2,1.35],[-2,1.12,.9],[-1.12,2,.9],[0,2,.9],[.98,1.75,1.875],[1.75,.98,1.875],[1.12,2,1.35],[2,1.12,1.35],[1.12,2,.9],[2,1.12,.9],[2,0,.45],[2,-1.12,.45],[1.12,-2,.45],[0,-2,.45],[1.5,0,.225],[1.5,-.84,.225],[.84,-1.5,.225],[0,-1.5,.225],[1.5,0,.15],[1.5,-.84,.15],[.84,-1.5,.15],[0,-1.5,.15],[-1.12,-2,.45],[-2,-1.12,.45],[-2,0,.45],[-.84,-1.5,.225],[-1.5,-.84,.225],[-1.5,0,.225],[-.84,-1.5,.15],[-1.5,-.84,.15],[-1.5,0,.15],[-2,1.12,.45],[-1.12,2,.45],[0,2,.45],[-1.5,.84,.225],[-.84,1.5,.225],[0,1.5,.225],[-1.5,.84,.15],[-.84,1.5,.15],[0,1.5,.15],[1.12,2,.45],[2,1.12,.45],[.84,1.5,.225],[1.5,.84,.225],[.84,1.5,.15],[1.5,.84,.15],[-1.6,0,2.025],[-1.6,-.3,2.025],[-1.5,-.3,2.25],[-1.5,0,2.25],[-2.3,0,2.025],[-2.3,-.3,2.025],[-2.5,-.3,2.25],[-2.5,0,2.25],[-2.7,0,2.025],[-2.7,-.3,2.025],[-3,-.3,2.25],[-3,0,2.25],[-2.7,0,1.8],[-2.7,-.3,1.8],[-3,-.3,1.8],[-3,0,1.8],[-1.5,.3,2.25],[-1.6,.3,2.025],[-2.5,.3,2.25],[-2.3,.3,2.025],[-3,.3,2.25],[-2.7,.3,2.025],[-3,.3,1.8],[-2.7,.3,1.8],[-2.7,0,1.575],[-2.7,-.3,1.575],[-3,-.3,1.35],[-3,0,1.35],[-2.5,0,1.125],[-2.5,-.3,1.125],[-2.65,-.3,.9375],[-2.65,0,.9375],[-2,-.3,.9],[-1.9,-.3,.6],[-1.9,0,.6],[-3,.3,1.35],[-2.7,.3,1.575],[-2.65,.3,.9375],[-2.5,.3,1.125],[-1.9,.3,.6],[-2,.3,.9],[1.7,0,1.425],[1.7,-.66,1.425],[1.7,-.66,.6],[1.7,0,.6],[2.6,0,1.425],[2.6,-.66,1.425],[3.1,-.66,.825],[3.1,0,.825],[2.3,0,2.1],[2.3,-.25,2.1],[2.4,-.25,2.025],[2.4,0,2.025],[2.7,0,2.4],[2.7,-.25,2.4],[3.3,-.25,2.4],[3.3,0,2.4],[1.7,.66,.6],[1.7,.66,1.425],[3.1,.66,.825],[2.6,.66,1.425],[2.4,.25,2.025],[2.3,.25,2.1],[3.3,.25,2.4],[2.7,.25,2.4],[2.8,0,2.475],[2.8,-.25,2.475],[3.525,-.25,2.49375],[3.525,0,2.49375],[2.9,0,2.475],[2.9,-.15,2.475],[3.45,-.15,2.5125],[3.45,0,2.5125],[2.8,0,2.4],[2.8,-.15,2.4],[3.2,-.15,2.4],[3.2,0,2.4],[3.525,.25,2.49375],[2.8,.25,2.475],[3.45,.15,2.5125],[2.9,.15,2.475],[3.2,.15,2.4],[2.8,.15,2.4],[0,0,3.15],[0,-.002,3.15],[.002,0,3.15],[.8,0,3.15],[.8,-.45,3.15],[.45,-.8,3.15],[0,-.8,3.15],[0,0,2.85],[.2,0,2.7],[.2,-.112,2.7],[.112,-.2,2.7],[0,-.2,2.7],[-.002,0,3.15],[-.45,-.8,3.15],[-.8,-.45,3.15],[-.8,0,3.15],[-.112,-.2,2.7],[-.2,-.112,2.7],[-.2,0,2.7],[0,.002,3.15],[-.8,.45,3.15],[-.45,.8,3.15],[0,.8,3.15],[-.2,.112,2.7],[-.112,.2,2.7],[0,.2,2.7],[.45,.8,3.15],[.8,.45,3.15],[.112,.2,2.7],[.2,.112,2.7],[.4,0,2.55],[.4,-.224,2.55],[.224,-.4,2.55],[0,-.4,2.55],[1.3,0,2.55],[1.3,-.728,2.55],[.728,-1.3,2.55],[0,-1.3,2.55],[1.3,0,2.4],[1.3,-.728,2.4],[.728,-1.3,2.4],[0,-1.3,2.4],[-.224,-.4,2.55],[-.4,-.224,2.55],[-.4,0,2.55],[-.728,-1.3,2.55],[-1.3,-.728,2.55],[-1.3,0,2.55],[-.728,-1.3,2.4],[-1.3,-.728,2.4],[-1.3,0,2.4],[-.4,.224,2.55],[-.224,.4,2.55],[0,.4,2.55],[-1.3,.728,2.55],[-.728,1.3,2.55],[0,1.3,2.55],[-1.3,.728,2.4],[-.728,1.3,2.4],[0,1.3,2.4],[.224,.4,2.55],[.4,.224,2.55],[.728,1.3,2.55],[1.3,.728,2.55],[.728,1.3,2.4],[1.3,.728,2.4],[0,0,0],[1.5,0,.15],[1.5,.84,.15],[.84,1.5,.15],[0,1.5,.15],[1.5,0,.075],[1.5,.84,.075],[.84,1.5,.075],[0,1.5,.075],[1.425,0,0],[1.425,.798,0],[.798,1.425,0],[0,1.425,0],[-.84,1.5,.15],[-1.5,.84,.15],[-1.5,0,.15],[-.84,1.5,.075],[-1.5,.84,.075],[-1.5,0,.075],[-.798,1.425,0],[-1.425,.798,0],[-1.425,0,0],[-1.5,-.84,.15],[-.84,-1.5,.15],[0,-1.5,.15],[-1.5,-.84,.075],[-.84,-1.5,.075],[0,-1.5,.075],[-1.425,-.798,0],[-.798,-1.425,0],[0,-1.425,0],[.84,-1.5,.15],[1.5,-.84,.15],[.84,-1.5,.075],[1.5,-.84,.075],[.798,-1.425,0],[1.425,-.798,0]],e=32,f=new Array(e);f[0]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],f[1]=[3,16,17,18,7,19,20,21,11,22,23,24,15,25,26,27],f[2]=[18,28,29,30,21,31,32,33,24,34,35,36,27,37,38,39],f[3]=[30,40,41,0,33,42,43,4,36,44,45,8,39,46,47,12],f[4]=[12,13,14,15,48,49,50,51,52,53,54,55,56,57,58,59],f[5]=[15,25,26,27,51,60,61,62,55,63,64,65,59,66,67,68],f[6]=[27,37,38,39,62,69,70,71,65,72,73,74,68,75,76,77],f[7]=[39,46,47,12,71,78,79,48,74,80,81,52,77,82,83,56],f[8]=[56,57,58,59,84,85,86,87,88,89,90,91,92,93,94,95],f[9]=[59,66,67,68,87,96,97,98,91,99,100,101,95,102,103,104],f[10]=[68,75,76,77,98,105,106,107,101,108,109,110,104,111,112,113],f[11]=[77,82,83,56,107,114,115,84,110,116,117,88,113,118,119,92],f[12]=[120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135],f[13]=[123,136,137,120,127,138,139,124,131,140,141,128,135,142,143,132],f[14]=[132,133,134,135,144,145,146,147,148,149,150,151,68,152,153,154],f[15]=[135,142,143,132,147,155,156,144,151,157,158,148,154,159,160,68],f[16]=[161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176],f[17]=[164,177,178,161,168,179,180,165,172,181,182,169,176,183,184,173],f[18]=[173,174,175,176,185,186,187,188,189,190,191,192,193,194,195,196],f[19]=[176,183,184,173,188,197,198,185,192,199,200,189,196,201,202,193],f[20]=[203,203,203,203,206,207,208,209,210,210,210,210,211,212,213,214],f[21]=[203,203,203,203,209,216,217,218,210,210,210,210,214,219,220,221],f[22]=[203,203,203,203,218,223,224,225,210,210,210,210,221,226,227,228],f[23]=[203,203,203,203,225,229,230,206,210,210,210,210,228,231,232,211],f[24]=[211,212,213,214,233,234,235,236,237,238,239,240,241,242,243,244],f[25]=[214,219,220,221,236,245,246,247,240,248,249,250,244,251,252,253],f[26]=[221,226,227,228,247,254,255,256,250,257,258,259,253,260,261,262],f[27]=[228,231,232,211,256,263,264,233,259,265,266,237,262,267,268,241],f[28]=[269,269,269,269,278,279,280,281,274,275,276,277,270,271,272,273],f[29]=[269,269,269,269,281,288,289,290,277,285,286,287,273,282,283,284],f[30]=[269,269,269,269,290,297,298,299,287,294,295,296,284,291,292,293],f[31]=[269,269,269,269,299,304,305,278,296,302,303,274,293,300,301,270];for(var u=[],M=[],p=[],v=[],c=function(r){var a=new Array(4),t=1-r;return a[3]=t*t*t,a[2]=3*t*t*r,a[1]=3*t*r*r,a[0]=r*r*r,a},i=function(r){var a=[];return a.push(3*r*r),a.push(3*r*(2-3*r)),a.push(3*(1-4*r+3*r*r)),a.push(-3*(1-r)*(1-r)),a},w=[0,0,0],y=0;y<306;y++)for(var A=0;A<3;A++)w[A]+=n[y][A];for(A=0;A<3;A++)w[A]/=306;for(y=0;y<306;y++)for(A=0;A<3;A++)n[y][A]-=w[A]/2;var l=1/s,q=new Array(e);for(y=0;y<e;y++)q[y]=new Array(16);for(y=0;y<e;y++)for(A=0;A<16;A++)q[y][A]=[n[f[y][A]][0],n[f[y][A]][2],n[f[y][A]][1],1];for(var I=0;I<e;I++){var P=new Array(s+1);for(A=0;A<=s;A++)P[A]=new Array(s+1);for(y=0;y<=s;y++)for(A=0;A<=s;A++){P[y][A]=vec4(0,0,0,1);for(var d=y*l,g=A*l,m=new Array(4),x=0;x<4;x++)m[x]=new Array(4);for(x=0;x<4;x++)for(var C=0;C<4;C++)m[x][C]=c(d)[x]*c(g)[C];for(x=0;x<4;x++)for(C=0;C<4;C++){var T=q[I][4*x+C];T=[m[x][C]*T[0],m[x][C]*T[1],m[x][C]*T[2],0],P[y][A]=[P[y][A][0]+T[0],P[y][A][1]+T[1],P[y][A][2]+T[2],1]}}var V=new Array(s+1);for(A=0;A<=s;A++)V[A]=new Array(s+1);var z=new Array(s+1);for(A=0;A<=s;A++)z[A]=new Array(s+1);var N=new Array(s+1);for(A=0;A<=s;A++)N[A]=new Array(s+1);for(y=0;y<=s;y++)for(A=0;A<=s;A++){V[y][A]=[0,0,0,0],N[y][A]=[0,0,0,0],z[y][A]=[0,0,0,0];d=y*l,g=A*l;var b=new Array(4);for(x=0;x<4;x++)b[x]=new Array(4);var j=new Array(4);for(x=0;x<4;x++)j[x]=new Array(4);for(x=0;x<4;x++)for(C=0;C<4;C++)b[x][C]=i(d)[x]*c(g)[C],j[x][C]=c(d)[x]*i(g)[C];for(x=0;x<4;x++)for(C=0;C<4;C++){T=vec4(q[I][4*x+C]);T=scale(b[x][C],T),z[y][A]=add(z[y][A],T);var k=vec4(q[I][4*x+C]);k=scale(j[x][C],k),N[y][A]=add(N[y][A],k)}T=cross(z[y][A],N[y][A]),V[y][A]=vec4(T[0],T[1],T[2],0),length(V[y][A])>1e-6&&(V[y][A]=normalize(V[y][A]))}for(y=0;y<s;y++)for(A=0;A<s;A++){u.push([P[y][A][0],P[y][A][1],P[y][A][2],1]),M.push([V[y][A][0],V[y][A][1],V[y][A][2],0]);var B=[P[y][A][0],P[y][A][1],P[y][A][2]],D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI]),u.push([P[y+1][A][0],P[y+1][A][1],P[y+1][A][2],1]),M.push([V[y+1][A][0],V[y+1][A][1],V[y+1][A][2],0]),B=[P[y+1][A][0],P[y+1][A][1],P[y+1][A][2]];D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI]),u.push([P[y+1][A+1][0],P[y+1][A+1][1],P[y+1][A+1][2],1]),M.push([V[y+1][A+1][0],V[y+1][A+1][1],V[y+1][A+1][2],0]),B=[P[y+1][A+1][0],P[y+1][A+1][1],P[y+1][A+1][2]];D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI]),u.push([P[y][A][0],P[y][A][1],P[y][A][2],1]),M.push([V[y][A][0],V[y][A][1],V[y][A][2],0]),B=[P[y][A][0],P[y][A][1],P[y][A][2]];D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI]),u.push([P[y+1][A+1][0],P[y+1][A+1][1],P[y+1][A+1][2],1]),M.push([V[y+1][A+1][0],V[y+1][A+1][1],V[y+1][A+1][2],0]),B=[P[y+1][A+1][0],P[y+1][A+1][1],P[y+1][A+1][2]];D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI]),u.push([P[y][A+1][0],P[y][A+1][1],P[y][A+1][2],1]),M.push([V[y][A+1][0],V[y][A+1][1],V[y][A+1][2],0]),B=[P[y][A+1][0],P[y][A+1][1],P[y][A+1][2]];D=Math.sqrt(B[0]*B[0]+B[1]*B[1]+B[2]*B[2]);B=[B[0]/D,B[1]/D,B[2]/D],p.push([.5*B[0]+.5,.5*B[1]+.5,.5*B[2]+.5,1]),v.push([.5*Math.acos(B[0])/Math.PI,.5*Math.asin(B[1]/Math.sqrt(1-B[0]*B[0]))/Math.PI])}}return o.TriangleVertices=u,o.Normals=M,o.translate=a,o.scale=t,o.rotate=h,o.VertexColors=p,o.TextureCoordinates=v,o}
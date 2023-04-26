const Examples: {name: string, content:string}[] = [
    {
        name: 'Basic loop',
        content: '\
\n\
;Increments ax at each iteration of the loop    \n\
;---------------------------------------    \n\
\n\
mov cx, 10h \n\
mov ax, 0   \n\
\n\
lbl:        \n\
    inc ax  \n\
    loop lbl\n\
\n\
ret\n\
\n\
;---------------------------------------    \n\
        '
    },

    {
        name: 'Fibonacci',
        content: '\
\n\
;Compute the Fibonacci sequence for N=16    \n\
;---------------------------------------    \n\
\n\
mov cx, 10h \n\
mov ax, 0   \n\
mov bx, 1   \n\
\n\
lbl:        \n\
    mov dx, bx  \n\
    add bx, ax  \n\
    loop lbl\n\
ret         \n\
; --- Result in bx\n\
\n\
;---------------------------------------    \n\
        '
    },

    {
        name: 'Macros call',
        content: '\
\n\
;Define simple macro    \n\
;---------------------------------------    \n\
\n\
addition 15, 20      \n\
ret                  \n\
\n\
;---------------------------------------    \n\
\n\
addition macro a, b  \n\
\t  mov ax, a        \n\
\t  add bx, b        \n\
\t  add ax, bx       \n\
endm                 \n\
        '
    },

    {
        name: 'Procedures definition',
        content: '\
call addition        \n\
ret                  \n\
\n\
;---------------------------------------    \n\
\n\
proc addition        \n\
;Update the def      \n\
\t  mov ax, a        \n\
\t  add bx, b        \n\
\t  add ax, bx       \n\
endm                 \n\
        '
    },

    {
        name: 'Variable management',
        content: '\
tab db 10, DUP(0), 5 \n\
        '
    },
];

export default Examples;
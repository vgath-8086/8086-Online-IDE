function mkZ80(ez80) {
  var keywords1, keywords2;
  if (ez80) {
    keywords1 = /^(exx?|(ld|cp)([di]r?)?|[lp]ea|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|[de]i|halt|im|in([di]mr?|ir?|irx|2r?)|ot(dmr?|[id]rx|imr?)|out(0?|[di]r?|[di]2r?)|tst(io)?|slp)(\.([sl]?i)?[sl])?\b/i;
    keywords2 = /^(((call|j[pr]|rst|ret[in]?)(\.([sl]?i)?[sl])?)|(rs|st)mix)\b/i;
  } else {
    keywords1 = /^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i;
    keywords2 = /^(call|j[pr]|ret[in]?|b_?(call|jump))\b/i;
  }

  var variables1 = /^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i;
  var variables2 = /^(n?[zc]|p[oe]?|m)\b/i;
  var errors = /^([hl][xy]|i[xy][hl]|slia|sll)\b/i;
  var numbers = /^([\da-f]+h|[0-7]+o|[01]+b|\d+d?)\b/i;

  return {
    name: "z80",
    startState: function() {
      return {
        context: 0
      };
    },
    token: function(stream, state) {
      console.log('wesh');
      
      if (!stream.column())
        state.context = 0;

      if (stream.eatSpace())
        return null;

      var w;

      if (stream.eatWhile(/\w/)) {
        if (ez80 && stream.eat('.')) {
          stream.eatWhile(/\w/);
        }
        w = stream.current();
        
        if (stream.indentation()) {
          if ((state.context == 1 || state.context == 4) && variables1.test(w)) {
            state.context = 4;
            return 'variable';
          }

          if (state.context == 2 && variables2.test(w)) {
            state.context = 4;
            return 'variableName.special';
          }

          if (keywords1.test(w)) {
            state.context = 1;
            return 'keyword';
          } else if (keywords2.test(w)) {
            state.context = 2;
            return 'keyword';
          } else if (state.context == 4 && numbers.test(w)) {
            return 'number';
          }

          if (errors.test(w))
            return 'error';
        } else if (stream.match(numbers)) {
          return 'number';
        } else {
          return null;
        }
      } else if (stream.eat(';')) {
        stream.skipToEnd();
        return 'comment';
      } else if (stream.eat('"')) {
        while (w = stream.next()) {
          if (w == '"')
            break;

          if (w == '\\')
            stream.next();
        }
        return 'string';
      } else if (stream.eat('\'')) {
        if (stream.match(/\\?.'/))
          return 'number';
      } else if (stream.eat('.') || stream.sol() && stream.eat('#')) {
        state.context = 5;

        if (stream.eatWhile(/\w/))
          return 'def';
      } else if (stream.eat('$')) {
        if (stream.eatWhile(/[\da-f]/i))
          return 'number';
      } else if (stream.eat('%')) {
        if (stream.eatWhile(/[01]/))
          return 'number';
      } else {
        stream.next();
      }
      return null;
    }
  };
};

  function nfasm86() {
    const builtinS = /^(jc|lea|add|adc|inc|sub|sbb|dec|neg|cmp|mul|imul|div|idiv|cbw|cwd|not|mov|push|pop|xchg|pushf|popf|SHL|SAL|SHR|SAR|ROL|ROR|RCL|RCR|AND|OR|TEST|XOR|REP|REPE|REPNE|((MOVS|CMPS|SCAS|LODS|STOS)(b|w))|CALL|JMP|RET|JE|JZ|JL|JNGE|JLE|JNG|JB|JNAE|JBE|JNA|JP|JPE|JO|JS|JNE|JNZ|JNL|JGE|JNLE|JG|JNB|JAE|JNBE|JA|JNP|JPO|JNO|JNS|LOOP|LOOPZ|LOOPE|LOOPNZ|LOOPNE|INT|CLC|CMC|STC|CLD|STD)\b/i;
    const builtin = /^(REP|REPE|REPNE|(MOVS|CMPS|SCAS|LODS|STOS)(b|w))\b/i;
    const RW = /^(ax|bx|cx|dx|si|di|bp|sp)\b/i;
    const RB = /^(al|bl|cl|dl|ah|bh|ch|dh)\b/i;  
    const RS = /^(cs|ds|es|ss)\b/i;    
    const macros = /^(org|endp|endm|proc)\b/i;
    const inlineMac = /^(offset|macro|db|du|dw)\b/i; 
    const defByteWord = /^(byte|word)\b/i;
    const comments = /;.*/;
    const numbers = /^(0x[0-9a-f]*h*|(0x)*[0-9]+[0-9a-f]*h|[0-9]+|[0-1]+b+)\b/i; 

    const labels = /[a-z_][a-z0-9_°]*\s*\:/i; 

    const operators = /[-+\/*=<>![\]:]+/;

    return {
      name: "asm86",
      startState: function() {

        return {
          context: 0
        };
      },
      token: function(stream, state) {

        var w: string;
        console.log(stream.current(), '?,');
        
        if (stream.eatSpace())
          return null;

        if (stream.eatWhile(/(\w|:)/)) {

          w = stream.current();

          //if (stream.eatSpace()) return null;
          console.log(w, '<--');
          
          if (w.match(labels)) return 'link';

          if (w.match(builtin)) return 'keyword';
          if (w.match(builtinS)) return 'keyword';

          if (w.match(defByteWord)) return 'property';
          if (w.match(inlineMac)) return 'tag';
          if (w.match(macros)) return 'tag';

          if (w.match(RW)) return 'def';
          if (w.match(RB)) return 'def';
          if (w.match(RS)) return 'property';

          if (w.match(numbers)) return 'number';
          if (w.match(comments)) return 'lineComment';
        }
        else if (stream.eat(';')) {
          stream.skipToEnd();
          return 'comment';
        } 
        else if (stream.eat('"')) {
          while (w = stream.next()) {
            if (w == '"')
              break;
  
            if (w == '\\')
              stream.next();
          }
          return 'string';
        }
        else if (stream.eat("'")) {
          while (w = stream.next()) {
            if (w == "'")
              break;
  
            if (w == '\\')
              stream.next();
          }
          return 'string';
        }
        else if (stream.match(operators)) {

          return "operator";
        }
        else {
          stream.eatWhile(/^(?!.*\w).*$/)
        }
        
        return null
      },

      languageData: {
        commentTokens: {line: ";"}
      }
    };
  };
  
  //export const asm86 = mkZ80(false)
  export const asm86 = nfasm86()

/*
mov ax, 45h
mov bx, 10h
div bx
cmp dx, word [48]
jg label:
ret

label:
    lea si, tab
    lp:
        mov ax, [si] 
        mul 2
        moh ah, 1
        int 21h
        loop lp
    ret

tab db 1, 2, 3 DUP(5)
*/

  let l = {
    start:[
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
        
        {regex: /(REP|REPE|REPNE)[\t\s]+(MOVS|CMPS|SCAS|LODS|STOS)(b|w)\b/i, token: 'builtin'}, //instrcution

        {regex: /[\s\t]*(jc|lea|add|adc|inc|sub|sbb|dec|neg|cmp|mul|imul|div|idiv|cbw|cwd|not|mov|push|pop|xchg|pushf|popf|SHL|SAL|SHR|SAR|ROL|ROR|RCL|RCR|AND|OR|TEST|XOR|REP|REPE|REPNE|(MOVS|CMPS|SCAS|LODS|STOS)(b|w)|CALL|JMP|RET|JE|JZ|JL|JNGE|JLE|JNG|JB|JNAE|JBE|JNA|JP|JPE|JO|JS|JNE|JNZ|JNL|JGE|JNLE|JG|JNB|JAE|JNBE|JA|JNP|JPO|JNO|JNS|LOOP|LOOPZ|LOOPE|LOOPNZ|LOOPNE|INT|CLC|CMC|STC|CLD|STD)\b/i, token: 'builtin', sol: true},                      //instrcution
        
        {regex: /(byte|word)/i, token: 'property'},    //byte word


        {regex: /[a-z_][a-z0-9_°]*\s*\:/i, token: 'link', indent: true},    //label
        {regex: /[\s\t]*(org|endp|endm|proc)\b/i, token: 'tag', sol: true},
        {regex: /[\s\t]+(offset|macro|db|du|dw)\b/i, token: 'tag'},     //prep
        {regex: /,(offset|macro|db|du|dw)\b/i, token: 'tag'},     //prep

        {regex: /[\s\t]+(ax|bx|cx|dx|si|di|bp|sp)\b/i, token: 'def'},         //REG 16
        {regex: /[\s\t]+(al|bl|cl|dl|ah|bh|ch|dh)\b/i, token: 'def'},  //REG  8
        {regex: /[\s\t]+(cs|ds|es|ss)\b/i, token: 'property'},                //REG SEG

        {regex: /,(ax|bx|cx|dx|si|di|bp|sp)\b/i, token: 'def'},         //REG 16
        {regex: /,(al|bl|cl|dl|ah|bh|ch|dh)\b/i, token: 'def'},  //REG  8
        {regex: /,(cs|ds|es|ss)\b/i, token: 'property'},                //REG SEG

        {regex: /[\s\t]*(ax|bx|cx|dx|si|di|bp|sp)\b/i, token: 'def', sol:true},         //REG 16
        {regex: /[\s\t]*(al|bl|cl|dl|ah|bh|ch|dh)\b/i, token: 'def', sol:true},  //REG  8
        {regex: /[\s\t]*(cs|ds|es|ss)\b/i, token: 'property', sol:true},                //REG SEG
        
        {regex: /[-+\/*=<>![\]:]+/, token: "tag"},
        {regex: /;.*/, token: "comment"},

        {regex: /^(\s+|,|\b)(0x[0-9a-f]*h*|(0x)*[0-9]+[0-9a-f]*h|[0-9]+)\b/i, token: 'number'}   //NB
    ],


    meta: {
        lineComment: ";"
    }

}
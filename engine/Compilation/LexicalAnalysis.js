const wordRegisters_Lexical = ['AX', 'BX', 'CX', 'DX', 'CS', 'DS', 'ES', 'SS', 'DI', 'SI', 'SP', 'BP', 'IP'];
const byteRegisters_Lexical = ['AH', 'AL', 'BH', 'BL', 'CH', 'CL', 'DL', 'DH'];
const segmentRegisters_Lexical = ['CS', 'DS', 'ES', 'SS'];
const Registers_Lexical = ['AX', 'BX', 'CX', 'DX', 'CS', 'DS', 'ES', 'SS', 'DI', 'SI', 'SP', 'BP', 'IP', 'AH', 'AL', 'BH', 'BL', 'CH', 'CL', 'DL', 'DH', 'CS', 'DS', 'ES', 'SS'];
const instructions=["JC" ,"JNE", "INT","JE","JE","JZ","JL","JNGE","JLE","JNG","JB","JNAE","JBE","JNA","JP","JPE","JO","JS","JNE","JNZ","JNL","JGE","JNLE","JG","JNB","JAE","JNBE","JA","JNP","JPO","JNO","JNS","LOOP","LOOPZ","LOOPE","LOOPNZ","LOOPNE","INT","CLC","CMC","STC","CLD","STD", "ENDM","JMP","CLC","RET","EQU","DEFINE","ORG","ENDP","MOV","PUSH", "POP", "XCHG","LEA","LAHF","SAHF","PUSHF","POPF" ,"ADD","ADC","DEC" ,"INC","AAA","SUB","SSB" ,"NEG" ,"CMP" ,"MUL","IMUL","DIV","IDIV","CBW","CWD","NOT","SHL","SAL","SHR", "SAR","ROL","ROR", "RCL","RCR","AND","TEST","OR","XOR","REP", "REPE", "REPNE", "MOVSB", "CMPSB", "SCASB","LODSB","STOSB","MOVSW", "CMPSW", "SCASW","LODSW","STOSW","CALL"]
const keywords=["MACRO","PROC"] ;
const BracketRegister = ['BX', 'BP', 'SI', 'DI'];
const preProIns = ["ORG", "DEFINE", "EQU", "PROC", "LOCAL", "ENDM", "ENDP", "OFFSET"];
 
 
const Stringinstructions = ["MOVSB", "CMPSB", "SCASB", "LODSB", "STOSB", "MOVSW", "CMPSW", "SCASW", "LODSW", "STOSW"];
"use strict";
/*
   instructionType = "prePropIns";
   instructionType = "InsSIM";
   expressionType = "INST","macro definition","VAR","MACRO","NULL";

*/

class LexicalAnalysis{
    lexical =
    {  
        good:true,
        expressionType:null,
        instructionType:null,
        label:[],
        message:null,
        instName:null,
        variableName:null,
        variableClass:null,
        operands: [],
        index:null
    };
    //return the firstKlma word from  a string 
    extractFirstAwel(str)
    {
        let t = str.trim().match(/(\w+\s*\:|\w+)/);
        
        return ((t == null) ? "":t[0].replace(/\s/g, ""));
    }
    analyse(s) {
        let tab = s.split(/\n/);
        let temp;
        let x = []
        // to know if there is an error just test the last element.good 
        for (let index = 0; index < tab.length; index++) 
        {
            
            const element = this.getRideOfTab( this.hide_comment(tab[index]) );
            
            temp = this.execute(element);
            temp.index = index;
            x.push(temp);

            if (!temp.good) 
                return {
                    status: false,
                    lexicalView: x,
                };
            
        }

        return {
            status: true,
            lexicalView: x
        };
    }

 execute(str)
 {
     this.lexical=
     {  good:true,
         expressionType:null,
         instructionType:null,
         label:[],
         message:null,
         instName:null,
         variableName:null,
         variableClass:null,
         operands:[]
      };
      
     let firstKlma = this.extractFirstAwel(str);
    
    while (this.lexical.good && firstKlma[ firstKlma.length - 1]==':')
     {
                
    
         if (this.legalName(firstKlma.replace(':','')))
         {
             this.lexical.label.push(firstKlma.replace(':','')); 
             str = str.replace(str.match(/(?<=\s*)(\w+\s*\:|\w+(?=\s+\w))/)[0],"").trim();
             firstKlma = this.extractFirstAwel(str);
         }
         else 
         {

             this.lexical.good=false;
             this.lexical.message="ERROR : Illegel expression ";
             console.log("errue : label false ");
         }

     }
     if (this.lexical.good && this.testMacro(str))
          this.testMacroOperands(str);
     else if (this.lexical.good && this.testVariable(str))
          this.testVarOperands(str);
     //else  this.lexical.good = this.testInst(str) ? this.testInstOps(str):false;
     else if (this.lexical.good && this.testInst(str) )
         this.lexical.good = this.testInstOps(str);//la beauté ta3 moh
     else if (this.lexical.good)
         this.testAppMacroOperand(str);
      
     return { ...this.lexical };
 }

 //check if the name is legal
 legalName(str){
     str = str.toUpperCase().trim();
     if (keywords.includes(str)||str==="" ||(/\W/.test(str))||(/^\d|^\-\-/.test(str)) || instructions.includes(str) || wordRegisters_Lexical.includes(str) || byteRegisters_Lexical.includes(str)) 
         return false;
     return true;
 }

 testVariable(str){
   let arr=str.toUpperCase().split(" ");
   
   
   if (arr[0] =="DB" || arr[0] == "DW"){
     this.lexical.expressionType="VAR";
     this.lexical.variableClass=arr[0];
     this.lexical.variableName=null;
       return true;

   }

   if (arr[1]=="DB" || arr[1] == "DW" ){

       if (this.legalName(arr[0])){
           this.lexical.variableName=arr[0];
           this.lexical.variableClass=arr[1];
           this.lexical.expressionType="VAR";            
       }
       else {
          this.lexical.good=false;
          this.message="ERROR : Illegal variable name";
          console.log("ERROR : Illegal variable name");
       }
     
       return true;

   }

 }

 rpl (str){
 
     var inString = false,
     accoType = '\"',
     strOp = '';
    var op = ' ';
    var arr=[];
    str=str.substring(str.indexOf(str.match(/db|dw/i)[0])+3,str.length).trim();
    for (var i =0.; i < str.length; i++) {

     //STRING PARAMETER MANAGEMENT
     //------------------------------------------------------------
         //CAS ACCOLADE   --- FIN STR
         if ( str[i] == accoType && inString ) {
             op = strOp + str[i];

             strOp = '';
             inString = false;
         }

         //CAS ACCOLADE   --- DEBUT STR
         else if ( (str[i] == '"' || str[i] == "'") && !inString) {
             strOp += str[i];
             inString = true;
             accoType = str[i];
         }

         else if ( str[i] != accoType && inString) {
             strOp += str[i];
         }

     //NON STRING PARAMETER
     else if ( str[i] == ',' && !inString ) {
         arr.push(op.trim());
         op = '  ';
     }
     else
         op += str[i];
     
 }
 if ( strOp != '' )
     op = strOp;
 if ( op != '' ) 
     arr.push(op.trim());


 return arr;
 }

    spl(str){
        str=str.trim();
           
        str=str.replace(/(?<=DUP\s*\([a-z0-9,\s]*),(?=[a-z0-9,\s]*\))/ig,"verreplacementinsup")
        let ops=this.rpl(str);

         
        for (let index = 0; index < ops.length; index++) {
            ops[index]=ops[index].replace(/verreplacementinsup/g,",");
        } 
        return ops;
    }
 
 testVarOperands(strt) {
     
     let str=strt.substring(strt.indexOf(strt.match(/db|dw/i)[0])+3,strt.length).trim();
     let ops = this.spl(strt);
     
     for (let index = 0; index < ops.length; index++) {
         const element = ops[index].trim();
         if (element == "") {
           this.lexical.good=false;
           this.lexical.message="ERROR : Wrong varibale value";
           return false;
         }
         else if (/^"/.test(element)||/^'/.test(element))
         {
            if (/(^").*("$)/.test(element)||/(^').*('$)/.test(element))

                this.lexical.operands.push({name:element.trim().toUpperCase(),type:"String"})
            else
            { 
                console.log("ERROR :  mismatched or misplaced quotes"); 
                this.lexical.message="ERROR : mismatched or misplaced quotes";
                this.lexical.good=false;
                return ;
            }
         }
        else if (this.isNumber(element)){
            this.lexical.operands.push({name:element.trim().toUpperCase(),type:"INT"})
         

        }
         else if (this.dupTest(element)){
             this.dupcheck(element);
           
         }
         else {
          this.lexical.good=false;
          this.lexical.message="ERROR : wrong value of variable";
          console.log("Error : wrong value of variable");
         }
     }
 }

 testMacro(str){
    let  arr=str.trim().toUpperCase().split(" ");
     if (arr[1] =="MACRO")
     {
        if (this.legalName(arr[0]))
        {
            this.lexical.expressionType="macro definition";
            this.lexical.instName = arr[0].trim().toUpperCase();
         
        }
        else {
            this.lexical.good=false;
            this.message="ERROR : Illegal Macro name";
        }
        return true;

     }
     else return false;
 }

    testMacroOperands(str){
       
        let opsStr=str.toUpperCase().substring(str.indexOf(str.match(/ Macro\s*/i)[0])+6,str.length); 
        if  (opsStr.trim()=="" ) return;
        let ops=opsStr.split(",") ; 
        for (let index = 0; index < ops.length; index++) {
            const element = ops[index];
            if (this.legalName(element.toUpperCase())){

                this.lexical.operands.push({name:element,type:"VAR"});
            }
            else {
                this.lexical.good=false;
            
                this.lexical.message="ERROR : Illegal parameter name"
                console.log("ERROR : Illegal parameter name"); 
                break;
            }
        }
        
    }

    dupTest(str){
        if (/dup/i.test(str)) return true;
        else return false;
    }

    dupcheck(str){
        

        let tableSize = str.match(/.*?(?=(dup))/i);
        let tableValue = str.match(/(?<=(dup\s*\()).*?(?=\))/i);
        

        if ((tableSize==null) || !(this.isNumber(tableSize[0].trim()))){
            this.lexical.good=false;
            this.message="ERROR : WRONG DUP PAREMETER";
            console.log("ERROR : WRONG DUP PAREMETER");
        }
        else 
            this.lexical.operands.push({name:tableSize[0],type:"DUPSIZE"})
        if (tableValue==null)
        {
        this.lexical.good=false;
        this.lexical.message="ERROR :wrong dup value"
        return;
        }
        else 
        if(tableValue[0].trim() =='' || tableValue[0].trim() == '?'  )
        {
            this.lexical.operands.push({name:"?",type:"DUP"})
        }  
        else {
        let ops=tableValue[0].split(",") ; 
        for (let index = 0; index < ops.length; index++)
        {
            const element = ops[index];
            if (this.isNumber(element.trim().toUpperCase())){
                this.lexical.operands.push({name:element.trim(),type:"DUP"});
            }
            else {
                this.lexical.good=false;
            
                this.lexical.message="ERROR : Illegal table value" 
                console.log("ERROR : Illegal table value");
                break;
            }
        }
    }
   
   


 }       
    Num(str) {
        if ((str==null)) return false 
        let v = str.replace(/(?<=\-)\s*(?=\w)/g, "");
            return /^0x[a-f0-9]+$|^0[A-F][A-Fa-f0-9]*h$|^\d+[A-Fa-f0-9]*h$|^[0-1]+(b$)|^\d+$|^"."$|^'.'$/i.test(str[0] === "-" ? v.replace("-", "") : str);
    }
    chartoascii(str) {
        if (/"."|'.'/i.test(str))
            return str.replace(/(?<=("|')).(?="|')/, str.charCodeAt(1).toString(10));
        else return str;
    }


    testAppMacroOperand(str){

        this.lexical.expressionType = "MACRO";
        this.lexical.instName = str.trim().split(' ')[0].trim().toUpperCase();

        str = str.trim();//Le cas où on a une ligne vide
        if ( str == '' ) 
        {
            this.lexical.expressionType = "NULL";
            return;
        }

        if ( !this.legalName(str.split(' ')[0].trim())  )
        {
            this.lexical.good = false;
            this.lexical.message = 'ERROR: ILLEGAL INSTRUCTION';
            return;
        }
        

        var inString = false,
            accoType = '\"',
            strOp = '';
        var op = '';

        for (var i = this.lexical.instName.length; i < str.length; i++) {

            //STRING PARAMETER MANAGEMENT
            //------------------------------------------------------------
                //CAS ACCOLADE   --- FIN STR
                if ( str[i] == accoType && inString ) 
                {

                    op = strOp + str[i];

                    strOp = '';
                    inString = false;
                }

                //CAS ACCOLADE   --- DEBUT STR
                else if ( (str[i] == '"' || str[i] == "'") && !inString) 
                {

                    strOp += str[i];
                    inString = true;
                    accoType = str[i];
                }

                else if ( str[i] != accoType && inString) 
                {

                    strOp += str[i];
                }

            //NON STRING PARAMETER
            else if ( str[i] == ',' && !inString ) 
            {

                this.lexical.operands.push({name: op.trim().toUpperCase(), type: ''});
                op = '  ';
            }
            else
                op += str[i];
            
        }

        if ( strOp != '' )

            op = strOp;

        if ( op != '' ) 

            this.lexical.operands.push({name: op.trim().toUpperCase(), type: ''});



        //ON VERIFY LA VALIDITE DES PARAMETRES
        var i = 0;
        while(this.lexical.good && i < this.lexical.operands.length)
        {

            let op = this.lexical.operands[i].name.toUpperCase();

            //Verify string parameter
            if((op[0] == '"' || op[0] == "'") && op[op.length-1] != op[0])
            {

                this.lexical.good = false;
                this.lexical.message = 'ERROR: ILLEGAL STRING FORMATING';
            }

            else if ( !(op[0] == '"' || op[0] == "'") && 
                    !this.legalName(op) && !this.isNumber(op) && Registers_Lexical.indexOf(op) == -1 && !this.isOffsetV(op)) 
            {

                this.lexical.good = false;
                this.lexical.message = 'ERROR: ILLEGAL OPERANDS';
            }

            if ( (op[0] == '"' || op[0] == "'") && op[op.length-1] == op[0] )
                this.lexical.operands[i].type = 'STR';
            else if ( this.isNumber(op) ) 
                this.lexical.operands[i].type = 'INT';
            else if ( this.legalName(op) )
                this.lexical.operands[i].type = 'VAR';
            else if ( wordRegisters_Lexical.indexOf(op) != -1)
                this.lexical.operands[i].type = 'RX';
            else if ( byteRegisters_Lexical.indexOf(op) != -1)
                this.lexical.operands[i].type = 'RL';
            else if ( segmentRegisters_Lexical.indexOf(op) != -1)
                this.lexical.operands[i].type = 'RS';
            else if (this.isOffsetV(op)) {
                this.lexical.operands[i].type = 'OFF';
            }



            i++;
        }


    }
 //change it 
   
    testInst(str) {

        let testString = this.extractFirstAwel(str);
        if ((!preProIns.includes(testString.toUpperCase())) && (!instructions.includes(testString.toUpperCase()))) {
            //this.lexical.message="INVALID INSTRUCTION NAME ";
            return false;
        }
        else {
            this.lexical.instName=testString.toUpperCase();
            if (preProIns.includes(testString.toUpperCase()))
                this.lexical.instructionType = "prePropIns";
            else
                this.lexical.instructionType = "InsSIM";
                this.lexical.expressionType = "INST";
            return true;
        }
    }

    isOffsetV(str) {
        let v=str.trim().match((/(?<=\s)\w+/));
        return (/OFFSET\s+\w/i.test(str.trim()) && this.legalVarName(v[0]));
    }
     //no spaces behind or after the backets
    isNumber(str)
    {
        if (/\w\s*\*\s*\w/.test(str)) {
            var numbers = str.split('*');
            var correct = true;
            for (let i = 0; i < numbers.length && correct; i++)           
                correct = this.Num(numbers[i].trim());                             
            return correct;
        }
        else return this.Num(str);
    }

    legalVarName(str) {
        str = str.toUpperCase().trim();
        if ((/\W/.test(str)) || (/^\d|^\-\-/.test(str)) || (/\w\s\w/.test(str)) || instructions.includes(str) ||Registers_Lexical.includes(str)  || (str === "")) {
            return false;
        }
        return true;
    }

    opsType(str) {
        let v = str.trim();
        if (this.isNumber(v)) return "INT";
        else if (segmentRegisters_Lexical.includes(v.toUpperCase())) return "RS";
        else if (byteRegisters_Lexical.includes(v.toUpperCase())) return "RL";
        else if(wordRegisters_Lexical.includes(v.toUpperCase())) return "RX"
        else if (/(w\.|word)\s*\[/i.test(v)) return "MW";
        else if (/(b\.|byte)\s*\[/i.test(v)) return "MB";
        else if (/\[/.test(v)) return "MU";
        else if (this.isOffsetV(v)) return "OFF";
        else if (this.legalVarName(v)) return "VAR";
        else return "WRONG";
    }

 verifyOps(operand){

    operand = operand.trim();
    if (Registers_Lexical.includes(operand.toUpperCase())) {//register
        return true;
    }
    else if (/\[/.test(operand)) 
    {//memory
         operand = operand.replace(/\s*(?=\[)/, "");
         operand = operand.replace(/(?<=\])\s*/, "");
         if (this.verifyMemory(operand)) {
             
             return true;
         }
         else {
             this.lexical.message="INVALID MEMORY ADRESSING";
             return false;
         }
    
    }
     else if (this.isNumber(operand) || this.legalVarName(operand)) {
         return true;
     }
     else if (/offset\s/i.test(operand)) {
        operand = operand.replace(/offset/i, "");
        operand = operand.trim();
         
         
         if (this.legalVarName(operand)) {
             return true;
         }
         else {
             console.log(operand, this.legalVarName(operand));
             this.lexical.message="INVALID OFFSET OR VARIABLE NAME";
             return false;
      }
     }
     else {
         this.lexical.message="INVALID OPERAND";
         return false;
      }
    }

    testInstOps(str) {
        var operands = [];
        if (/^REP|^REPE|^REPNE/i.test(str.trim())) 
        {
            var str2 = (str+" ").replace(/\w+(?=\s)/, "").trim();//delete first word

            if (Stringinstructions.includes(str2.trim().toUpperCase())) {
                this.lexical.operands.push({name:str2.toUpperCase(), type:"INS"}); return true;
            }
            else
            {
                this.lexical.message = "INVALID PARAMETER"; 
                return false 
            }
            
        }

        else if (/^JMP|^CALL/i.test(str.trim())) {
            
            var str2 = (str+" ").replace(/\w+(?=\s)/, "").trim();
            this.instName = (/^JMP/i.test(str.trim())) ? "JMP" : "CALL";
            this.expressionType = "INST";
            
            if (this.isNumber(str2.trim())) {
                this.lexical.operands.push({ name: str2.toUpperCase(), type: "INT" });
                return true;
            }
            else if (this.legalVarName(str2.trim())) {
                this.lexical.operands.push({ name: str2.toUpperCase(), type: "VAR" });
                return true;
            }
            
            else if (/\:/.test(str)) {
                let arr = str2.split(":");
                if (this.isNumber(arr[0].trim()) && this.isNumber(arr[1].trim())) {
                    this.lexical.operands.push({name:str2.toUpperCase(), type:"DIS"}); return true; 
                    
                }

                    else if (this.verifyMemory(str2.trim())) {
                this.lexical.operands.push({ name: str2.toUpperCase(), type: this.opsType(str2.trim()) });
                return true;            
                }
                else {
                    this.lexical.message = "WRONG PARAMETER"; return false;
                }
            }
            }
        var str2 = (str+" ").replace(/\w+(?=\s)/, "").trim();//delete first word
        var arr = [];
        var correct = true;
        var Op = {
            word:"",
            type: ""         
        }
        operands = (/,/.test(str2)) ? str2.split(',') : str2.split();
        if (operands[0] !== "") {
            for (let i = 0; i < operands.length; i++)
            {
                if (this.verifyOps(operands[i])) 
                    this.lexical.operands.push((this.opsType(operands[i])==="OFF")?{name:operands[i].trim().toUpperCase(),type:this.opsType(operands[i])}:{name:operands[i].replace(/\s/g, "").replace(/word(?=[edcs]s)/i,"word ").replace(/byte(?=[edcs]s)/i,"byte ").trim().toUpperCase(),type:this.opsType(operands[i])});
                
                else
                    return false;
            }
            return true;
        }
        else 
            return true;
}
 verifyMemory(str) {
        var str2 = /.*(?=\[)/.test(str)?str.match(/.*(?=\[)/):" ";
        str2 = str2[0].trim();
         var arr = [];
         var str3 = "";
         str2 = str2.replace(/(?<=\w)\s*(?=\[)/,"");
         str2 = str2.replace(/(?<=\w)\s+(?=(es|ss|ds|cs))/i," ");
        
 switch (str2.toUpperCase()) {
      case "WORD": case "BYTE": case "W.": case "B.": case "":case "ES:":case "BYTE ES:":case "WORD ES:":case "DS:":case "BYTE DS:":case "WORD DS:":case "CS:":case "BYTE CS:":case "WORD CS:":case "SS:":case "BYTE SS:":case "WORD SS:"://test whats behind and after the brackets
        
         if ((/\]$/.test(str))) {  //check whats after the  brackets
            

             str3 = str.replace(/.*\[/i, "");//replace whats behind and after the brackets     
             str3 = str3.replace(/\]/i, "");//replace whats behind and after the brackets 

             str3 = str3.trim();
             for (let i = 0; i < str3.length; i++) {
                 if (str3[i] === "-" && i!=0) { str3 = str3.substring(0, i) + "+" + str3.substring(i, str3.length); i++ }
             }
             
             arr = /\+/.test(str3) ? str3.split(/\+/) : str3.split();
             
             if (arr.includes("")) {
                 return false;
             }
             else {
                 var correct = true;
                 var array = [];

                 for (let i = 0; i < arr.length; i++) {
                     arr[i] = arr[i].trim();
                     if (BracketRegister.includes(arr[i].toUpperCase()))
                     {
                         array.push(arr[i].toUpperCase());
                     }
                    
                     if (!(BracketRegister.includes(arr[i].toUpperCase()) || this.isNumber(arr[i]) )) {//register or variable without spaces or isNumberber
                         correct = false;
                         break;
                     }
                 }
                 if (correct)//check if the Registers_Lexical have the correct combination inside brackets
                 {
                     if (array.includes("SI") && array.includes("DI")) correct = false;
                     else if (array.includes("BP") && array.includes("BX")) correct = false;
                     else if (this.occ("BX", array) > 1) correct = false;
                     else if (this.occ("SI", array) > 1) correct = false;
                     else if (this.occ("DI", array) > 1) correct = false;
                     else if (this.occ("BP", array) > 1) correct = false;
                 }
                 
                 return correct;
             }
         }
         else return false;
         break;
     default:
         return false;
 }
}
    occ(str, arr) 
    {
        let x = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === str)
                x++;
        }  
        return x++;
    }

    instring(str, j) { //test if the current index is inside of a string

        let k1 = 0, k2 = 0;
    
        for (let i = 0; i < j; i++) {
    
            if (str[i] === "'" && str[i - 1] !== "\\") k1++;//count number of '
            if (str[i] === '"' && str[i - 1] !== "\\") k2++;//count number of "
        }
        
        return (k1 %2=== 1 || k2 % 2 === 1) 
    }
    
    hide_comment(str) {//deletes comments from a string
        var i;
        for (  i = 0 ; i < str.length && (str[i] === ";" ? this.instring(str, i) : true ) ; i++ ){ }
       
        return str.substring(0, i);
    
    }

    getRideOfTab(str){
        str.replace(/\t/g, '    ');

        return str;
    }

}

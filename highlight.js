console.clear();
function id(ref){
  return document.getElementById(ref);
}
Array.prototype.has = function(item){
  return this.indexOf(item) > -1;
};
Object.defineProperty(Array.prototype,'last',{
  get:function(){
    return this[this.length-1];
  },
  set:function(val){
    this[this.length-1] = val;
  }
});
Object.defineProperty(String.prototype,'last',{
    get:function(){
        return this[this.length-1];
    }
});
function ctype(text){
  if(white.has(text)) return 'white';
  if(group.has(text)) return 'group';
  if(char.has(text)) return 'char';
  if(op.has(text)) return 'op';
  return 'char';
}
function stype(text){
  if(group.has(text[0])) return 'group';
  if(white.has(text[0])) return 'white';
  if(res.has(text)) return 'res';
  if(con.has(text)) return 'con';
  if(!isNaN(+text)) return 'num';
  if(quot.has(text[0]) && quot.has(text.last)) return 'str';
  if(op.has(text[0])) return 'op';
  return 'var';
}
function parse(raw){
  raw = desc(raw);
  console.log(raw);
  var org = [''];
  var state = false;
  for(var s in raw){
    if(ctype(raw[s]) != ctype(raw[s-1]) && !state){
			org.push("");
if(quot.has(raw[s])) state = raw[s];
		} else if(state){
			if(raw[s] == state){
				state = false; console.log(state + ' false');
			} 
		} else if(quot.has(raw[s])){
			state = raw[s];
console.log(state + ' set');
		}
    org.last += raw[s];
  }
  for(var t in org){
    if(org[t].replace) org[t] = spanify(esc(org[t]),stype(org[t])); 
  }
  return org.join('');
}
function desc(raw){
  raw = raw.replace(/&amp;/g,'&');
  raw = raw.replace(/&gt;/g,'>');
  raw = raw.replace(/&lt;/g,'<');
  return raw;
}
function esc(raw){
  raw = raw.replace(/&/g,'&amp;');
  raw = raw.replace(/>/g,'&gt;');
  raw = raw.replace(/</g,'&lt');
  return raw;
}
function spanify(text,cls){
  return '<span class="' + cls + '"' + 'title="' + cls + '" >' + text + '</span>';
}
function codify(text){
  text = desc(text);
  var state = true;
  var out = '';
  for(var s in text){
    if(text[s] == '`'){
      if(state){
        out += '<pre><code class="js">';
      } else {
        out += '</code></pre>';
      }
      state = !state;
    } else {
      out += text[s];
    }
  }
  return out;
}
//char types
var white = [' ','\n','\t'];
var char = 'abcdefghijklmnopqrstuvwxyz0123456789$"\''.split('');
var op = '!%^&*-=+\\|:,<.>/?'.split('');
var group = '()[]{};'.split('');
var quot = ["'",'"'];
//string types
var res = /* Reserved words */ ['var','for','while','do','in','function','new','class','if','else','return'];
var con = /* Constants */ ['true','false','undefined','null','NaN','this'];
function render(){
  id('lesson').innerHTML = codify(id('lesson').innerHTML);
  var codes = document.getElementsByTagName('code');
  for(var s in codes){
    codes[s].innerHTML = parse(codes[s].innerHTML);
  }    
}
render();

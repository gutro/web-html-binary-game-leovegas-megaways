eval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("ig.module(\"plugins.spine-animation\").requires(\"impact.timer\", ` ($image\").defines(function () {ig.SpineA` j$ = ig.Class.extend({` m!:null, flip:{x:false, y:true}, pivot:{x:0, y:0}, frame:0, loopCount:0, alpha:1, angl` :!data:0, pos` +!atlas` F!tlasTextur` C\"ur`!^!Multiplier:1, scale` $!iz` Z\"`\"#$:0, skinName:\"default\"`!J\"ing`!{$stopped` '$onComplete`\"K#events:{}, _nextEventId:1, _` 7!Callback` =#onKey`\"W\"`#,#ps:30, playDire`#y!:1, init:`$%&url`!s'Name, settings) {this.url`$<\"Resource.getPath(url);` ?!data = new `%j!` ,!` 5\"pose` .)pose(` M%);if (`!,$.`\" &`!7$`\"2' =`!T%` >';}ig.merg` p\"`!v'` m*`%K%` r$targetL` /$` r(` C%`!~\"` &% = 0;}` X\"imer`\"2#ig.Timer`!,!` 9!`${#`!#$pause()` T#`#h% =`#o*`!(\"`&Y(`!I(` 3!Image;var`'&\"U`$8!` 0/ ? `$V$.split(\".\")[0] + \"` B\"\" : null`!q!`)E-.cache[` ]$]`\"!&rseData`#g#` 8=,`!C\"_dataLoaded.bind` Z!));} else if (`\"*$`!#$loadAtlasFromUrl`#U\"` A!`)d#Url, `+T'` 0!` W$` (! =` D\"`$a$adData` e(`!Y#`(&!`!L:)`!e0`!a&` ?VObject`-h#Property` ]#\"`'`&\", {get:`.\"*return` {#`(+(`!c(`(1!` M(valu`(m3` 6!`'A&` 2'` H$data.se`+~%(\"k`!Y&` z'`*<!` r.` 3!.n`+i!{'int':data[` &!], 'floa` ,%` '\"], string` 1!.` &\"}`#w:` E!remove`!W/);}` P)}`+*\"`'_\"`-l( ==`-;!`'X+P` 8(.Backward`&U%playRever`*S\"}, `%4'`.X'` G%`-H<` =%.setPlayOnce(!`,8%ing` 6+Anim`(M#`!n$`\"9'`$1c`#u~)`#9\"`2:'`!@&`!(\"`!I#console.log`!p& - \" + name);}, swapAnim` Y(ewAnim`2Y\"animS`2Y&`,3!` $+`1!*` 1)`/O/` s'`$,T` X'`$[\"`!C+`$\"#Complete`0p#` 9$` /'`!X#rewind(` f\"!` @( || ` $)`1y-lay`'I#addListener`#B'event, c`%|#) {var l` B#s`&V&` D!s[` \"!]) {` :% =`,g\"` 4)`*1%` ): = {}`#<\"_` -!`'C$` 6'`'7.for (`![( in`!i&`%?#` '%.hasOwn`.%` 1$)`!y([` \"$]` \";}`+`*`!^\"`) -`#7#`!f7);}var ` (!Id`\"]$_nextE` .\"++;`!=&` A#] =`$*%;`0K#` 4#;}, `-_\"`$T6` D#`%=$`#f)` w(null;de`&`!` /7;}, loadAtlas`3,#`!*'`4L!, `34!`%y+req`-^#XMLHttpRequest;req.open(\"GET\"` V#true)` 6!add`\"y!`\";$(\"readystatechang`,s+e`%.#req.` E!State !== 4`3k%;}` ;$status` :!200 && ` '+30` K(var `\"@!Text = e.target.responseText;` =!`0&)`#+!`\"y\"Text, {loa`0a(page, path) {}});`#7$` O\"`.)+, fals`\"{#se`*m!}, parseData` l)rentData, `!Y(`$0-data = ` F&`'_!, skelet`-L!`'p!m_` *$;` 3$.files`)|\"`+!!ypeof`!\")`4&!\"object\") {` f!load(` :()`+$%` 6&JSON.`\"5!` =*);}`!7%current_skin_i`!x*skin`/>!if (ig.system.devFlag && `!h#` e%skins[` f3]`\"$\"undefined\"`1o,ERROR: Cannot find skin. Did you add in a correct` :!`2B!?\"`*}#skel`!+! =`!M&`\"6+!=`)p\" ?`!QE:`*A\"if (` y%`/_$oads = [];`.+%slot_i in`!F&` }!_slots` R#` (%`!d#` 7,[` `\"]`1l\"` /%`#0\"tinue;}`!(&kin_attachmen`!4%` M#` p\"` 5&`!6)` -&`!D!` ;4[` r-`!T\"[\"clipping\", \"point` $!ath\"].indexOf(` N+.type)`%L!-1`!F#name`!:$` ?'` 2!||`\"0., fil` L\"`(`)&&` #+[name`#@#fil`- $`'_'`+$\"`\"j&A` ~%Region;loop1:`#e%b = 0; b <`(D(` a!.r` M!s.length; b++` z3` C$[b]`\"@\"===`\"a!) {`!20`)P*` S,;break `!e!;}}`\"g1`\"d\"`+i\"file` _\" = {x:` ~0.x, y` $2y, width` (2` 6!, height` -2` 6\", rotate` .2` 6\", prerendered:`/;!`-h\"`!y&.` 7'`$a#w =`%\\!` :#`!J$` (*`!=$`&8!canv`\"i!docu`&W!createElement(\"` ;\"\")` H$tx`'($` 4\".getContext(\"2d\")`!V,`\"*\") {`!8+`!X!;`!c+`!V\";`!#$` V#(90 * Math.PI / 180`/K!`!;&retinaResolutionEnabled =`2U\"` j#` F\"`!4! = w` ))`!4\" = h`!4&drawImage`'6-Texture`2N#`!v'x`)\\\"` '#y, w, h, 0, 0` &\")`&Z'` Z!`#A*`2*%}`.?!.push(new Promise(`4B&resolve) {` ##();})`2k&`'hB`\"f$`+s,` 2\"|| 0` B\"`\"w%` 9,` 2#` E!`+#!ase_pa` p!this.url.slice(` &%`-Z$\"/en/\") + 4,` C&lastI` 9%\"))` s!fullP` q\"` y&+ \"/\" + data.image` >!+`+N!`-8\"name.includes(\".jpg\")) {` g%+= \".png\";}new ig.`%.\"` 9$`$K#` y! = `$)!` 3.)`$h!`#F*` \"'|| e.targe`#T#`#G+` \"(` @(`(*#}}}}}if (`%P\"`.B\") {`%O#.all` 5\").then(callback`%D&` *$();}`%Z$` ((retur`4V\"eton;}, loadDataFromUrl:`&Q&`(%&, url, `!'%`,\"\"`'Q#`(K'`(C\"` v$ =`$L\"m_` *$, req = new XMLHttpRequest;`2<+`'6!req.open(\"GET\"`!>#true)` 6!addEventListener(\"readystatechange\", `(`'`2w$req.` E!State !== 4` 0'status`1n!404) {throw`!o!Error(\"Spine anima` u!URL not found: \" + url`#f%;`$o!` p'!== 200 && ` '+3`!,!` N%g.`!&!A`!\"$.cache[`(\\$] =`%z&responseTex`#D&`)V$parseData`$h)` G1`$|';}).bind`*.!),`.@\"`#v\"send();`%}/rewind`%|'`#=!is.timer`%6#ig.Timer;` 5!loopCount = 0` -\"pose.setTime(0`! %this;}, gotoFrame` }'f) {f = f /`\"O\"fps * 100` `0f - 0.0001)` i$E`!b1` I)` (&getAnimL`)_!()` \\%Keyf`!J+name, type, value`(Y#events`$;$`(D#`&-%s`%!\"` '%]` &!_` O\"`-g!keys = Object.keys(` 8\").filter`'m+`#=#` >\"[e].name ==`.!\"}`.[\"ti`.,#key`+{$`('!0) {console.log(\"No `\"E$ with that` g!\"`,(%` U01) {time =`!C$keys[0]]`%^!` O(type &&`#-%`!r\\[type] ==` l\";})`!k\\ and` g\"`!pa`!)*Multiple`!4%s`!!9` .R, try also limiting by` l&`$#!im`-b\"undefined`(6$`)@%`(5\"`)-\"time);}`(+#Random`)^,` O.Math.floor` %\"r` S!() *`(:#ur`($!`\"+#ier`)0\"paus` f0stopped =`0N!`*]\"`+!.` M!(` W\"lay`*A0layDire` 1\"= `.X.P` 6(.Forwards`! \"`!0&`-m!`!/(un`!2'resu`\"`1` 9Dstop`!~XRever`#(1`\"1LBack`\"\\\"`%k!`!;'` j$`\"G\"();}`-gLaddEntityToSlot`!c'e` 2!, slotN`'G!autoCentr`.=$slot`2]%ose.m_`.C#`1m$.skel_slots[` a$];slot.attachme`1U!`!'\"`\"6&` g#tweened` j!` `\" &&`!#)` 0.` ~&`0y)` -:`!91`)Z!`\"H)if`\"p$.currentImage) {` /#spinePos = {x:-` 91.width / GameConfig.GRAPHICS_SCALE / 2), y` I4height` A=}`-i(` Z*Anim`\"\"*animFromImg`!fEAnim`!RX` [!`!]L`!(P` {A` !`# .` ^\"&&`%O#` I#`\"b>`!$4`!\"*`\"-#throw new Error(\"`)O\" has no image or anim ` u!`1P!`-#!move` I\"From`)w+`'Z$`%&#`'{~`(\\=null`1{!add`!^+`3-\"bone, ` J&, drawOrder, color`\"!(`+V7n`!_%`#N+Slo`4:\" must be uniq`4-\"` PA = (new `%7!` 4&).load({bone:`!w,:`\"&(`\"\"!:`\"(!}`\"5' !== undefined ?` /': Object.keys`\";<).l`/`!)`.-!` h3) {for (`/A%in`%8\"` ]7`#s\"`/r\"=`#>!) {continue`-k\"`#!<slot].`!J&>=`\"<&`&-$` 5F++;}`(#!addBon`3c(`&(\"par`#m!prop`!x$` j6bone`%^7Bone`%a4if (`! ! &&`!(\".y) {` ## *= -1`&#8`!0'`&,/bone`&8#`%A#assign({`\";\":`\"B\"}`\"A$);}, updat`\"g(`\"T(stopp`%A!return;}var complete = false`4('layDire` e\"=== ig.SpineAnimation.P` 8(.Forward`#i)`+*!ge`.V!L`&!() > 0`+j-ime >=` )'` F+`&S!`!c%true`/4%` WS<= 0` a1if (` .$`&y%oOnC` -#();`#7(tick `!s#timer.tick(), adjust`-A#1000,`/L!`!9\"=` S\"*` :(* (1 /`)O#ur`#`!Multiplier) *`!#`#k(;`\"/&`%:\"(` {%)` 6\"loopCou`!A!`\"z)L` 1$(`+3\"` ?+`$'$tar` A(`\"\\3}}, ` '(`&Y*`&Z%` (o` D%) {var ` '&`!c$` (&`\"&\"` 5)`0v!` (&`!=$raw`!2'`!x\"X, ` #\"Y, ctx`&|#!` o!allowOutsideOfCanvasBound`*6!` Y$ > ig.system.`4.! ||` m$` 0)height` 4&X +`\"'\"size.x < 0` O(` 1(y < 0)`)T,tx_2d = ctx ||` 'context`#M!` @\") {` #\".save();` '#translate(` T&getDrawPos`\";%`!E#pivot.x),`!!'` =-`!q%` H\"y));`0v!caleX`$X$flip.x ? -1 : 1,` 9\"Y` 2)y` 6%`%Q&` Q#||` <(`\"2'cale(`!%\"` l$);}` 1)`#P\"cale,`#[#cale`&T'angle`2!`*c!` V\"rotat` V#` <!` m&`#:&-`\"z)` x#`\"_$` |!!ig.debugMod`+;&raw_pose_2d`,G&`&k\";`,e$` D\"ebug_` 2:`!i$estor`'q(` K$`'z'` N&`)#\"`&'(`$Q!data = `-Y#data`\"!\"data`&`+`1$ =` Q!`2.'` M\"` &$` L'` r!strike(`%_#`2Z%`!,&tweened` j!` 6\"` A&slot` 34` 7!` E\"ort` )) = `38#keys(` /&).sort(`\"x&a, b`!i%`!)'[a]`$S!Order -` .(b` /';}`%2\"`\"k#a`2{$s[`!k#`.p!name` J'_keys.l`1d!`$2#` 7!ffse`!_9filter`!s'e`!f1e].o` g!;}`#p\"originalIndic`#v!`#!-.slic`$>$arr = (new Array(` =.`!w#`!O!l(undefined);for (var i = 0; i <`\"2(` R#; i++`\"U#index =`!V,.` 3!Of(` S'[i]);`!i/p`!x!` '.` L3, 1);arr[`!5\"+`#1(` =*`#B$] =`!z([i];}while `\"b6 {arr[arr`!>%`\"}&]`#n2hift();}`'=0arr`)C\"apply`(D&_`,;!form = `%Q&` 7%`2M#` '%.pare`4j!` P5` C&s[` H,]`-E0` ;&x,`*:&.y`1?%`.8#` 1&` ,!ion * Math.PI / 180` I%`/d#` H%`/l%` $*Y);}`+$'kin =`,B%.current` 3!_i`/o!null ?` 9&skin`\"@\"` ?/] :` L!`*?!` y%`3\\-`'o!`'e'`%;4`'j(` 4%`!i#`&X#` J-[i]]`\":#in_attachment_i` M(.` /&`.f$` ?+) {continue`/H$in`!3*ki`\"i\"`!(?`#}#` S$`%`'`!I!bone]`#.#` ~$&&`!)&`!!\"`!U&s &` \"8[`!}-]`#=%` ,)`!K!` ;G;}`![%` Z'`!D$` )&.type === \"clipping\"`%5-`(L?`'U%`(O(` |*`(\\!` %*`(T/` 3*`(DE` I*`(i&` %/Y` T%beginPath(` *%moveTo` `-vertices[0]` d.` 4%1]`0;'vert`/y!1;` $$<` F1exCount` >$`(c!`!G#lin`!192 *` O#`!;8` <& + 1`,|'close`\"R*restore` '&clip();} else `&\"/_i instanceof bp.Entity`%>c-`*l..pos`%z/` 2#y)`)T&` 0)spinePos`!O&`&r5` C'.x, `!00` 7%y`#E&`&f\"1, -1`\"!%globalAlpha *`,k(color.a;` i.update()` (/draw`$71`-7%`$8+slot`*jc`#C/`+7\"!== \"region`+6!`!C%`!F#` ''`*U~`*U~`+5>`$q?`0f%lendMode && (` S)CompositeOper`!h\"` `(` Q%`%W-` BO` I3)`2o!nam`2i\"` 8*` 2!||`(*.`%P6`1\"!`%`&var fil`3d$eton.file`3-#` &([nam`3q#` M!&&` U!.imag` )!!` %&.hidden`+v'`)L(var w =` Y\"width` .!h` +$height` /!isComplete` 5$` z\"c` /#`\"w#turalWidt` [%` A\"` .(`%S$drawImage`\"\"!` C\", - w / 2, - h` #\"w, h`.H)`\"N$typeof`!!\"atlas`#O\"object`4N(`\"H(` Y$` L\".prerendered` G&`!K+` D\"data, -`!$'`#-\"`!f$` -'`#2\"` 3\"` ?,` %)` C\"`\"4%`%A!`$(%` J'`$)*` P(`\" ,`*?\") {` ?+` a\"` m+` \\#`*r*90`*X.`,E$`\"o&this` `\"Texture`\"y#` s'x`\">)y`$c\"`$f7`\"U,`(G,`\"\\*` .,`!~*fillSty`(k!\"rgba(127,127,127,0.5)\"` ?(Rect(`!?6`0s-`\"h$` ''`!v#for (i = 0; i < sorted`/S\"slots.length; i++`1E%` 6#`,i(s[` J-[i]]`\"[!`+V-`-A)` /&`%X!!` =-`1L)`!8%bon`+v$` '!s[`.6'on`+k#`!).instanceof bp.Entity`)1'`1cX-`\"8..po`&5!` #2y`*:\"` +.spinePos`!O&`3,5` C'.x, `!00` 7%y`%A&`+X)`23F` k,update(`1x-_i`)8!(`4d&`&R%`$b&}}}, debug_draw_pose_2d:func`2;!(pose, ctx`&T#` g\" = ctx;pose.strike(`#C\"` -!m_data && ` $'.folder_array`1x$` (' =` 55`'>!`.\"` <,tweened_` 2(;`(n!` I'idx = 0,` ($len =` d)`({%` G'<` D'; ++` 1&`!w#` +\"` [+[` =&`)5\"`\"#\" =`\"@)` ?#`\"?#` B#`4g\"` -\"`4T!` =+ile]`$e$`(?#`&j-` E#x`\"D$.y`%6&`/(\"` 1#angle`/&.`&o)` D#` (!_` i&` *\"y)`!q!e`#V!.5 *`/6\"`.J&ey` ,*`.I#var lpx`#.%.pivot_x * 2 - 1` :#y` 1,y` 8%`*C/lpx * e`)9!lpy * e`\"O&`(u0`/9R` {\"ey, 2`!(#` #!`!!&beginPath`$2&moveTo(0, `#U&lineTo(32` %,Width = 2` )(Cap`!a!ound`!M%stroke`!q.0,0`!q*` C\"`!F&`!5J0, -32` yg0`#[\"`!F:`2{'var `/|!`*B3` 2&`*M&` /!`*L%` )!`*M\"` C&`*H%` C%<` @%; ++` /$`*D#`2D#` V&[` 9$`)v\"par`.N!nd`(+!bone.` .\"`-P\"` 3(>= 0` p#` 1#` l.` E(`*=3`$N6`!9!x`\"S\"`*U'`$k#`!)'.x,`!7(` =+`$OUgrey`$W@`#z~`$;]`./;`#S3`.C#` 1!`.*:`(J` l!`.g# * `*She` +,`*VW`!\\'y`!b!`%Neen`%sA}});ig.SpineAnimation.PlayDirection = {Forwards:1, Back` '\"-1}` J/cache = {` )0preload = fun` y\"(url, skinName) {url = ig.Resource.get`#Q!url`3E\"req = new XMLHttpRequest;req.open(\"GET\", ` w!true)` 6!addEventListener(\"readystatechange\",`!O'e) {if (req.` D!State !== 4` 0'status === 404) {throw`!Z!Error(\"`\"a! a`\"_$ URL not found: \" + `\"7!}return;}` l+!== 200 && ` '+3`!,!` N%`#x2[url] = e.target.responseText`#L!data`#K#spine.data, skelet`%?!data.m_` *$;` 3$.files`%)#f (typeof` u2`\"~!\"object\") {` o!load(` :1);} else` =(JSON.parse` =3);}`!R%cur`/.!skin_i =`&=% || \"default\"`!r!ig.system.devFlag && `\"%#` g%skins[` h3]`\"8\"undefined\") {console.log(\"ERROR: Can`%6!ind`!K!. Did you add in a correct` :! name?\");`/!skel`!+!`\"(!`\"12!== null ?`!QE:` L!`\"d!` y%) {`0b%slot_i in`!7&` n!_slots`07#` (%`!U#` 7,[` `\"]`!\"!!` /%`#!\"tinue;}`!(&kin_attachmen`!4%` M#` p\"` 5&`!6)` -&`%+#` =2[` r-`!T\"[\"clipping\", \"point` $!ath\"].indexOf(` N+.type)`%=!-1`!F#name`!:$` ?'` 2!||`\"0., fi`/;!`(l+&&` #+[name`#@#file) {` E1` B\"`)U\"file.w`0j#`!C,` 2\"|| 0` B\"heigh`#5%` >'` 2#` E!var base_pa` p!url.slice(url`\"%\"/en/\") + 4`.i!.lastI` 4%\")`/K\"fullP` b\"` j&+ \"/\" +`+u\"image` >!+`#U!`\"Y\"name.includes(\".jpg\")) {` g%+= \".png\";}new ig.Image(` 9$`2_\"`.K!obj && obj`+f!Callback) {` #,`1m\"`0q\"`,;$ig`!]\"LoadCount--;}}, false)`+\\$`0a!)` ;/++`1\\!send(` k&var obj = {loaded:` j!, path:`!A!load:`1i&`!k+` i'`!}$ed =`!w!` )%` H$ =` i!` '$;}`4]!add`4!$(obj);}};});"))
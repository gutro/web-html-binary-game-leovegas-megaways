eval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("ig.module(\"game.entities.win-count-up-handler\").requires(\"cor` D'` $!y\", \"extras.graphics.particle-emitter\", ` M+buttons.shape-` (\"` _'` ?%area-dimm`!E!defines(function () {bp.E`!E!WinCountUp = ` -%.extend({name:\"new-`\"31, targetWinnings:null, ` C!UpTime:0, relativeChildPositions:true, `\"G#s:[], canSkip` 4#big`!U&Times:[13, 20, 25], rayScales:[0.35, 0.48, 0.61, 0.74, 0.87, 1], minorWinThresholds:[2, 5` /(` ~\"0, 3], currentLevel:-1, standardFireworkTim`!q$epic` *)`\"c#min` /$Delay:0.55, max` ',3` H!` k$0.2, 0.1`\"/!1], total` L$s:0, do` %&`#*\"init:`$}&x, y, settings) {thi`&B!ent` -,;` 7!soundManager = new bp.S` +';var t`#9% = ` T!fromFeature ? GameConfig.Reel` $#BIG_FEATURE_WIN_THRESHOLDS :` 87` =*`!b\"`&O\"`$4!`!=!`!G$.filter(`'a'e) {return e *`!h\"sgd.`#K!Stake <`!~#`'=*;}).bind(this)).length - 1;if ` 1!`!;)>= 0`#\\$`'u'`\"z$`':.[` S,];} else {var l`\"5%is.`'*.`!I~`\"F!`!w4`(E)[`!g!];}` v\"ext` ?$spawn`*R!(`+S%TextBox, `+V#`+L)font\", fontS`&u#:bp`,\\$`!B$Font, zIndex:150})`#}3`$)&text.scale = 0.9`&\"#ext.pos.y = 43` *(alpha = 0`\"/$ween({},`\"4\"`\"i', {onChange:` 7!updateText`#L', onComplet` @#o`%G$` /$` C'}).start(`)S#`!N!`!<#`!U!:1}`*{\"` ?&`\"Z%`)B(&&`%&(`'!& || !` /;`%X$ > 10`%|2) {`\"y\"sort`%$!ren`!m$`+,?` 7-.playAudioLoop(\"`#c!Loop\"`$k54) {`(S#`%.4 &&`\"G#` )is`!H!Playing(\"LV_Big_Win_`!-\"`%v$musicLoop`!}&M` +$` E., un`',\"d, ` 2(Outro\");}`!_%`(o(`'#'flashForeground(true`\"U'`!h92_BaseGameLoop1`!{&`'8&`0y!`'+&`+9'` ?!` I$` z)setVolume` p., 1 - ` V!.ratio)`+D*`'B'}`\"Q&`#K%) {`!tBMUS-60`\"'4`!V4` A1, 0.01)`*5#`!B%`!b\"`$v!(false`$@(`!?934_FreeSpins`%v\"`(d%`\"=(`!M9` S-`+e#`&T&?`!r! :`!v$`%h<enableClick`!}#kip`/`(;}}, swapTitle:`%?&`/N!`$.(title`&\"%itle.currentAnim.swapAnim(\"win\" +` [# + 1), {preserve:true}, {`/4%1}`*{/`*\\&` `#==`1m)`*3\"? \"26_CollectButton\" : \"9_BonusConvertsToGold`+9#` e&2`\"%$doEpicFirework`' !`4!#`#U\"reate`\"{!`\"o#`!S9\"KongRespin\"`#Y\"` V'`#N/`\"0\"oggle`!;$Timer`*M#` '4`$[&, ` E!.delay`(t#in` E$Delay` _$`*[\"` 7#W` 6$`1H\"m`4g\"rs[`#X,]`2A/ - 3`1S,it`3X!`\"w\"pawnSpine`%O\"big_win/b` \"\"_a`%o!pine.json\", `%b2looping:`)H!, `%bA`1<)}, `#+/`#}'`(=\"`'c#` $%` e\"tandard` N)s.push`#b\"do` 3$`(i'`$\"#bp.RandomUtil.r` &!`$7#ax`$0* +`*A#`$G,);`&b$while`, $`!A2length) {var tim`3o!`!k9op();` E!.clear`'v!}, `\"-&`\"}'` r#pos = {x:`\",0IntUnseeded(20, 1400), y` (A600)};var baseSca`&)!0.9`)s!` T*perce` U'5)) {` K(3.9`#4$` <>10` O,2` 2I`!--1.9;}var s` *#` 3&+ `\"X0` c%0.2)`\"_!anim`(EDf`$G#s2`(d0` 6$2\"`.\\(`(i$os:pos`(_(`&f$total`%A$s *`1/!`.x1`1y&`-=8`\"J*fromArray([\"` |%_1\", ` $'2\"` \")3` 0*4` 0*5\"]`-D#), 1);`\"f!`1V)`$&#` #!`.1$`\"8(++`+.1`2Z%`(.&s`*!~`*YF`)m!`1w(`)h*` S!e` 4's`%gM1`%|81`&$0`/0$`.y+2`%k1`%[%Loop(`$h'Long\"`/?5updateText`\"F'`2?!`/G#`1n#mplete) {return`)T\"`)~#agePer`2B! = 1 /` O#`2T' + 2`%:'`&+#` 5\"<`(D#` C'&& `!?!.ratio >` C0+ 2) *`!1/`$G$` B(`&m%wapTitl`(#` 7(`!G4>= 0`\"e#!`&h\"im` {$d`+Q+`#W!(bp.EntityAreaDimmer, {alpha:0, `$`#0`3V3` q$.`\"]!(` P$.65}, 0.3).start`1\"\"`#4\"ext.setText(bp.C`!z!cy.format`$i\"`#D#*`#a(Winnings`*M\", {noSymbol`&M\")`%]!onCountUpC`%>#`('/`**' = `':!`,o0top`,a\"`&f5` 8213_`!=#_Double` 1<countLoop` 41`.%&\"` r!end\"`%3'somersault`+0#`,?#` )*.clear`$H$` .+ = null;}`(F8` 3%title` $` (!`.E*wap`+V\"win\" +`(i11)`+5(`+#+15`1+%` m.pose`%y!i`14$` -3ge` (!Length());`&S'`' ! = 1`! \"canSkip`%>*`\"[$ =`&J!`$D:52_FightingSoundEffect`$;(`'5* >= 10`'W$sgd`1Q\"Stake) {(new bp.` g!`!(#)`%=(Announce3\"`\"/%oggle`1G)(`\")!`!9'`0%)`021`)w+`)~!6, {on`(f%` P!remove`*b!`2:&,`\"(\"` x*}`*V'` :!flashForeground`!T-musicLoop`/F(`#k)is`\"s!Playing(\"34_FreeSpins`(`\"`&u%`\"(\"`\"\"!5`\"!\"hange:(`0L.`#^2setVolume` t/, bp.Math.lerp(0.1`!!#`,W'));})`\"y&), delay:0.3`\"i-`\"Q%`&5!Music`)i$` 2%`)b%`#F\"adeOutBigWin` {'.`! !(0.25`-P!` ;)`-C*`){8`%63`!|\"`%&\"mitters.l`)\"! ? 0.9 : `\"+0`)5!` 6Y`/X\"`&\\(` &&`\"S'`!/'`2N%&&`&w\"`1X.`!5+` r1`!B.null :` m#oF`#Z\"Callback`!62}, ` 9-`1J/on` =#` M\"enableCli` @)c` Y#` M$clickHandler =`+O#pawn`)^!(bp.EntityShapeButton, {name:\"` W!-h` W\"\", ` t$:` }$, createHitArea`(Q(`!7%on`$z!beginPath`#t$` 1$rect(0, 0, GameConfig.NATIVE_RES.width` %4height` d+close`!%#`(u+boundKey:\" \"}`#t\"is`#40`'u(`#8(`\"0$`,}'` 2/`!I#`#n*`)Y\"}, skip`$m/`!>((`--'`1>#`4W%topTweens(true`!$$`1[+}}, draw` u/paren`& !});});"))
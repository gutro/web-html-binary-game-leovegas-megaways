eval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("ig.module(\"core.entities.reel-set\").requires(\"impact.game\", ` ?/` $.` $!y\", \"plugins.` _\"Events\", \"extras.graphics.draw-buffer` +0colour-transform` 00image-wrapper\").defines(function () {window.bp = bp || {};` .#ig = ig` .#bp.E`\"\"!ReelSet` L!` ,#.extend({zIndex:1, _quickStop:false, _antiInProgress:-1, reels:[], _isStopping` H%currentStartReel` N!` ,&op` +&startTimer` h#stopTi` \"*SoundPlayed` .#pecialSymLand` -%tartingSpin`!C%doStop` &)spin`\"%'` 0#isS` m%Set` D&ymbolsInView:null` /\"OverrideActive`# )Config` D$reelDimC`%6!:\"rgba(0,0,0,0.7)\", init`!2\"bols` K(` \\)r`$Z\"ting`\"v\"anticipation` C#Game` %\".A` --` D*`!x$:{}` u#`#s#Offset:0` A*Enabled:true, alpha:`%B#Type:`&:), _padding` f#{x:0, y:0}, _dimmed`\"I\"Image`\"L$onReelPopulated` /#`!:(`&$+draw`\"<(Back`#})` 1$`!\"!`#R$` -(`!M)drawRightToLef`%:%init:`)4&x, y, s`$##) {this.parent` -,;Object`)}#Property(this, \"`$y&\", {ge` z() {return ` z!`%D';}` |!` A'value`!A$` ?' = ` 6!;` 4!setu`)5!` 7\"`&#$();for (var i = 0, len =`!2\"`*D!.length; i < len; ++i`!($` =![i]`!$1}}})`!8\"` 0)`\"x$ &&` #%` 6(|| `'?'`!j&;if (` D)`!~$ === un`#b\"d) {`\"+%reel`\"1\"` {\"unt`!7'`!*(?` \"0.COLS :`!:2` 8!;` }\"<` v&` ,\"++`\"w(`!a$.push({});}}`#x;var width`$!(`!<$EEL_OFFSETS_X[` /,`!p!- 1] +` E2WIDTH` }!height` k4HEIGHT`#s!` +1PADDING`1M!dth +=` +:.LEFT`!=4` <$RIGHT);`!S#` R=TOP` R<BOTTOM`&d#`,.*.x`\"D4`!g(` E1y` :<TOP;`% \"`,F!Buffer = new bp.D` +%(`#8\"* ig.system.scale,`$7$` )-`\"$$reel` ^\"`,!` s&` *!Wrapper`#:\"`!9'.getCanvas()`*P,`*A\"`%~0; i`'K&`4O([i]`!/&` .!`!W#`4d&` 0/`\"s#createReels()`,v#`'~0`-O*`&^0SYM_ATLAS`!Z&`1 !Atlas`!7#ig.Texture` 1!(` -#`#)!` W6.img), ig.t` W\"s`)\"-` B&def]);} else`!;*`2H\"`%c/SYMBOLS`\"l#`3|.`&14STOP_TIME`*e#`#p#minSpin`#b!`\"M'im`%C$` X,MIN_SPIN` g! / 1000`$$$Ini`3n!`4K\"`#{(reel, row, symIdx`0&*reel].set` T\"(row`)U/`\"T#_ABOVE - 1` e$, true`!A!`%X(`%9*`/V-`.e%`'+2`.p%var`/f%`,u&`%e() {`1_%= {id:`\"J\"atlas:` >-`0x$nfig` 8\"` &&}`%F$` y,`%K\"` r4i` 9!` ~)` K\"` m;` }%initia`$R$`1;0`$>#` ;*`&F$` (*` E\"`&x'`2%#new`#c&Typ`(U.`1^+` c!,`1w8_Y || 0`),!merge(`\"x$` L'`!u*))`-K#`&P(zIndex = 1` *.changeContext`-K2` 5#));}}, update`+o3_spinInProgress` .)quickStop && !`-r'ingSpin && (ig.game.adapter.state == bp` ,$s.CommStates.RECD_PLA`#%!` (QERR)`(V(`/VC`\".&calcAnticipationDelay(i) <= 0`*]*i`*c!Q`\"a$(`$?)` 7\"Stop`&C#` z\"g` +%s(i)`.'&break;}}}}`*P$Coun`-V)s.length`2%1` I%`2\")`!B%`%!\"()`(\\'`#{~`$%tvar first`$<(R`-e\"-1`\"y\"`$Br`\"_\"`1.!`#R!clear`%0$_s`27#` .*`$z$if (`!_3= -1) {`!|4i;`%U%` C>`\"'#urrentStar`2B!`& $` /&op`#(&`$n/= false` 4#do`'0!` '.`%v*` 4%}`'#:var pos`$9-`'4-po`/.%`(K*`28!`.i&`#l!` =!`'a! =`&#\"EntityReel.STATES.SPIN ||`!I'` 2DACCEL) &&`#A$`%X4>`%j!bp.Logger.d(\"` <( detected\"`%o$`$!.i`%.` 61].fireOnce((`/5)` U&Nex`%<!();}).bind`#1!),`'q#`1/!`! #Offset +`\"%9`!41)) / 1000`\",$`%X5isStopping = true`'T$`(?#`-e9pos`\"~3++;}`4^\"`,Q'`!2$`*;&minSpin`#O!`\"~%` )(.reset();}`!J#` F2`%=&` P)delta() >`+-\"` R&`\"e&`!-%`\"WG`%O40`%\\'`$|(`/Z&`#C\"`--0 - 1`(,CTOP`.N#al`%g!ped`!S$`. H` P*`)INTOP`$f!!` _&)`3/&if (` v(=`!\\\") {`!8H`&N-Idl`32!`,r9` 8!fire(`!m)Set.Events.ALL_REELS_STOPPED`'A#a`(u'`/!(`.m$removeAllListene`0l!`\"G!`3EU`\">$setupSpecial`(y$);}}}, se`!C!Dim:`+M&value, colour`%J#i`(v\"ypeof ` <!`#t!\"object\"`'d%r` h\"Active`#.%`$0%`01- - 1; i`(d!; i--`$'0`!\\#`!S\"[i]`)k&` 3` D!`!m!`!|%` <)C` 1! =`\"=#;}` zc`\"I!`#Q&`.((Back`#Y'image, x, y, scale`+@#` $$`!j\"`%i)cale =` H\"`' $draw` w,`+@*` W(Image = `!9!` -/.x = x` %0y = y;}, `'!#`\" 6`-.&`!E2`-6(`!H0null;}, draw` i*`-$%visib`\"{'drawBuffer.clear();var ctx`$j$` 7(getContext()`0G'`![0) {ctx.save` ?)`$&-` B#translate` 5/.x,`!E#`#K*);` ~!cal` B0` y!` E2` 5\"y`3 $`#;-.draw(0, 0, ctx)`3l*` 84`!OF` n$ctx.restor`-{!`#&'`\"_0paddingOffset` q&` )*y`$[\"`/5\"unt`)E0`$%&drawRightToLeft`0!$`,R! =` ['`)j=`\"]!`+S'` [)`0n#` f%`0T2` Z%`\"i*`%r&`,?)`.7#currentFill = ctx.fillStyle`#@!` %%`'G%`,\\)`%;#`'Y'fill`#z#` P(` }';`0w!`1U\"lpha !== 1`!B*A` 4!`!,#c`(N\".global` 6!`!2\"` &/` L$` u!`,C$reel`!Y\"`&?,pos`%A%pos.y` %#` s#`#3'`!]*`!$7`!v(`.j\"change`*S#`+N'new` .#` j$parent` -(;}, _startNex`/i!`,,*bp.Logger.mark(\"Starting`%h!\"`)[#`%]\"`\"f\"`!X#` C!Reel].spin(`*$$` /,++`%v'` -, <`(3&Config.COLS`-e(` 0'REEL_START_TIME_OFFSET > 0`.&%`\"D!Timer`!U6fireOnce((`.m2`!T.> -`$K%`#>*(`,1&`#?&w(\"Tried to ` A) while`$y$` -!is -1\");}}).bind`!>!)`%~#`\":>/ 1000`-P,`!R-` 1*`\"/-= -1`$X#` V!ingSpin`2I%}`%~\"op`%m2var stopSyms`(W$getS` ,#`#F,opReel`%~8` <\"].s` \\%bols(` |$`&:-` J\"`&42` 6\"`&\"CStopTime`/F\" > 0 && ig.game.adapter.state != bp` ,$s.CommStates.RECD_ERR`%h'` q\"`&c.`\"B$`&JF`\")#`&d+`$1&`&O?` C&`&FG`\"l5+`/P#calcA`3['Delay`%%3)`' 5`!{*` 0*minSpin`#E!.reset`+d.`\"x#`'M!}}, `&]'`'*'reel`''.[]`%|!!`!E#ymOverride`2H%if (`%82=`%*@`,a0DEFAULT_LOSE) {`(X,` 33[reel]`#6$` o%sgd.slot`(L\"Result &&` e\"` )0.s`(v\"InView` p\"`!3/` 3D`!<1previousS`!=8` -4`!6G` 7H`&O%var bandIdx =`3M! SlotGameData)`#|!BandIndex`%[!` G$< 0 || !` ($||` a%>`(-#`$S'VisualR` g#s.length - 1) {`!8&0;}`%(7` V+[` Q#]`\"/\".slice`3%.OWS`(a'`%2Wdummy`.g#`#H\"`%:` >.`%tJ` H4`&v~`'AS`&5_`$?%` [,_` :1return`,]%;}, set`.\\(`,]$`-4'settings`0Y$a` </ = ` ?$;}, `/I2`.$+Idx`,#`-~#` e0`!u!Idx]`$8%` :(`'.\" === null`(|!` 4-Enabled) ||`4&3`.JA`#5#0;}`& %`!T9` I&` *>;}var`3Q$`#'!`*8!var ` L(Found = false;for (`1P!ymIdx i` w/`\"{\"`0a(` ,..hasOwnProperty(` i\")`2J$ym`$](`&8$` U.[` R\"]`!q!`3Z$ymCount`\")!`!g%i` *! i < `\"Z#; i++`!_#`!\"+.REELS_WITH_SYM[i]`%*!true &&`!O,.LAST_REEL_TO_ANTICIPATE >=`!$$`\"a(`+`ti].indexOf(parseInt`#P#, 10)) > -1) {`\"x+++`,'A`!N0`'z$`,<G`!*W}`'!`$u,>=`#~-SYMS_NEEDED_BEFORE`$A0`$t+`(W'if (Array.is` #!`%N-DELAY_TIME)`!b&`([$Math.max`!c$` 3!,`!/-` Z&`!2&`.|%` 3\\);}`)p0true;`$~%_antiInProgress ==`#v\"`({-StartReel `'H% - 1;}` Q2`(x%break`$Q$!`!@-`!#$` O.-1`0N%`\"F(`0V!pin`/I'`$H#`.[\"_spin` _&` w%doStopSpin`,_%` 3\"minSpinTimer.reset()` 4#starting` O#`#5!` q0` .*`&v$`#&'0` 5\"isSpecialSymSet`!:+`!)!Nex` P!`!<$removeAllListener` 1$`2V3{}`,z1` e#els.length`-1$`!5\"reelStopped`! $s.push`%_\"` T![i].ad` 7%(bp.EntityReel.Events`(l!_STOPPED,`!0\"` q(.bind` o!))`#]$` 7$Soun` _[PLAY`!9!_SOUN`!8%pla` B!` }%`!/4Populat`\"%\\POPULAT`\"X&onR` r(`!+0s`!T$Played`1)!`%P*`%q%Land` 4*}}}, `%d\"`!q.`(7.`\"58) {`%g5`\"l4`&$*` b<[i]`&P$`#J%`!v\"`#'K` e6;}}`,0#` .2 = [];`#+%`%T$`'r(`\"z8` <,`\"s=`(j-`\"v8` =,`\"XT`),;`\"v7` 2,`# +`'\"!`\"`L`*0*`\"mA`*b+`\"t<` A*`%mU`+-2` k6`#).` 6*`#.+`/?'`#%*`/c'`&\\0`0\"*`#n1` 5*`'d.();}, `+},`!;'`4L#`#R(` >+`!`$` (+` G!, ` X$;`\"k\"`#r\"` .#`)Vj` m$`.:` >% = null;}, `.C!pin`\"L'quickStop`2f%do`$c!pin = true;if` 5/setQ` ,$();}}, forceStopFinalReel`$s/`!<$`$+\"convertSingleIdToReelRow` N'i`$0!var`#^! = idx /`\"}\"reelConfig.ROWS << 0;` F!ow` C#%` 51;return {reel:reel, row:row}`!M'`!G#To`!Y$`%b+` P!) {` g#`!\\!*`!E2+ row;}, getSymPo`+*(` c%, symId`\"J#newR`\"N\"` ;\"newR`\"4!row`$1!`\"B!== undefin`&!`#\"$` D\"`!G!`#N4`!3!);` y*Row`!x!` 2!`!(\"` .$ow;}var s`!{!` v$`'e\"` ^#].`\"7%(` [\")`$,!p` K!new bp.Point`(~\"pos.x +` l#.x`'u#pos.y` -&y)`\"J!`\"w! !`\">/info`!D(`#s#OVERSIZED_SYM_INFO[` _!]` j!info) {`!U\"`!O$.add(pos,` o!.offset`!9\"!` ''.abs`!5#oversizedDiff = {x:-` w\".size.width -`**'`!W#SYMBOL_WIDTH) / 2, y` M*height` A7HEIGHT` X!};`!q4`!T)`//!`')#pos`&k#`,l\"`&c,`-J\"`(C$x:`,f0`$\\!, y` $5y`(l!`%P\"Idx`(K3`&m~`'9R`\"V#`'O6Idx`'`%`\"?%bolsAbove`\"C'Reel`#D&` f'` b(` P%`-Y\"` ,%`+Z:`#l+` e$(r`!N#`/ (`.e*if (Game`&/#ALLOW_QUICK_STOP && ((new q.Bridge).get` H\"().partner`)N!` :$.Customers.SKY || ig.game.adapter.state =`'&!` -#s.CommStates.RECD_ERR) && !`'u\"`1V.` )%`1_$`$?)` 5&`\"Z#`1K%Spee`/<(new` .!` q$`#B\"`\"j'R`),&COLS - 1]._current` V!`,t\"` &!;}, isStopping`#_*`'#$` 6$`!q$for (`,a! = 0; i <`,Y-COLS; i++`$N#`!`'i`%*\"tate()`$&!bp.EntityReel.STATES.DECEL`%o!`!5)false;`*j%` 2(`\"&\"`#/!`!~.`(g!`!z6`!U+`&m&`!)Z`!M5Spinn`#Y5` 6%` a%`#@P`&e\"`\"g'ed(i,`\"K!)`!k#` }(`&o\"`&h*startingSpin ||` /#doStop` ,$` [);}, _areAl`'8!sIn` F!tat`+P(`\"D#s`!O\"` 9!`%;~`$J(STOP) {`!2+`&-+` 2(`&-+`)E)`0X#, checkIdle`,r5`1!!`))#ed(` G&`2-'`\"},`2)-` `0`\"K&;}, move`#z!` \\'amountToMove) {`&`\"`/(!Press`\"$*ow,`$s!` C\"s`/;8, sym, accountForSym`0.\"`,4*`(m\"` b%` ~\"` B5;}, clear` H\"Overrid`%u+`&}#`1A\"InView = null;` 2%` R$Activ`$z'`\"1!`.,0s`.6#`&`%r`3w\"0;` $\"`&d's.length; ++`#'#`\"@-`.I,` z!;}`#J(`\"*/sym`\"*#`\";(`!{-`(M!`\"P2` X&`\"E#upSpecial`4P#`#=*}, dim` 4#Except`!A*ToExclude`%S\"s` '%`!Y$dim` R*` 8:;`!,\"` VYpreD`!l%();var tempDimmedArray = []`+;6`#0#Image`$d&`+P&`!:(.indexOf(i) == -1) {` +.push`,)\"_d` 2!`!W\"` z\"[i]);} else` =9`!H(` N\"}`&J?`-O)reel`!|%`#/* === undefined`/8%`\"5.`'L\"`\"A%`)q5`!d!`&s$(`\")+`\"F'` :Cnull);}}}, `$s)`'\"*`26&`#V/`(K%` ).`$q[`$+2` u6`$\\7 ? bp.ColourTransform.createMultiplied` J!` K2, 0.5, 0.5` ##1) :`-9!`#:!`-s*Dimming`#7*`%]U`$<L`23%Anticipation`!>*`20(_antiInProgress;}, _r`3b5`!<0removeListener(bp.EntityReel.Events.REEL_STOPPED,`!2#` {'` U$` l#)`.A#` (6`1.)fire` s@`!|!;`)^$ ==`!C\"a`\"}'Star`#8!`\"A$start`#>(`\"a\"`#c!_pla`!*!StopSoun`\"FdPLAY`!r!_SOUN`# -`!&!`\"t;` 00`\"nC`!--`\"K#, `\"\\-`\"93` b6STARTED_ANTICIPATION` v'allReelsAreStat`49)tat`+i!`*v!ypeof ` .\"`.@!\"string\") {` .$ [` $\"];`/I&`+t,`$5!`+i/!` U\".in`/#!s`*p\"`$b\"i]._` :!)`(a&false;}}`(r$rue;}, kill`-z.`,Z#rawBuffer`,j&` *%.resize(0, 0`$s$` 4&`$a$}`!O#moveAll`&,%` K#parent();while`!1#`\"F(`&s).pop().kill(`,p!);`$V)Set`$_# = {ALL_REELS`(w$:\"`$U$`)k#\"}` N.Util = {g`,^!Po`0}(obj`%D\"`-A\", symId) {`-m$, row`)z!obj`!o! !`3R(&& ` 4!ow` +)`$@!`.N!` O$;row` '$ow`3-$`&-'obj`&/\"number\"` Y&Math.floor(obj /`!f'.ROWS)` r& %` -,;}var po`#<!x:0, y:0};pos.x =` A)EEL_OFFSETS_X`)x\"` C!y = row *`)+\"` H#SYMBOL_HEIGHT +` (0VERTICAL_PADDING || 0)`-H\"`#d! !=`#'*`(J!nfo`!L*OVERSIZED_SYM_INFO[` Z!]` e!info) {`\"=\"bp.Point.add(pos,` j!.offset`!4\"!` ''.abs`!0#oversizedDiff`#'\"-` w\".size.width -`!L(`\"@#WIDTH) / 2, y` G*height` A1`#3\"` R!`$*!`!h1`!H)`(<!`*F#pos;}};});"))
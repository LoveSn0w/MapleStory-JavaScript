/*
發佈於小馬論壇
2017/01/31 -- 轉蛋機Npc By 宗達
From : AmazonMS
 */

var status = -1;
var random;
var req = [
	[5220000, 1],
	[4000306, 10]
]
var weapon = [
	[1452023, 80, true],
	[1452018, 80, true],
	[1452014, 80, true],
	[1452015, 80, true],
	[1462011, 80, true],
	[1452017, 90, true],
	[1462012, 90, true],
	[1462013, 90, true],
	[1452025, 90, true],
	[1452026, 90, true],
	[1452019, 90, true],
	[1462020, 90, true],
	[1462018, 90, true],
	[1462017, 90, true],
	[1462015, 95, true],
	[1462016, 95, true],
	[1452019, 95, true],
	[1452020, 95, true],
	[1452021, 95, true],
	[1452044, 100, true],
	[1462039, 100, true]
]

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	random = Math.floor(Math.random() * weapon.length);
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
	}
	var i = -1;
	if (status <= i++) {
		cm.dispose();
	} else if (status === i++) {
		if (!cm.haveItem(req[0][0], req[0][1]) && !cm.haveItem(req[1][0], req[1][1])) {
			cm.sendNext("不好意思!您沒有#b#t" + req[0][0] + "##i" + req[0][0] + "# 和 #t" + req[1][0] + "##i" + req[1][0] + "##k。");
			cm.dispose();
			return;
		}
		var msg = "";
		for (var v = 0; v < weapon.length; v++) {
			if (v % 2 == 0) {
				msg += "\r\n";
			}
			msg += "#t" + weapon[v][0] + "," + weapon[v][1] + "," + weapon[v][2] + "##v" + weapon[v][0] + "," + weapon[v][1] + "," + weapon[v][2] + "#	";
		}
		cm.sendYesNo("您身上有#b#t" + req[0][0] + "##i" + req[0][0] + "##k可以進行轉蛋。\r\n" +
			"你確定要使用 #b#p" + cm.getNpc() + "##k 進行轉蛋嗎?\r\n" +
			"#r過年期間可用#b#t" + req[1][0] + "##i" + req[1][0] + "##k" + req[1][1] + "個進行轉蛋#k\r\n" +
			"#r－－－－－－－－－－－－－－－－－－－－－－－#k\r\n#r－－－－－－－－－－－－－－－－－－－－－－－#k\r\n" +
			"本機台擁有\r\n" + msg);
	} else if (status === i++) {
		if (!cm.canHold(1432037)) {
			cm.sendNext("背包裝不下喔");
			cm.dispose();
			return;
		} else if (!cm.haveItem(req[0][0], req[0][1]) && !cm.haveItem(req[1][0], req[1][1])) {
			cm.sendNext("不好意思!您沒有#b#t" + req[0][0] + "##i" + req[0][0] + "# 和 #t" + req[1][0] + "##i" + req[1][0] + "##k。");
			cm.dispose();
			return;
		}
		cm.sendSimple("請選擇要用來轉蛋的道具:\r\n#L0##v" + req[0][0] + "##t" + req[0][0] + "##l\r\n#L1##v" + req[1][0] + "##t" + req[1][0] + "##l\r\n");
	} else if (status === i++) {
		sel = selection;
		if (!cm.haveItem(req[selection][0], req[selection][1])) {
			cm.sendNext("不好意思!您沒有#b#t" + req[selection][0] + "##i" + req[selection][0] + "#");
			cm.dispose();
			return;
		}
		cm.sendYesNo("請問是否要使用 #v" + req[selection][0] + "# 來轉蛋呢?");
	} else if (status === i++) {
		cm.gainItem(req[sel][0], -req[sel][1]);
		cm.gainItem(weapon[random][0], 1);
		cm.sendNext("恭喜獲得#v" + weapon[random][0] + "##t" + weapon[random][0] + "#");
		cm.dispose();
	}
}

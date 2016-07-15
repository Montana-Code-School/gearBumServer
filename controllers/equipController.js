function createEquip (req, res){
	req.db.query("INSERT INTO gb.gb_equip VALUES ('boat', '7/15/16', 'luke', '45', 'this is a cool boat', 'missoula', False)", function(err, sqlRes){
		res.json(sqlRes)
	})
}

function retrieveEquipByCat (req, res){
	req.db.query(`select * from gb.gb_equip WHERE category = '${req.params.category}'`, function(err, sqlRes){
      res.json(sqlRes.rows)
    })
}

function deleteEquip (req, res){
	req.db.query("DELETE FROM gb.gb_equip WHERE gb.gb_equip.equipid = 2", function(err, sqlRes){
		res.json(sqlRes)
	})
}

function updateEquip (req, res){
	//UPDATE table SET columnn name = new value WHERE column = old value
	req.db.query("UPDATE gb.gb_equip SET category = 'bike' WHERE category = 'boat'", function(err, sqlRes){
		res.json(sqlRes)
	})
}

module.exports = {
	createEquip,
	retrieveEquipByCat,
	deleteEquip,
	updateEquip
}
function createEquip (req, res){
	var query = `INSERT INTO gb.gb_equip (category, date, usersid, price, description, photos, title, latitude, longitude, hidden) VALUES ('${req.body.category}', '7/15/16', '${req.body.usersid}', '${req.body.price}', '${req.body.description}', '${req.body.photos.join(' ')}', '${req.body.title}', '${req.body.latitude}', '${req.body.longitude}', False)`
	req.db.query(query, function(err, sqlRes){
		if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes)
		}
	})
}

function deleteEquip (req, res){
	req.db.query(`DELETE FROM gb.gb_equip WHERE gb.gb_equip.equipid = '${req.body.equipid}'`, function(err, sqlRes){
		if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes)
		}
	})
}

function updateEquip (req, res){
	//UPDATE table SET columnn name = new value WHERE column = old value
	req.db.query("UPDATE gb.gb_equip SET category = 'bike' WHERE category = 'boat'", function(err, sqlRes){
		if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes)
		}
	})
}

function retrieveEquipByCat (req, res){
	req.db.query(`select * from gb.gb_equip WHERE category = '${req.params.category}'`, function(err, sqlRes){
      	if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		}    
	})
}

function retrieveAllEquip (req, res){
	req.db.query(`select * from gb.gb_equip`, function(err, sqlRes){
        if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		} 
    })
}

function retrieveByEquipId (req, res){
	req.db.query(`select * from gb.gb_equip WHERE equipid = '${req.params.equipid}'`, function(err, sqlRes){
	    if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		} 
    })
}
function retrieveByUserId (req, res){
	req.db.query(`select * from gb.gb_equip WHERE usersid = '${req.params.usersid}'`, function(err, sqlRes){
	    if (err) {
			res.json(Object.assign(err, {sqlError: true}));
		} else {
			res.json(sqlRes.rows)
		} 
    })
}

module.exports = {
	createEquip,
	retrieveEquipByCat,
	deleteEquip,
	updateEquip,
	retrieveAllEquip,
	retrieveByEquipId,
	retrieveByUserId
}
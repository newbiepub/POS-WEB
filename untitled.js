function abc() {
    let children = $("#historyfb1fd687b1feae3fbfb4318b2d25821b5ae0d2f8_item0").parent().children()
    let result = [];
    for (let index = 0; index < children.length; index++) {
        let getItem = $(children[index]);
        result.push(getItem.attr("data-classid"))
    }
    console.log("NUMBER OF ITEMS - ", result.length);
    $.get(`http://steamcommunity.com/id/hungsnt43/inventoryhistory/?ajax=1&cursor%5Btime%5D=1520658527&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=60517568&sessionid=2b87cd8ab4e1a2026dc80c10`).done(data => {
        let csgo188Data = data.descriptions['730'];
        let fields = Object.keys(csgo188Data);
        let arrayItems = [];

        result.forEach(classid => {
            let filterData = fields.find(item => item.indexOf(classid) > -1);
            arrayItems.push(filterData);
        });
        let response = arrayItems.map(item => csgo188Data[item].market_name);
        console.log(JSON.stringify(response));
    })
}
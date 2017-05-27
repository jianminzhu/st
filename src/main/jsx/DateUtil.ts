function changeSingleDate(type) {
    var et;
    if(type=="left"){
        et = moment($("#et").html(), "YYYYMMDD").subtract(1,'days');
    }else {
        et = moment($("#et").html(), "YYYYMMDD").add(1,'days');
        if(et>moment())
            et = moment();
    }
    $("#et").html(et.format("YYYYMMDD"));
    changeWeekStEt(et.format("YYYYMMDD"),$("[name=r_type]:checked").val())
};

function changeCoupleDate(type) {
    var st;
    var et;
    if(type=="left"){
        st = moment($("#st").html(), "YYYYMMDD").subtract(1,'days');
        et = moment($("#et").html(), "YYYYMMDD").subtract(1,'days');
    }else {
        st = moment($("#st").html(), "YYYYMMDD").add(1,'days');
        et = moment($("#et").html(), "YYYYMMDD").add(1,'days');
        if(st>moment() || et>moment()){
            st = moment();
            et = moment();
        }
    }
    $("#st").html(st.format("YYYYMMDD"));
    $("#et").html(et.format("YYYYMMDD"));
};
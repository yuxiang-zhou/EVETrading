var TradeTable = TradeTable();

function Record(args)
{
    var name = args[0].trim();
    var url = 'http://eve-central.com';
    url += $(name).attr('href');
    name = $(name).html();


    var record = {
        Name: '<a href="' + url + '">' + name + '</a>',
        From: args[1].trim(),
        To: args[2].trim(),
        FromLow: parseFloat(args[3].trim().replace(/,/g,'')),
        FromHigh: parseFloat(args[4].trim().replace(/,/g,'')),
        FromQty: parseInt(args[5].trim().replace(/,/g,'')),
        ToLow: parseFloat(args[6].trim().replace(/,/g,'')),
        ToHigh: parseFloat(args[7].trim().replace(/,/g,'')),
        ToQty: parseInt(args[8].trim().replace(/,/g,'')),
        DiffLow: parseFloat(args[9].trim().replace(/,/g,'')),
        DiffHigh: parseFloat(args[10].trim().replace(/,/g,''))
    };
    return record;
}

function TradeTable()
{
    var records = [];

    var colSize= [2,3,2,2,1,2];

    function sortRecordByFromQty(a, b)
    {
        return a.FromQty > b.FromQty ? -1: 1;
    }

    function sortRecordByDiffLow(a, b)
    {
        return a.DiffLow > b.DiffLow ? -1: 1;
    }

    function sortRecordByCustomProfit(a, b)
    {
        var pa, pb;
        pa = a.DiffLow * a.ToQty * (a.FromQty - a.ToQty);
        pb = b.DiffLow * b.ToQty * (b.FromQty - b.ToQty);
        return (a.FromQty - 2 * a.ToQty) > 0 ? (pa > pb ? -1: 1) : 1;
    }

    function filterByDiffQty(a)
    {

        var QDU = parseInt($("#QDU").val());
        var QDL = parseInt($("#QDL").val());
        var TU = parseInt($("#TU").val());
        var FL = parseInt($("#FL").val());
        var DLU = parseInt($("#DLU").val());
        var DLL = parseInt($("#DLL").val());

        return a.FromQty / a.ToQty < QDU && 
                a.FromQty / a.ToQty > QDL && 
                a.ToQty < TU && 
                a.FromQty > FL &&
                a.DiffLow > DLL && 
                a.DiffLow < DLU;
        //return true;
    }

    function showInContent(content)
    {
        var html = "";
        html += '<div class="row">';
        html += '<div class="span'+colSize[0]+'" >';
        html += 'Name';
        html += '</div>';
        html += '<div class="span'+colSize[1]+'" >';
        html += 'From - To';
        html += '</div>';
        html += '<div class="span'+colSize[2]+'" >';
        html += 'Low Price';
        html += '</div>';
        html += '<div class="span'+colSize[3]+'" >';
        html += 'High Price';
        html += '</div>';
        html += '<div class="span'+colSize[4]+'" >';
        html += 'Quantity';
        html += '</div>';
        html += '<div class="span'+colSize[5]+'" >';
        html += 'Difference';
        html += '</div>';
        html += '</div>';
        html += '<hr>';
        $(records).each(function(index, value){
            if(filterByDiffQty(value))
            {
                html += '<div class="row">';
                html += '<div class="span'+colSize[0]+'" >';
                html += value.Name;
                html += '</div>';
                html += '<div class="span'+colSize[1]+'" >';
                html += value.From;
                html += '</div>';
                html += '<div class="span'+colSize[2]+'" >';
                html += value.FromLow;
                html += '</div>';
                html += '<div class="span'+colSize[3]+'" >';
                html += value.FromHigh;
                html += '</div>';
                html += '<div class="span'+colSize[4]+'" >';
                html += value.FromQty;
                html += '</div>';
                html += '<div class="span'+colSize[5]+'" >';
                html += value.DiffLow;
                html += '</div>';
                html += '</div>';
                html += '<div class="row">';

                html += '<div class="span'+colSize[0]+'" >';
                html += '</div>';
                html += '<div class="span'+colSize[1]+'" >';
                html += value.To;
                html += '</div>';
                html += '<div class="span'+colSize[2]+'" >';
                html += value.ToLow;
                html += '</div>';
                html += '<div class="span'+colSize[3]+'" >';
                html += value.ToHigh;
                html += '</div>';
                html += '<div class="span'+colSize[4]+'" >';
                html += value.ToQty;
                html += '</div>';
                html += '<div class="span'+colSize[5]+'" >';
                html += value.DiffHigh;
                html += '</div>';
                html += '</div>';
                html += '<hr>';
            }
        });
        
        $(content).html(" ");
        $(content).html(html);
        console.log("Content Updated");
    }

    return {
        Records: records,
        AddRecord: function(args){records.push(Record(args));},
        ShowInContent: function(args){showInContent(args)},
        SortByFromQty: function(){records = $(records).sort(sortRecordByFromQty);},
        SortByDiffLow: function(){records = $(records).sort(sortRecordByDiffLow);},
        SortByCustomProfit: function(){records = $(records).sort(sortRecordByCustomProfit);}
    };
}




$(function(){
    $price_tables = $('#invisable_content').find('table');

    $price_tables.each(function(ind,val){
        $price_table = $(val)

        $items = $price_table.find('tr[class]');

        $items.each(function(index, value){
            var args = [];
            $(value).find('td').each(function(i,v){
                info = $(v).html();
                switch(i)
                {
                    case 0:
                        places = info.split('<br>');

                        args.push(places[0]);
                        args.push(places[1]);
                        args.push(places[2]);
                        break;
                    case 1:
                        from = info.split('<br>');
     
                        args.push(from[0].split('>')[1]);
                        args.push(from[1].split('>')[1]);
                        args.push(from[2].split('</i>')[1]);
                        break;
                    case 2:
                        to = info.split('<br>');

                        args.push(to[0]);
                        args.push(to[1]);
                        args.push(to[2]);
                        break;
                    case 3:
                        diff = info.split('<br>');

                        args.push(diff[0]);
                        args.push(diff[1]);
                        break;
                }

            });

            TradeTable.AddRecord(args);
        });
    });
    
    TradeTable.SortByCustomProfit();
    TradeTable.ShowInContent('#price_content');
});
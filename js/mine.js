$(document).ready(function(){
    $(".open_close_btn").click(function(){
        $(this).parent().parent().next().find(".inner_td").toggle();
    });

    bindClickForMain();
    bindClickForItem();
    bindClickForItemTitle();
    bindClickForMainTitle();
});

var dataDivObj = "#content_t";

/**
 * 为备料主行中的checkbox添加事件
 */
function bindClickForMain(){
    $("input[class='main']").on("click",function(){
        var mainName = $(this).attr("name");
        var mergeId = mainName.substr(mainName.length-1,1);
        if($(this).is(":checked")){
            //做选中动作
            mainDoCheckedOrNot(mergeId,true);
        }else{
            //做取消动作
            mainDoCheckedOrNot(mergeId,false);
        }
    });
}


/**
 * 为备料主行标题的checkbox添加事件
 */
function bindClickForMainTitle(){
    $("input[name='main_title']").on("click",function(){
        if($(this).is(":checked")){
            $(dataDivObj).find("input[type='checkbox']").prop("checked",true);
        }else{
            //做取消动作
            $(dataDivObj).find("input[type='checkbox']").prop("checked",false);
        }
    });
}


/**
 * 为行项目标题添加checkbox事件
 */
function bindClickForItemTitle(){
    $("input[class='item_title']").on("click",function(){
        var itemTitleName = $(this).attr("name");
        var mergeId = itemTitleName.substr(itemTitleName.length-1,1);
        if($(this).is(":checked")){
            //做选中动作
            itemTitleDoCheckedOrNot(mergeId,true);
        }else{
            //做取消动作
            itemTitleDoCheckedOrNot(mergeId,false);
        }
    });
}

/**
 * 为备料主行中的明细中每一行的checkbox添加事件
 */
function bindClickForItem(){
    $("input[name='item']").on("click",function(){
        var _this = $(this);
        var mergeId = $(this).attr("mergeId");
        if($(this).is(":checked")){
            //做选中动作
            itemDoCheckedOrNot(mergeId,true);
        }else{
            //取消主行标题
            $("input[name='main_title']").prop("checked",false);
            //取消选中时校验其他兄弟节点是否处于选中状态，如果不是选中状态，则把父节点上选中的checkbox取消
            if(checkEnableCancleParantChecked(mergeId)){
                //做取消动作
                itemDoCheckedOrNot(mergeId,false);
            }
        }
    });
}


/**
 * 行项目标题点击选中或取消
 * @param mergeId
 * @param isChecked
 */
function itemTitleDoCheckedOrNot(mergeId,isChecked){
    //行项目明细选中
    $(dataDivObj).find("input[mergeId='" + mergeId + "']").prop("checked",isChecked);
    //主行取消选中
    $(dataDivObj).find("input[name='main"+ mergeId +"']").prop("checked",isChecked);
    //主行标题取消选中
    // $("input[name='main_title']").prop("checked",isChecked);
    changeMainTitleListener(isChecked);
}



/**
 * 备料主行中取消或选中
 */
function mainDoCheckedOrNot(mergeId, isChecked){
    //行项目明细选中
    $(dataDivObj).find("input[mergeId='" + mergeId + "']").prop("checked",isChecked);
    //行项目标题选中
    $(dataDivObj).find("input[name='item_title" + mergeId + "']").prop("checked",isChecked);
    //主行标题选中
    // $("input[name='main_title']").prop("checked",isChecked);
    changeMainTitleListener(isChecked);
}



/**
 * 行项目中做取消或选中动作
 * @param mergeId
 * @param isChecked
 */
function itemDoCheckedOrNot(mergeId, isChecked){
    //行项目标题取消选中
    $(dataDivObj).find("input[name='item_title"+ mergeId +"']").prop("checked",isChecked);
    //主行取消选中
    $(dataDivObj).find("input[name='main"+ mergeId +"']").prop("checked",isChecked);
    //主行标题取消选中
    // $("input[name='main_title']").prop("checked",isChecked);
    changeMainTitleListener(isChecked);
}

/**
 * 取消选中明细行时校验其他兄弟节点是否处于选中状态，如果不是选中状态，则把父节点上选中的checkbox取消
 * @param mergeId
 * @returns {boolean}
 */
function checkEnableCancleParantChecked(mergeId){
    var enableCancleFlag = true;
    $("input[name='item'][mergeId='"+ mergeId +"'").each(function (i) {
        var prop = $(this).prop("checked");
        //存在相同主行下被选中的明细中其他行,不能取消主单复选框的选中
        if(prop){
            enableCancleFlag = false;
            return false;
        }
    });
    if(!enableCancleFlag){
        return false;
    }
    return true;
}

/**
 * 监听主行标题事件
 */
function changeMainTitleListener(isChecked) {
    var allBox = $(dataDivObj).find("input[type='checkbox']");
    var allCheckedBox = $(dataDivObj).find("input:checkbox:checked");
    //选中
    if(isChecked){
        if(!$("input[name='main_title]").prop("checked") && (allBox.length - allCheckedBox.length) == 1){
            $("input[name='main_title']").prop("checked",true);
        }
    }else{
        $("input[name='main_title']").prop("checked",false);
    }
}

// /**
//  * 取消主行标题
//  */
// function doCheckedMainTitle() {
//     var allBox = $(dataDivObj).find("input[type='checkbox']");
//     var allCheckedBox = $(dataDivObj).find("input:checkbox:checked");
//     if($("input[name='main_title]").prop("checked") && (allBox.length - allCheckedBox.length) != 1){
//         $("input[name='main_title']").prop("checked",false);
//     }
// }
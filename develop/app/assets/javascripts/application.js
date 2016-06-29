// =====================================
//       　　即時読み込み
// =====================================
$(function(){
  // common scroll
  smoothScroll();

  //common header
  headermenuToggle();
  headerFormTextAdjust();
  headerInfoFunction();
  ajaxHeaderNoticeYou(1);//初回通信はrequestpageを1として送信
  infiniteScrollEventHeaderYou();
  ajaxHeaderNoticeMinnori(1);//初回通信はrequestpageを1として送信
  infiniteScrollEventHeaderMinnori();

  // common modal
  originalModal();
  modalAdmininduction();
  postModalImageClose();
  modalControl();
  popmenu.ini();
  sendReport();
  toolBoxToggle();

  // common error flash
  flashErrorReloaded();

  // common user follow
  ajaxFollowBotton.call(ajaxFollowBotton,$('.follow_button'));

  // tagfollow
  ajaxTagFollowBotton.call(ajaxTagFollowBotton,$('.tag_follow_button'));

  //common Tag
  tagSuggestInsert();
  tagInput.ini();

  //common form
  formTextAdjust();
  textareaChecker();
  insertFormChecker();

  //common score gage
  scoreParcentAdjust();

  //common post edit
  post_edit();

  //common Timeline
  mypagePost.ini();
  mypageTimeline.ini();
  mypageRecommendTag.ini();
  followTagList.ini();



  if($('.content.faq').size() !== 0){
    faqToggle();
  }
  else if($('.content.settings').size() !== 0){
    selectSet();
    userIdBtnActive();
    userIdCheck();
  }
  else if($('.notifications_list').size() != 0){
    notifications.ini();
  }
  else if($('.informations_list').size() != 0){
    informations.ini();
  }
  else if($('.content.post').size() != 0){
    gooodBtnCount();
    commentGooodBtnCount();
    postImageAdjust();
    postImageChange();
    showComment();
    showReplyForm();
    commentBtnActive();
    commentEdit();
  }
  else if($('.content.top').size() != 0){
    $('.news_slider').slick({
      autoplay:true,
      prevArrow:'<div class="prev_nav"></div>',
      nextArrow:'<div class="next_nav"></div>'
    });
    topMainvisualAdjust();
    $(window).resize(function(){
      topMainvisualAdjust();
    });
  }
  else if($('.content.detail').size() != 0){
    $('.mame_slider').slick({
      draggable:false,
      autoplay:true ,
      arrows:false
    });
    mameEdit();
    mamePost();
    standardInfoEdit();
    sendReportEdit();
    mameGooodBtnCount();
    detailTagFollow();
    detailTagInert();
    overviewEdit();
    staionBasicEdit();
    colorPicker();
    staionBasicEditControll();
    routeBasicEdit();
    traincarBasicEdit();
    trainBasicEdit();
    companyBasicEdit();
    detailMainareaAdjust();
    $(window).resize(function(){
      detailMainareaAdjust();
    });
  }
});


// =====================================
//         スクロール制御
// =====================================
$(window).scroll(function(){
  pageTopScroll();
});


// =====================================
//         スムーススクロール
// =====================================
function smoothScroll() {
  $('a.js_smooth_scroll[href ^= "#"]').click(function() {
    var speed = 700;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    var str = " " + href;
    var target = "#";
    if (str.indexOf(" " + target) !== -1) {
      $('body,html').animate({scrollTop:position}, speed, 'swing');
    }
    return false;
  });
}


// =====================================
//         ページトップスクロール
// =====================================
function pageTopScroll() {
  var scroll = window.pageYOffset;
  if(scroll >= 2000) {
     $('.js_scroll_top').fadeIn(300);
  }
  else {
     $('.js_scroll_top').fadeOut(300);
  }
}

// =====================================
//         無限スクロール制御(header you)
// =====================================
function infiniteScrollEventHeaderYou(requestPage) {
  var requestPage = requestPage;
  var timer = false;
  $('.header_info_list.you').scroll(function(){
    var infiniteFiringHeight = $('.header_info_list.you').get(0).scrollHeight - 340;
    var infiniteScrollTop = $(this).scrollTop();
    if(infiniteScrollTop >= infiniteFiringHeight) {
      var requestPage = $('.header_info_list.you').attr('data-request');
      ajaxHeaderNoticeYou(requestPage);
    }
  });
}


// =====================================
//         無限スクロール制御(header minnori)
// =====================================
function infiniteScrollEventHeaderMinnori(requestPage) {
  var requestPage = requestPage;
  var timer = false;
  $('.header_info_list.minnori').scroll(function(){
    var infiniteFiringHeight = $('.header_info_list.minnori').get(0).scrollHeight - 340;
    var infiniteScrollTop = $(this).scrollTop();
    if(infiniteScrollTop >= infiniteFiringHeight) {
      var requestPage = $('.header_info_list.minnori').attr('data-request');
      ajaxHeaderNoticeMinnori(requestPage);
    }
  });
}


// =====================================
//         レイアウト調整
// =====================================
// mainvisual resize
function topMainvisualAdjust() {
  $(function(){
    var windowSize = $(window).width();
    var fixedColumnSize = 500;
    var resizeColumnSize = windowSize - fixedColumnSize;
    $('.mainvisual_maparea').css('width', resizeColumnSize);
  });
}

function detailMainareaAdjust() {
  $(window).load(function(){
    $('.js_detailcard').each(function(){
      var detailMaincardHeight = parseInt($(this).css('height'));
      var detailMaincardImageHeight = parseInt($(this).find('.js_detailcard_img').css('height'));
      var adjustHeight = detailMaincardHeight - detailMaincardImageHeight;
      var adjustTopHeight = adjustHeight/2;

      $(this).find('.js_detailcard_img').css('top', adjustTopHeight);
    });
  });
}

// =====================================
//        modal
// =====================================
function originalModal() {
  var targetBg = $('#originalmodal_bg');
  var originalMoadalSwitch = $('.js_originalmodal_switch');
  var originalmodalClise = $('.originalmodal_close');
  var closeItem = $('.js_originalmodal_closeitem');
  $(originalMoadalSwitch).click(function(){
    var modalId = $(this).attr('data-modalid');
    var target = $('.' + modalId);
    var targetHeight = $(target).outerHeight();
    var windowHeight = $(window).outerHeight();
    var adjustHeight = windowHeight - targetHeight;
    var adjustTop = adjustHeight/2;
    var adjustTopClose = adjustTop - 50;

    var targetWidth = $(target).outerWidth();
    var windowWidth = $(window).outerWidth();
    var adjustWidth = windowWidth - targetWidth;
    var adjustSide = adjustWidth / 2;
    var adjustSideClose = adjustSide + targetWidth - 30;

    $(target).fadeIn(500);
    $(targetBg).fadeIn(500);
    $(closeItem).addClass('on');
    $(target).css('top', adjustTop);
    $(target).css('left', adjustSide);
    $(target).css('margin',0);//
    $(originalmodalClise).css('top', adjustTopClose);
    $(originalmodalClise).css('left', adjustSideClose);
    $(closeItem).click(function(){
      if($(this).hasClass('on')) {
        $(target).fadeOut(500);
        $('.js_originalmodal_target').fadeOut(500);
        $(targetBg).fadeOut(500).removeClass('on');
      }
    });
  });
}
// =====================================
//         表示文字数調整
// =====================================
// top carousel text adjust
function topCarouselTextadjust() {
  $setElm = $('.news_slider_item_inner_post');
  var cutFigure = '97';
  var afterTxt = ' …';

  $setElm.each (function(){
    var textLength = $(this).text().length;
    var textTrim = $(this).text().substr(0,(cutFigure));
    if (cutFigure < textLength) {
      $(this).html(textTrim + afterTxt).css('visibility','visible');
    }
    else if(cutFigure >= textLength) {
      $(this).css('visibility','visible');
    }
  });
}


// card post text adjust
function topCarouselTextadjust() {
  $setElm = $('.card_post_top_inner_text.js_textadjust');
  var cutFigure = '30';
  var afterTxt = ' …';

  $setElm.each (function(){
    var textLength = $(this).text().length;
    var textTrim = $(this).text().substr(0,(cutFigure));
    if (cutFigure < textLength) {
      $(this).html(textTrim + afterTxt).css('visibility','visible');
    }
    else if(cutFigure >= textLength) {
      $(this).css('visibility','visible');
    }
  });
}


// =====================================
//         要素の表示非表示切り替え
// =====================================
// header menu toggle
function headermenuToggle() {
  $('.js_header_menu, .header_menu').mouseover(function(){
    $('.header_menu').show();
  });
  $('.header_menu').mouseout(function(){
    $(this).hide();
  });
}

// modal image delete
function postModalImageClose() {
  $(document).on("click", ".js_modal_post_image_close", function(){
    $(this).parent().remove();
    if ($('.js_modal_post_image_close').length < 1) {
      $('.modal_post_inner_insert_imagebox').hide();
    }
  });
}

// header info function
function headerInfoFunction() {
  $('.js_header_info').click(function(){
    $('.header_info').toggle();
    $('body').toggleClass('fixed');
  });
  $('.header_info_label_left').click(function(){
    $(this).addClass('active');
    $('.header_info_label_right').removeClass('active');
    $('.header_info_list.minnori').hide();
    $('.header_info_list.you').show();
  });
  $('.header_info_label_right').click(function(){
    $(this).addClass('active');
    $('.header_info_label_left').removeClass('active');
    $('.header_info_list.you').hide();
    $('.header_info_list.minnori').show();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.header_label').length) {
      $('.header_info').hide();
      $('body').removeClass('fixed');
    }
  });
}

// =====================================
//         要素のデータ変更
// =====================================

function headerFormTextAdjust() {
  $('.js_modal_post_select').change(function(){
    var selectText = $(this).find('option:selected').text();
    $(this).prev().find('.js_modal_post_select_text').text(selectText);
  });
  $('.js_select').each(function(){
    $(this).change(function(){
      var selectText = $(this).find('option:selected').text();
      $(this).prev().find('.js_select_text').text(selectText);
    });
  });
}

function formTextAdjust() {
  $('.js_changeing_select').change(function(){
    var selectText = $(this).find('option:selected').text();
    $(this).prev().find('.js_changeing_select_text').text(selectText);
  });
}
// 下記形式で使用可能
// .form_keyword_inner
//   %span.js_changeing_select_text hoge
// %select.form_keyword_select.js_changeing_select
//   %option{value:"hoge"} hoge




function tagSuggestFunction(tagareaTarget,ajaxFunction) {//第一引数にタグエリアを指定、第２引数には走らせたいajax処理を記述
  var target = tagareaTarget;
  $(target).keyup(function(){
    if ($('.ui-autocomplete-input').val() == '') {
      $('.modal_post_inner_tagarea_right_suggest').hide();
    }
    else if ($('.ui-autocomplete-input').val() != '') {
      $('.modal_post_inner_tagarea_right_suggest').show();
    }
    var keyword = $('.ui-autocomplete-input').val();
    eval(ajaxFunction + '(keyword)');
  });

  $(document).on('click', '.suggest_list_item', function() {
    var name = $(this).find('span.name').text();
    var suggestlClass = $(this).attr('class');
    var officialClass = suggestlClass.replace('suggest_list_item ','');
    var insertTag = '<li class="tagit-choice ui-widget-content ui-state-default ui-corner-all tagit-choice-editable ' + officialClass + '"><span class="tagit-label">' + '#' + name + '</span><a class="tagit-close"><span class="text-icon">×</span><span class="ui-icon ui-icon-close"></span></a><input type="hidden" value="' + name + '" name="tags[innertags][]" class="tagit-hidden-field"></li>';
    $(this).parent().siblings('.modal_post_inner_tagarea_right_inserttag').find('.tagit-new').before(insertTag);

    $('.tagit-close').click(function(){
      $(this).parent().remove();
    });

    $('.suggest_list').hide();

    $('.ui-autocomplete-input').val('');
  });

  // tagitプラグイン読み込み
  // $(target).tagit({
  //   removeConfirmation: true,
  //   placeholderText:'ハッシュタグを追加する',
  //   animate:false
  // });
}

function textareaChecker() {
  $('.js_modal_post_textarea').keyup(function(){
    var textareaInner = $(this).val().length;
    if (textareaInner > 0) {
      $('.js_modal_post_submit').prop('disabled', false).addClass('active');
    }
    else if (textareaInner === 0) {
      $('.js_modal_post_submit').prop('disabled', true).removeClass('active');
    } else {
      $('.js_modal_post_submit').prop('disabled', true);
    }
  });
}

function tagSuggestInsert() {
  $(document).on('click', '.modal_post_inner_tagarea_right_recommendtagarea_tag', function() {
  var tagName = $(this).attr('data-name');
  var tagOfficial = $(this).attr('data-official');
  var insertRcommendTag = '<li class="tagit-choice ui-widget-content ui-state-default ui-corner-all tagit-choice-editable ' + tagOfficial + '"><span class="tagit-label">' + '#' + tagName + '</span><a class="tagit-close"><span class="text-icon">×</span><span class="ui-icon ui-icon-close"></span></a><input type="hidden" value="' + tagName + '" name="tags[innertags][]" class="tagit-hidden-field"></li>';
  $(this).parent().siblings('.modal_post_inner_tagarea_right_inserttag').find('.tagit-new').before(insertRcommendTag);
  $(this).remove();
});
}


// =====================================
//        ajax autocomplete
// =====================================
function headerAjaxAutocompleteTag(keyword) {
  $.ajax('/app/assets/javascripts/sample_autocomplete.json', {
    type: 'GET',
    dataType: 'json',
    data: {
      inputKey: keyword
    },
    error: function(jqXHR, textStatus, errorThrown) {
      showFlash('error', 'エラーが発生しました。');
    },
    success: function(data, textStatus, jqXHR) {
      var conectChack = data.result;
      if (conectChack === 'success') {
        $('.suggest_list_item').remove();
        $.each(data.sujest, function() {
          var officialClass = 'official';
          if (this['official'] === false) {
            officialClass = 'private';
          }
          var suggestItem = '<li class="suggest_list_item ' + officialClass + '">' + '#' + '<span class="name">' + this['name'] + '</span>' + '<span class="postNum">' + this['postNum'] + '</span>' + '</li>';
          $('.js_modal_post .suggest_list').append(suggestItem);
        });
      }
      else if (conectChack === 'error') {
        var errorMassage = data.message;
      }
    }
  });
}

// =====================================
//        ajax header notice you
// =====================================
function ajaxHeaderNoticeYou(requestPage) {
  var getNum = 10;//取得数
  $.ajax('/app/assets/javascripts/sample_notice_you.json', {
    type: 'GET',
    dataType: 'json',
    data: {
      nextPage: requestPage,
      getNum:getNum
    },
    error: function(jqXHR, textStatus, errorThrown) {
      showFlash('error', 'エラーが発生しました。');
    },
    success: function(data, textStatus, jqXHR) {
      var conectChack = data.result;
      if (conectChack === 'success') {
        var requestPage = data.nextPage;
        $('.header_info_list.you').attr('data-request', requestPage);
        if (data.nextPage === 0) {
          return false;
        }
        else if (data.nextPage > 0) {
          $.each(data.notice, function() {
            var noticeItem = '<li class="header_info_list_item"><a class="header_info_list_item_link" href="' + this['url'] + '"><div class="header_info_list_item_link_left"><img alt="" class="u-icon_radius" src="' + this['userIcon'] + '" width="30"></div><div class="header_info_list_item_link_right"><p class="header_info_list_item_link_right_text">' + this['content'] + '</p><p class="header_info_list_item_link_right_time">' + this['time'] + '</p></div></a></li>';
            $('.header_info_list.you').append(noticeItem);
          });
        }
      }
      else if (conectChack == 'error') {
        var errorMassage = data.message;
      }
    }
  });
}


// =====================================
//        ajax header notice you
// =====================================
function ajaxHeaderNoticeMinnori(requestPage) {
  var getNum = 10;//取得数
  $.ajax('/app/assets/javascripts/sample_notice_minnori.json', {
    type: 'GET',
    dataType: 'json',
    data: {
      nextPage: requestPage,
      getNum:getNum
    },
    error: function(jqXHR, textStatus, errorThrown) {
      showFlash('error', 'エラーが発生しました。');
    },
    success: function(data, textStatus, jqXHR) {
      var conectChack = data.result;
      if (conectChack === 'success') {
        var requestPage = data.nextPage;
        $('.header_info_list.minnori').attr('data-request', requestPage);
        if (data.nextPage === 0) {
          return false
        }
        else if (data.nextPage > 0) {
          $.each(data.notice, function() {
            var noticeItem = '<li class="header_info_list_item"><a class="header_info_list_item_link" href="' + this['url'] + '"><div class="header_info_list_item_link_left"><img alt="" class="u-icon_radius" src="' + this['userIcon'] + '" width="30"></div><div class="header_info_list_item_link_right"><p class="header_info_list_item_link_right_text">' + this['content'] + '</p><p class="header_info_list_item_link_right_time">' + this['time'] + '</p></div></a></li>';
            $('.header_info_list.minnori').append(noticeItem);
          });
        }
      }
      else if (conectChack == 'error') {
        var errorMassage = data.message
      }
    }
  });
}

// =====================================
//         マイページ 初回 フォローボタン
// =====================================
var mypageRecommendTag = {
  'setFunc' : function(obj){
    obj.click(function(){
      var tgtTag = $(this).data('targettag');
      var tgtItem = $(this).closest('.item');
      $.ajax('/app/assets/javascripts/sample_mypage_tagfollow.json', {
        // type: 'PATCH',
        type: 'GET',
        dataType: 'json',
        data: {
          'tag': tgtTag
        },
        error: function(jqXHR, textStatus, errorThrown) {
          showFlash('error', 'エラーが発生しました。');
        },
        success: function(data, textStatus, jqXHR) {
          //押されたタグを削除
          tgtItem.fadeOut(500,function(){
            var html = '<div class="tag_box"><a href="'+data.tag['tagURL']+'"><div class="image"><img src="'+data.tag['tagIcon']+'"></div><div class="label">'+data.tag['tagName']+'</div></a></div><div class="action"><a data-targettag="'+data.tag['tagId']+'" href="javascript:void(0)">タグをフォローする</a></div>';

            $(this).html(html).fadeIn();

            mypageRecommendTag.ini();
          });

          //最下部のボタンのアクティブ化
          $('.button_show_timeline .button').removeAttr('disabled');

        }
      });
    });
  },
  'ini' : function(){
    $('.recommended_tag_list .action a').each(function(){
      if(!$(this).hasClass('js_set')){
        $(this).addClass('js_set');
        mypageRecommendTag.setFunc($(this));
      }
    });
  }
}


// =====================================
//         マイページ 投稿フォーム
// =====================================
var mypagePost = {
  'classname_edit' : 'editing',
  'classname_active' : 'active',
  'ini' : function(){
    $('.mypage_post .js_mypage_post_textarea').focus(function(){
      $('.mypage_post').addClass(mypagePost.classname_edit);
    }).keyup(function(){
      if($(this).val() != ""){
        $('.mypage_post_inner_submit').addClass(mypagePost.classname_active);
      } else {
        $('.mypage_post_inner_submit').removeClass(mypagePost.classname_active);
      }
    });
  }
}

// =====================================
//         マイページ タグ選択
// =====================================
var tagInput = {
  'classname' : 'tag_set_area',
  'inputed_val' : '',
  'lastKeycode' : '',
  'keypressCount' : 0,
  'IMEStatus' : false,
  'setTag' : function(tgt_input,value,type){
    value = value.replace(/[\s　#]/g, "");
    if(!type){
      type = 'private';
    }
    if(value){

      //追加済のタグは追加出来ない
      var flg_batting = false;
      tgt_input.find('.selected_tag_list .tag .label').each(function(){
        if($(this).html() == value){
          flg_batting = true;
        }
      });
      if(flg_batting){
        tgt_input.find('.input_tag').val('');
        return false;
      }

      tgt_input.find('.selected_tag_list').append('<span class="tag '+type+'"><span class="label">'+value+'</span><span class="tag_delete" >×</span><input type="hidden" value="'+value+'" name="tags[innertags][]"></span>');
      tagInput.suggestClose();
      tgt_input.find('.input_tag').val('');

      //追加したタグの削除ボタン
      tgt_input.find('.selected_tag_list .tag').click(function(){
        $(this).remove();
      });
    }
  },
  'suggestClose' : function(){
    $('.tag_suggest_list').remove();
  },
  'ini' : function(){
    $('.'+tagInput.classname).each(function(){
      var tgt_input = $(this).find('.tag_input_area');

      //おすすめタグ押下時
      $(this).find('.recommend_tag').each(function(){
        $(this).click(function(){
          tagInput.setTag(tgt_input, $(this).html(), $(this).data('type'));
          $(this).remove();
        });
      });

      //フォーカス時のclass制御
      tgt_input.find('.input_tag').focus(function(){
        tgt_input.addClass('focus');
      });
      tgt_input.find('.input_tag').focusout(function(){
        tgt_input.removeClass('focus');
        //サジェストリストの削除
        setTimeout(function(){
          tagInput.suggestClose();
        },500);
      });

      //追加したタグの削除ボタン
      tgt_input.find('.selected_tag_list .tag').click(function(){
        $(this).remove();
      });

      //エンターキーの無効化
      tgt_input.find('.input_tag').keydown(function(e){
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
          return false;
        } else {
          return true;
        }
      });

      tgt_input.find('.input_tag').keypress(function(e){
        tagInput.getIMEMode(e);
      });
      tgt_input.find('.input_tag').keydown(function(e){
        tagInput.getIMEMode(e);

        //Backspace押下時
        if((e.which && e.which === 8) ||
          (e.keyCode && e.keyCode === 8)){

          if(tgt_input.find('.input_tag').val() == ""){
            tgt_input.find('.selected_tag_list .tag:last').remove();
          }

        }
      });
      tgt_input.find('.input_tag').keyup(function(e){

        //IME変換確定直後のEnter押下時
        if(tagInput.IMEStatus && tagInput.getIMEMode(e)){
          tagInput.setTag(tgt_input,tgt_input.find('.input_tag').val(),'private');
        };

        //IME変換確定直後のスペースバー押下時
        if(tagInput.IMEStatus && e.keyCode == 32){
          tagInput.setTag(tgt_input,tgt_input.find('.input_tag').val(),'private');
        };

        tagInput.IMEStatus = tagInput.getIMEMode(e);

        if($(this).val().match(/[^\s　]/)){
          $.ajax('/app/assets/javascripts/sample_autocomplete.json', {
            type: 'GET',
            dataType: 'json',
            data: {
              inputKey: $(this).val()
            },
            error: function(jqXHR, textStatus, errorThrown) {
              showFlash('error', 'エラーが発生しました。');
            },
            success: function(data, textStatus, jqXHR) {
              var conectChack = data.result;
              if (conectChack === 'success') {
                //サジェストリストのリセット
                tagInput.suggestClose();

                //サジェストリストの生成
                var html = '<ul class="tag_suggest_list">';
                $(data.sujest).each(function(){
                  var officialClass = 'official';
                  if (this['official'] === false) {
                    officialClass = 'private';
                  }
                  html += '<li class="suggest_list_item" data-tagtype="' + officialClass + '"><span class="name">' + this['name'] + '</span>' + '<span class="postNum">' + this['postNum'] + '</span>' + '</li>';
                });
                html += '</ul>';
                $('body').append(html);

                //サジェストの位置調整
                var pos = tgt_input.find('.input_tag').offset();
                $('.tag_suggest_list').css({
                  'top': (pos.top+30)+'px',
                  'left': pos.left+'px'
                });

                //サジェストリスト押下時のfunction設定
                $('.tag_suggest_list .suggest_list_item').click(function(){
                  //タグの選択
                  var selected_tag_name = $(this).find('.name').html();
                  var selected_tag_type = $(this).data('tagtype');

                  tagInput.setTag(tgt_input,selected_tag_name,selected_tag_type);

                  //サジェストリストの削除
                  tagInput.suggestClose();

                  tgt_input.find('.input_tag').val('');

                  //追加したタグの削除ボタン
                  tgt_input.find('.selected_tag_list .tag').click(function(){
                    $(this).remove();
                  });
                });

              }
              else if (conectChack === 'error') {
                var errorMassage = data.message;
              }
            }
          });
        } else {
          //サジェストリストの削除
          tagInput.suggestClose();
        }



      });
    });
  },
  'getIMEMode' : function(e){
    if (e.type == 'keypress' && (e.keyCode != 241) && (e.keyCode != 242)) {
      tagInput.keypressCount++;
    } else if (e.type == 'keyup') {
      tagInput.keypressCount--;

      if ( tagInput.keypressCount < 0 ) {
        if (e.keyCode == 13) {
          return true;
        } else {
        return false;
        }
        tagInput.keypressCount = 0;
      } else {
        return false;
      }
    }

  }
}

// =====================================
//         マイページ URL変更とそれに伴うga送信
// =====================================
var urlControll = {
  'push' : function(url,title){
      history.pushState(null, null, url);

      //gaにpageviewを送信
      ga('send','pageview', {
        'page' : url,
        'title' : title
      });
  }
}

// =====================================
//         マイページ タイムライン
// =====================================
var mypageTimeline = {
  'nextpage' : null,
  'loadingFlg' : false,
  'loader' : '<div class="loader" id="mypage_timeline_loader"></div>',
  'type' : '',
  'endFlg' : false,
  'ini' : function(){
    //初期表示時のロード
    mypageTimeline.load(mypageTimeline.nextpage);
    if($('.timeline').size()){
      mypageTimeline.type = $('.timeline').data('type');
      $(window).scroll(function(){
        if($(document).height()-$(window).height()-$(window).scrollTop() < 100){
          mypageTimeline.load(mypageTimeline.nextpage);
        }
      });
    }
  },
  'load': function(page){
    //data.nextPageが0だったらそれ以降ajax処理を実行しない
    if(mypageTimeline.endFlg){
      return false;
    }
    var getNum = 10;//取得数
    if(mypageTimeline.loadingFlg) {
      //2重ロード回避
      return false;
    }
    mypageTimeline.loadingFlg = true;
    $('.timeline').append(mypageTimeline.loader);

    //1秒後にロード開始
    setTimeout(function(){
      $.ajax('/app/assets/javascripts/sample_mypage_timeline.json', {
        type: 'GET',
        dataType: 'json',
        data: {
          'page' : page,
          'getNum':getNum
        },
        error: function(jqXHR, textStatus, errorThrown) {
          showFlash('error', 'エラーが発生しました。');
        },
        success: function(data, textStatus, jqXHR) {
          //data.nextPageが0だったらそれ以降ajax処理を実行しない
          if(data.nextPage == "0"){
            mypageTimeline.endFlg = true;
          }

          //flgをfalseに戻す
          mypageTimeline.loadingFlg = false;

          //ローダーを削除
          $('#mypage_timeline_loader').remove();

          //URL変更
          if(mypageTimeline.nextpage){
            urlControll.push(location.pathname+'?page='+mypageTimeline.nextpage);
          }

          //次頁カウントアップ
          mypageTimeline.nextpage ++;

          //HTML生成
          if(data.postList.length){
            //1件以上あるかチェック
            var html = '';
            $(data.postList).each(function(){
              html += '<div class="timeline_item hide"><div class="timeline_header"><div class="user_info"><a href="'+this['userUrl']+'"><div class="user_icon"><img src="'+this['userIcon']+'"></div><p class="user_name">'+this['userId']+'</p></a></div>';

              html += '<div class="post_edit_box">';

              if( mypageTimeline.type == 'myself' ){
                html += '<div class="btn_post_edit">'+
                '<i class="s s-edit popmenu_toggle_click"></i>'+
                '<div class="popmenu_content">'+
                  '<ul>'+
                    '<li class="edit_link js_modal_post_edit_switch js_originalmodal_switch js_trigger_postedit" data-modalid="modal_editpost" data-postid="'+this['postId']+'"><a>この投稿を編集する</a></li>'+
                    '<li class="delete_link" data-postid="'+this['postId']+'"><a class="modal_btn" data-modal="edit_modal_'+this['postId']+'" href="javascript:void(0);">この投稿を削除する</a></li>'+
                  '</ul>'+
                '</div></div>';

                //削除モーダル
                html += '<div id="edit_modal_'+this['postId']+'"><form action="/dummy_post_delete_form"><input type="hidden" name="postid" value="'+this['postId']+'"><p class="text">この投稿を本当に削除しますか？</p><ul class="actions"><li><a class="btn cancel" href="javascript:void(0)">キャンセル</a></li><li><input type="submit" value="削除する" class="btn btn_strong" ></li></ul></form></div>';
              }

              html += '<p class="post_time">'+this['postTime']+'</p>'+
              '</div>';

              //本文
              html += '<div class="post_content"><a href="'+this['postUrl']+'">'+this['content']+'<span class="more_link">もっと見る</span></a></div>';

              //タグ
              html += '<ul class="tags">';
              $(this['tags']).each(function(i){
                html += '<li class="tag">'+this+'</li>';
              });
              html += '</ul></div>';

              //画像
              if(this['postImageList'].length){
                html += '<div class="post_image_list"><a href="#"><div class="img_left" style="background-image:url(\''+this['postImageList'][0]+'\')"></div>';
                if(this['postImageList'].length > 1){
                  html += '<div class="img_right" style="background-image:url(\''+this['postImageList'][1]+'\')">';
                  if(this['postImageList'].length > 2){
                    html += '<span>+'+(this['postImageList'].length-2)+'</span>';
                  }
                  html += '</div>';
                }
                html += '</a></div>';
              }

              //PV、Like、コメント
              html += '<div class="post_meta_info"><div class="pv_count"><i class="s s-view"></i>'+this['pv']+'</div><div class="like_count"><i class="s s-good"></i>'+this['like']+'</div><div class="comment_count"><i class="s s-comment"></i>'+this['comment']+'</div></div>';

              //コメント
              if(this['commentList'].length){
                html += '<div class="comment_list">';
                $(this['commentList']).each(function(i){
                  html += '<div class="comment_item"><div class="user_icon"><img src="'+this['userIcon']+'"></div><div class="comment_header"><div class="user_name"><a href="'+this['userUrl']+'">'+this['userId']+'</a></div><div class="post_time">'+this['postTime']+'</div></div><div class="comment_content"><p>'+this['comment']+'</p></div><div class="comment_meta_info"><div class="like_count"><i class="s s-comment"></i>'+this['like']+'</div></div></div>';
                });
                html += '</div>';
              }

              //すべてのコメントをみる
              if(Number(this['comment']) > 2){
                html += '<div class="comment_more_link"><a href="#">すべてのコメントをみる '+this['comment']+'件・コメントする</a></div>';
              }

              html += '</div>';
            });

            $('.timeline').append(html);

            //順にclass hideを削除
            $('.timeline_item.hide').each(function(i){
              $(this).delay(300*i).queue(function(next) {
                  $(this).removeClass('hide');
              });
            });

            //編集ボタンの有効化
            originalModal();
            popmenu.ini();
            modalControl();
            post_edit();
          }
        }
      });
    },1000);
  }
}

// =====================================
//         マイページモーダル
// =====================================
var mypageModal = {
  'modal_content' : null,
  'open_flg' : false,
  'open' : function(selctor,func){

    if(mypageModal.open_flg){
      mypageModal.close();
      setTimeout(function(){
        mypageModal.open(selctor,func);
      },1000);
      return false;
    }
    mypageModal.open_flg = true;
    mypageModal.modal_content = $(selctor);
    //指定されたコンテンツの場所を保持するため、wrapする
    mypageModal.modal_content.wrap('<div id="modal_original_position"></div>');

    var st = $(window).scrollTop();
    var html = '<div class="mypage_modal_bg" onclick="mypageModal.close();" style="display: none;width: 100%;height: 100%;position: fixed;z-index: 9998;opacity: 0.8;background: #272727;display: none;top: 0;left: 0;"></div><div class="modal_content" style="display: none;width: 800px;height: auto;position: absolute; top: '+st+'px;left: 50%;margin-left: -400px;z-index: 9999;"><div class="btn_close"><a href="javascript:void(0)" onclick="mypageModal.close();"></a></div><div class="mypage_modal_inner"></div></div>'
    $('body').append(html);

    $(mypageModal.modal_content).show().appendTo('.mypage_modal_inner');

    var margin_top = ($(window).height()-$('.modal_content').height())*0.5;
    if(margin_top < 0) {
      margin_top = 0;
    }

    $('.modal_content').css({
      'top' : st+margin_top+'px'
    });

    $('.mypage_modal_bg').fadeIn(500);
    $('.modal_content').fadeIn(500);

    func();
  },
  'close' : function(){
    $('.mypage_modal_bg,.modal_content').fadeOut(500,function(){
      //モーダルの中身を元の場所へ戻す
      mypageModal.modal_content.insertAfter('#modal_original_position').hide();
      $('#modal_original_position').remove();
      $(this).remove();
      mypageModal.open_flg = false;
    });
  }
}

// =====================================
//       マイページ フォローしているタグの表示・編集
// =====================================
$(function(){
  $('.js_registrated_tag').click(function(){
    var userid = $(this).data('userid');
    followTagList.ini(userid);
  });
});
var followTagList = {
  'ini' : function(userid){
    var userid = userid;
    $.ajax('/app/assets/javascripts/sample_followtaglist.json', {
      type: 'GET',
      dataType: 'json',
      data: {
        userid: userid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        var conectChack = data.result;
        if (conectChack === 'success') {
          //編集モーダル内のタグリスト更新
          followTagList.update_form_list(data);
        }
        else if (conectChack == 'error') {
          var errorMassage = data.message
          showFlash('error', errorMassage);
        }
      }
    });
  },
  'update_form_list' : function(data){
    var html_edit = '';
    $(data.registration).each(function(){
      var classname = 'official';
      if(this['official'] == false){
        classname = 'private';
      }
      html_edit += '<span class="tag '+classname+'"><span class="label">'+this['name']+'</span><span class="tag_delete" >×</span><input type="hidden" value="'+this['name']+'" name="tags[innertags][]"></span>';
    });
    $('#modal_tag_edit .selected_tag_list .tag').remove();
    $('#modal_tag_edit .selected_tag_list').append(html_edit);
    //追加したタグの削除ボタン
    $('#modal_tag_edit .selected_tag_list').find('.tag').click(function(){
      $(this).remove();
    });
  }
}


// =====================================
//       ツールチップ
// =====================================
var popmenu = {
  'ini' : function(){
    //ホバーして表示されるパターン
    $('.popmenu_toggle').each(function(){
      if($(this).data('eventset') != true){
        $(this).data('eventset',true);
        var popmenu_content = $(this).next('.popmenu_content');
        var flg_toggle_hover = false;
        var flg_content_hover = false;
        $(this).hover(function(){
          popmenu_content.addClass('show');
          flg_toggle_hover = true;
        },function(){
          flg_toggle_hover = false;
          setTimeout(function(){
            if(!flg_toggle_hover&&!flg_content_hover){
              popmenu_content.removeClass('show');
            }
          },500);
        });
        popmenu_content.hover(function(){
          flg_content_hover = true;
        },function(){
          flg_content_hover = false;
          setTimeout(function(){
            if(!flg_toggle_hover&&!flg_content_hover){
              popmenu_content.removeClass('show');
            }
          },500);
        });
      }
    });

    //クリックして表示されるパターン
    $('.popmenu_toggle_click').each(function(){
      //２重セット回避
      if($(this).data('eventset') != true){
        $(this).data('eventset',true);
        var popmenu_content = $(this).next('.popmenu_content');
        $(this).click(function(){
          popmenu_content.toggleClass('show');
        });
      }
    });
  }
}

// =====================================
//       豆知識入力
// =====================================
function mamePost() {
  var targetForm = $('.detailmame_form_text');
  var targetFormArgument = 'detailmame_form_text';
  targetForm.focus(function(){
    if($(this).closest('.detailmame_postarea_item_editform').length) {
      return false;//豆知識編集時は無効化
    }
    $(this).keyup(function(){
      textNumCount(targetFormArgument,140);
    });
  });
}

// =====================================
//       豆知識の編集
// =====================================
function mameEdit(){
  var editLink = $('.js_mame_edit');
  var editComment, editText;

  /* 編集フォーム 閉じる */
  $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
    $('.comment_modal_bg').remove();
    editComment = $('.detailmame_postarea_item.edit_active');
    editComment.removeClass('edit_active');
    editComment.find('>.detailmame_postarea_item_inner').show();
    editComment.find('>.detailmame_postarea_item_editform').hide();
  });

  /* 編集フォーム 開く */
  editLink.on('click', function(){
    var mameid = $(this).attr('data-mameid');
    var taeget = $(this);
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_mame_edit.json',
      dataType: 'json',
      data: {
        'mameid': mameid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          var content = data.content;
          var genre = data.genre;
          $('body').append('<div class="comment_modal_bg">');
          $('.tool_box').hide();
          var editComment = $(taeget).closest('.detailmame_postarea_item');
          editComment.addClass('edit_active');
          editComment.find('>.detailmame_postarea_item_inner').hide();
          editComment.find('>.detailmame_postarea_item_editform').show();
          editComment.find('.detailmame_form_text').text(content);
          editComment.find('.js_changeing_select_text').text(genre);
          editComment.find('.detailmame_form_text').text(content);
          editComment.find('.js_changeing_select').val(genre);


          var textNum = editComment.find('.js_mame_textarea').val().length;
          var limitNum = 140;
          var remainingNum = limitNum - textNum;
          var controllTarget = editComment.find('.js_textcount_controlltarget_num');
          $(controllTarget).text(remainingNum);
          var mameTextArea = editComment.find('.js_mame_textarea');

          editComment.find('.js_mame_textarea').keyup(function(){
            if($(this).val() === '') {
              $(this).closest('.detailmame_form').find('.btn_post').removeClass('active').addClass('noactive').prop('disabled',true)
            } else {
              $(this).closest('.detailmame_form').find('.btn_post').removeClass('noactive').addClass('active').prop('disabled',false)
            }

            // textNumCountファンクションの中身を変更して流用
            var textNum = editComment.find('.js_mame_textarea').val().length;
            var limitNum = 140;
            var remainingNum = limitNum - textNum;
            var controllTarget = editComment.find('.js_textcount_controlltarget_num');
            $(controllTarget).text(remainingNum);
            var mameTextArea = editComment.find('.js_mame_textarea');
            if(textNum > limitNum) {
              $(controllTarget).css('color','#d20000;').closest("form").find('.js_submit').prop('disabled',true).addClass('noactive').removeClass('active');
            } else if(textNum <= limitNum) {
              $(controllTarget).css('color','#3a3a3a').closest("form").find('.js_submit').addClass('active');
            }
            insertFormChecker();//文字数0でdisabled
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
    $(this).closest('.detailmame_postarea_item').find('.js_mame_edit_hidden').val(mameid);
  });
}

// テキスト入力0文字時にdisabled処理を実行
function insertFormChecker() {
  var targetForm = $('.js_inerttform_check');
  var targetText = $('.js_inerttform_check_text');
  var targetBtn = $('.js_inerttform_check_btn');
  $(targetForm).find(targetText).keyup(function(){
    if($(this).val() === '') {
      $(this).closest(targetForm).find(targetBtn).removeClass('active').addClass('noactive').prop('disabled',true)
    } else {
      $(this).closest(targetForm).find(targetBtn).removeClass('noactive').addClass('active').prop('disabled',false)
    }
  });
}


// =====================================
//       基本情報の編集
// =====================================
function standardInfoEdit(){
  var editLink = $('.js_standard_edit');
  var editComment, editText;

  /* 編集フォーム 閉じる */
  $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
    $('.comment_modal_bg').remove();
    editComment = $('.detailmame_postarea_item.edit_active');
    editComment.removeClass('edit_active');
    editComment.find('>.detailmame_postarea_item_inner').show();
    editComment.find('>.detailmame_postarea_item_editform').hide();
  });

  /* 編集フォーム 開く */
  editLink.on('click', function(){
    $('body').append('<div class="comment_modal_bg">');
    $('.tool_box').hide();
    editComment = $(this).closest('.detailmame_postarea_item');
    // editText = editComment.find('>.comment_inner >.text span').text();
    // editText = editText.replace(/\s+/g, '');

    editComment.addClass('edit_active');
    editComment.find('>.detailmame_postarea_item_inner').hide();
    editComment.find('>.detailmame_postarea_item_editform').show();
    editComment.find('>.detailmame_postarea_item_editform').focus().text(editText);
  });
}


// =====================================
//         編集履歴を報告
// =====================================
function sendReportEdit(){
  $('.js_reportedit_form').on('submit', function(e){
    e.preventDefault();
    var reportValue = $(this).find('input:checked').val();
    var editid = $(this).find('input[type="submit"]').data('editid');

    $.ajax({
      // type: 'PATCH',
      type: 'GET',
      url: '/app/assets/javascripts/sample_send_report.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_send_report_error.json',

      dataType: 'json',
      data: { value: reportValue, editid: editid },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        $('.tool_box').hide();
        $('.js_reportedit_form :checked').prop("checked", false);
        if(data.result === 'success'){
          showFlash('success', '送信が完了しました。');
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}


// =====================================
//         豆知識いいねボタン
// =====================================
function mameGooodBtnCount(){
  var mameGoodBtn = $('.js_good_mame');
  var mameid = mameGoodBtn.data('mameid');

  mameGoodBtn.on('click', function(){
    var targetBtn = $(this);
    $.ajax({
      // type: 'POST',
      type: 'GET',
      url: '/app/assets/javascripts/sample_goodbtn_count.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_goodbtn_error.json',

      dataType: 'json',
      data: { mameid: mameid },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        if(data.result === 'success'){
          targetBtn.find('span').text(data.likn_num);
          if(targetBtn.hasClass('on')){
            targetBtn.removeClass('on');
          } else {
            targetBtn.addClass('on');
          }
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}



// =====================================
//         会員登録誘導モーダル
// =====================================
function modalAdmininduction() {
  var eventTrigger = $('.js_admininduction_trigger');
  var admininductionModal = $('.js_admininduction_modal');
  $(eventTrigger).click(function(e){
    var text = $(this).attr('data-admininduction');
    $('.js_admininduction_text').text(text);
    var modalWidth = $(admininductionModal).outerWidth();
    var modalHeight = $(admininductionModal).outerHeight();
    var targetOffset = $(this).offset();
    var targetX = targetOffset.left;
    var targetY = targetOffset.top;
    var targetWidth = $(this).outerWidth();
    var targetHeight = $(this).outerHeight();
    var adjustWidth = modalWidth - targetWidth;

    var addLeft = targetX - adjustWidth;
    var addTop = targetY + targetHeight + 15;
    if($(admininductionModal).hasClass('on')) {
      admininductionModal.hide().removeClass('on')
    } else {
      $(admininductionModal).show().css({"position":"absolute","left":addLeft,"top":addTop}).addClass('on');
    }
  });
}



// =====================================
//         詳細ページ　タグフォロー実装
// =====================================
function detailTagFollow() {
  var trigger = $('.js_officialtag_follow');
  $(trigger).click(function(){
    var target = $(this);
    var tagId = $(target).attr('data-offisialtagid');
    var pageName = $(target).attr('data-pagename');
    var follownowText = 'この' + pageName + 'をフォロー中';
    var followingText = 'この' + pageName + 'をフォローする';
    $.ajax('/app/assets/javascripts/sample_detailtag_follow.json', {
      type: 'GET',
      dataType: 'json',
      data: {
        'tagId': tagId
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        var result = data.result;
        var follow = data.follow;
        if(result === 'error') {
          showFlash('error', 'エラーが発生しました。');
        } else {
          if(follow === false) {
            $(target).removeClass('active').find('.js_officialtag_follow_text').text(followingText);
            $(target).find('i').show();

          } else if(follow === true) {
            $(target).addClass('active').find('.js_officialtag_follow_text').text(follownowText);
            $(target).find('i').hide();
          }
        }
      }
    });
  });
}


// =====================================
//         詳細ページ　タグフォロー実装
// =====================================
function detailTagInert() {
  targetForm = $('.js_modal_official_post');
  var eventTrigger = $('.js_officialtag_modal_trigger');
  $(eventTrigger).on('click', function(){
    targetForm.find("select option").attr("selected", false);
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_officialtag_modal.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        targetForm = $('.js_modal_official_post');
        if($(targetForm).hasClass('done')) {
          $(targetForm).find('.selected_tag_list span').remove();
        }
        if(data.result === 'success'){
          $.each(data.registration, function() {
            var type = 'official';
            if (this['official'] === false) {
              type = 'private';
            }
            var value = this['name'];
            $(targetForm).find('.selected_tag_list').append('<span class="tag '+type+'"><span class="label">'+value+'</span><span class="tag_delete" >×</span><input type="hidden" value="'+value+'" name="tags[innertags][]"></span>');
          });
          targetForm.addClass('done');
          $(targetForm).find('.selected_tag_list .tag').click(function(){
            $(this).remove();
          });
        } else if(data.result === 'error' && data.message) {
          targetForm.hide();
          $('.js_originalmodal_closeitem').hide();
          showFlash('error', data.message);
        }
      }
    });
  });
}


// =====================================
//         詳細ページ 概要変更
// =====================================
function overviewEdit() {
  var trigger = $('.js_overviewedit');
  var targetStatic = $('.main_block_aboutdetail');
  var targetForm = $('.main_block_aboutdetail_edit');
  var targetFormTextarea = $('.main_block_aboutdetail_edit .js_overviewedit_textarea');

  $(trigger).click(function(){
    $('body').append('<div class="comment_modal_bg">');
    var datailid = $(this).attr('data-detailid');
    var countTargetName = $(this).attr('data-counttarget');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_overview_edit.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          var summary = data.summary;
          $(targetStatic).hide();
          $(targetForm).show();
          $(targetFormTextarea).val(summary);
          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.comment_modal_bg').remove();
            $(targetStatic).show();
            $(targetForm).hide();
          });
          textNumCount(countTargetName,200);
          textNumCount('js_overviewedit_wordarea',20);
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}

function textNumCount(countTaget,limitNum) {
  var countTarget = $('.' + countTaget);
  var controllTarget = $(countTarget).next().find('.js_textcount_controlltarget_num');
  var textNum = $(countTarget).val().length;
  var limitNum = limitNum;
  var textNum = textNum;
  var remainingNum = limitNum - textNum;

  function textNumCountAction() {
    $(controllTarget).text(remainingNum);
    if(textNum > limitNum) {
      $(controllTarget).css('color','#d20000;').closest("form").find('.js_submit').prop('disabled',true).addClass('noactive').removeClass('active');
    } else if(textNum <= limitNum) {
      $(controllTarget).css('color','#3a3a3a').closest("form").find('.js_submit').addClass('active');
    }
  }

  textNumCountAction();
  $(countTarget).keyup(function(){
    textNum = $(countTarget).val().length;
    remainingNum = limitNum - textNum;
    textNumCountAction();
  });
}


// =====================================
//         詳細ページ　基本情報編集js管理
// =====================================
function staionBasicEditControll() {
  $('.js_bacesuggest_insert').focus(function(){
    var focusTargetClass = $(this).attr('class')
    if(focusTargetClass.match('js_bacesuggest_insert_company')) {
      var listClass = 'compnay_class';
      basicSugget('.js_bacesuggest_insert_company','/app/assets/javascripts/sample_detail_basic_suggest_company.json',listClass);
    }
    else if(focusTargetClass.match('js_bacesuggest_insert_traincar')) {
      var listClass = 'traincar_class';
      basicSugget('.js_bacesuggest_insert_traincar','/app/assets/javascripts/sample_detail_basic_suggest_traincar.json',listClass);
    }
    else if(focusTargetClass.match('js_bacesuggest_insert_train')) {
      var listClass = 'train_class';
      basicSugget('.js_bacesuggest_insert_train','/app/assets/javascripts/sample_detail_basic_suggest_train.json',listClass);
    }
    else if(focusTargetClass.match('js_bacesuggest_insert_route')) {
      var listClass = 'route_class';
      basicSugget('.js_bacesuggest_insert_route','/app/assets/javascripts/sample_detail_basic_suggest_route.json',listClass);
    }
    $(this).unbind('focus');//focusイベントが蓄積するためリセット
  });
}


// =====================================
//         詳細ページ(駅) 基本情報変更
// =====================================
function staionBasicEdit() {
  var trigger = $('.js_basicedit_trigger');
  var targetStatic = $('.js_basicedit_target');
  var targetFrom = $('.js_basicedit_targetform');

  $(trigger).click(function(){
    $('body').append('<div class="comment_modal_bg">');
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_basic_station.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $('.js_basicedit_target').hide();
          $('.js_basicedit_targetform').show();
          var year = data.stasion.open_year;
          var month = data.stasion.open_month;
          var day = data.stasion.open_day;
          var address = data.stasion.address;
          var userNum = data.stasion.users_number;
          var siteName = data.stasion.site_name;
          var siteUrl = data.stasion.site_url;

          $(targetFrom).find('.js_year').find('.js_select').val(year);
          $(targetFrom).find('.js_year').find('.js_changeing_select_text').text(year);

          $(targetFrom).find('.js_month').find('.js_select').val(month);
          $(targetFrom).find('.js_month').find('.js_changeing_select_text').text(month);

          $(targetFrom).find('.js_day').find('.js_select').val(day);
          $(targetFrom).find('.js_day').find('.js_changeing_select_text').text(day);

          $(targetFrom).find('.js_address').find('.js_input').val(address);

          $(targetFrom).find('.js_usernum').find('.js_input').val(userNum);

          $(targetFrom).find('.js_siteurl').find('.js_input').val(userNum);
          $(targetFrom).find('.js_siteurl .js_siteurl_name').find('.js_input').val(siteName);
          $(targetFrom).find('.js_siteurl .js_siteurl_url').find('.js_input').val(siteUrl);
          $('.js_stationnum_content').find('.infotable_line_content_column').remove();
          $('.js_busroute_column').find('.infotable_line_content_column').remove();
          $.each(data.stasion.bus_route, function(i,value) {
            var busRoute = this['organization'];
            var routes = this['routes'];
            var insertForm = '<div class="infotable_line_content_column"><div class="infotable_line_content_index"><p class="infotable_line_content_index_text">事業者名</p><p class="infotable_line_content_index_content"><input class="inserttext js_input' + ' js_busroute' + [i] + '" type="text"></p></div><div class="infotable_line_content_index u-mt20"><div class="infotable_line_content_index_text">系統名</div><p class="infotable_line_content_index_content"><textarea class="inserttext textarea js_textarea' + ' js_routes' + [i] + '" name=""></textarea></p></div></div>';
            $('.js_busroute_column').find('.addtext').before(insertForm);
            $('.js_busroute_column').find('.js_busroute' + [i]).val(busRoute);
            $('.js_busroute_column').find('.js_routes' + [i]).val(routes);
          });

          $.each(data.stasion.station_num, function(i,value) {
            var alphabet = this['alphabet'];
            var num = this['num'];
            var insertForm = '<div class="infotable_line_content_column"><div class="form_keyword_inner left u-mr10"><p><span class="js_changeing_select_text">' + alphabet + '</span></p><select class="form_keyword_select js_changeing_select js_select_alphabet js_select' + ' js_select'+[i] + '"><option value=""></option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option><option value="M">M</option><option value="N">N</option><option value="O">O</option><option value="P">P</option><option value="Q">Q</option><option value="R">R</option><option value="S">S</option><option value="T">T</option><option value="U">U</option><option value="V">V</option><option value="W">W</option><option value="X">X</option><option value="Y">Y</option><option value="Z">Z</option><option value="SC">SC</option><option value="sh">sh</option><option value="JT">JT</option><option value="JO">JO</option><option value="JK">JK</option><option value="JH">JH</option><option value="JN">JN</option><option value="JI">JI</option><option value="JY">JY</option><option value="JC">JC</option><option value="JB">JB</option><option value="JU">JU</option><option value="JA">JA</option><option value="JJ">JJ</option><option value="JL">JL</option><option value="JE">JE</option><option value="JE">JE</option><option value="JM">JM</option><option value="JS">JS</option><option value="MO">MO</option><option value="m">m</option><option value="KS">KS</option><option value="SL">SL</option><option value="HS">HS</option><option value="SR">SR</option><option value="KK">KK</option><option value="TY">TY</option><option value="MG">MG</option><option value="DT">DT</option><option value="OM">OM</option><option value="IK">IK</option><option value="TM">TM</option><option value="SG">SG</option><option value="KD">KD</option><option value="MM">MM</option><option value="TS">TS</option><option value="TI">TI</option><option value="TN">TN</option><option value="TD">TD</option><option value="TJ">TJ</option><option value="SI">SI</option><option value="SS">SS</option><option value="SY">SY</option><option value="SK">SK</option><option value="ST">ST</option><option value="SW">SW</option><option value="NH">NH</option><option value="TK">TK</option><option value="GN">GN</option><option value="MU">MU</option><option value="MY">MY</option><option value="TT">TT</option><option value="TA">TA</option><option value="KC">KC</option><option value="TB">TB</option><option value="BS">BS</option><option value="TH">TH</option><option value="IY">IY</option><option value="KG">KG</option><option value="HM">HM</option><option value="ST">ST</option><option value="CH">CH</option><option value="NK">NK</option><option value="SB">SB</option><option value="HN">HN</option><option value="PL">PL</option><option value="HK">HK</option><option value="NS">NS</option><option value="HS">HS</option><option value="SY">SY</option><option value="KB">KB</option><option value="KH">KH</option><option value="OT">OT</option><option value="AK">AK</option><option value="GN">GN</option><option value="TK">TK</option><option value="CK">CK</option></select></div><div class="form_keyword_inner right"><p><span class="js_changeing_select_text">' + num +'</span></p><select class="form_keyword_select js_changeing_select js_select js_select_num' + ' js_select'+[i] + '"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option></select></div></div>';
            $('.js_stationnum_content').find('.addtext').before(insertForm);
            $('.js_stationnum_content').find('.js_select_num.js_select' + [i]).val(num);
            $('.js_stationnum_content').find('.js_select_alphabet.js_select' + [i]).val(alphabet);
            formTextAdjust();
          });

          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.js_basicedit_target').show();
            $('.js_basicedit_targetform').hide();
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
  var insertFormEmpty = '<div class="infotable_line_content_column"><div class="form_keyword_inner left u-mr10"><p><span class="js_changeing_select_text"></span></p><select class="form_keyword_select js_changeing_select js_select_alphabet js_select"><option value=""></option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option><option value="M">M</option><option value="N">N</option><option value="O">O</option><option value="P">P</option><option value="Q">Q</option><option value="R">R</option><option value="S">S</option><option value="T">T</option><option value="U">U</option><option value="V">V</option><option value="W">W</option><option value="X">X</option><option value="Y">Y</option><option value="Z">Z</option><option value="SC">SC</option><option value="sh">sh</option><option value="JT">JT</option><option value="JO">JO</option><option value="JK">JK</option><option value="JH">JH</option><option value="JN">JN</option><option value="JI">JI</option><option value="JY">JY</option><option value="JC">JC</option><option value="JB">JB</option><option value="JU">JU</option><option value="JA">JA</option><option value="JJ">JJ</option><option value="JL">JL</option><option value="JE">JE</option><option value="JE">JE</option><option value="JM">JM</option><option value="JS">JS</option><option value="MO">MO</option><option value="m">m</option><option value="KS">KS</option><option value="SL">SL</option><option value="HS">HS</option><option value="SR">SR</option><option value="KK">KK</option><option value="TY">TY</option><option value="MG">MG</option><option value="DT">DT</option><option value="OM">OM</option><option value="IK">IK</option><option value="TM">TM</option><option value="SG">SG</option><option value="KD">KD</option><option value="MM">MM</option><option value="TS">TS</option><option value="TI">TI</option><option value="TN">TN</option><option value="TD">TD</option><option value="TJ">TJ</option><option value="SI">SI</option><option value="SS">SS</option><option value="SY">SY</option><option value="SK">SK</option><option value="ST">ST</option><option value="SW">SW</option><option value="NH">NH</option><option value="TK">TK</option><option value="GN">GN</option><option value="MU">MU</option><option value="MY">MY</option><option value="TT">TT</option><option value="TA">TA</option><option value="KC">KC</option><option value="TB">TB</option><option value="BS">BS</option><option value="TH">TH</option><option value="IY">IY</option><option value="KG">KG</option><option value="HM">HM</option><option value="ST">ST</option><option value="CH">CH</option><option value="NK">NK</option><option value="SB">SB</option><option value="HN">HN</option><option value="PL">PL</option><option value="HK">HK</option><option value="NS">NS</option><option value="HS">HS</option><option value="SY">SY</option><option value="KB">KB</option><option value="KH">KH</option><option value="OT">OT</option><option value="AK">AK</option><option value="GN">GN</option><option value="TK">TK</option><option value="CK">CK</option></select></div><div class="form_keyword_inner right"><p><span class="js_changeing_select_text">1</span></p><select class="form_keyword_select js_changeing_select js_select js_select_num"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option><option value="38">38</option><option value="39">39</option><option value="40">40</option><option value="41">41</option><option value="42">42</option><option value="43">43</option><option value="44">44</option><option value="45">45</option><option value="46">46</option><option value="47">47</option><option value="48">48</option><option value="49">49</option><option value="50">50</option><option value="51">51</option><option value="52">52</option><option value="53">53</option><option value="54">54</option><option value="55">55</option><option value="56">56</option><option value="57">57</option><option value="58">58</option><option value="59">59</option><option value="60">60</option><option value="61">61</option><option value="62">62</option><option value="63">63</option><option value="64">64</option><option value="65">65</option><option value="66">66</option><option value="67">67</option><option value="68">68</option><option value="69">69</option><option value="70">70</option><option value="71">71</option><option value="72">72</option><option value="73">73</option><option value="74">74</option><option value="75">75</option><option value="76">76</option><option value="77">77</option><option value="78">78</option><option value="79">79</option><option value="80">80</option><option value="81">81</option><option value="82">82</option><option value="83">83</option><option value="84">84</option><option value="85">85</option><option value="86">86</option><option value="87">87</option><option value="88">88</option><option value="89">89</option><option value="90">90</option><option value="91">91</option><option value="92">92</option><option value="93">93</option><option value="94">94</option><option value="95">95</option><option value="96">96</option><option value="97">97</option><option value="98">98</option><option value="99">99</option></select></div></div>';
  $('.js_stationnum_form_add').click(function(){
    $('.js_stationnum_content').find('.addtext').before(insertFormEmpty);
    formTextAdjust();
  });

  formTextAdjust();

  var organizationInsertFormEmpty = '<div class="infotable_line_content_column"><div class="infotable_line_content_index"><p class="infotable_line_content_index_text">事業者名</p><p class="infotable_line_content_index_content"><input class="inserttext js_input" type="text"></p></div><div class="infotable_line_content_index u-mt20"><div class="infotable_line_content_index_text">系統名</div><p class="infotable_line_content_index_content"><textarea class="inserttext textarea js_textarea" name=""></textarea></p></div></div>';
  $('.js_busroute_form_add').click(function(){
    $('.js_busroute_column').find('.addtext').before(organizationInsertFormEmpty);
  });


  // 編集の一言が未入力時にdisabled
  $('.js_detailstation_wordrea').keyup(function(){
    textNumCount('js_detailstation_wordrea',20);
  });
}





// =====================================
//         詳細ページ(路線) 基本情報変更
// =====================================
function routeBasicEdit() {
  var trigger = $('.js_basicedit_route_trigger');
  var targetStatic = $('.js_basicedit_route_target');
  var targetFrom = $('.js_basicedit_route_targetform');

  $(trigger).click(function(){
    $('body').append('<div class="comment_modal_bg">');
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_basic_route.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $(targetStatic).hide();
          $(targetFrom).show();

          var company = data.train_line.company[0].name;
          var companyId = data.train_line.company[0].id;
          var companyHidden = companyId + ':' + company;
          var insertCompany = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + companyId + '">' + company + '</span>';
          var electrification = data.train_line.electrification;
          var gauge = data.train_line.gauge;
          var power_system = data.train_line.power_system;
          var site_name = data.train_line.site_name;
          var site_url = data.train_line.site_url;
          var open_year = data.train_line.open_year;
          var region = data.train_line.region;

          $('.js_bacesuggest_item').remove();//リセット

          $('.js_company').find('.basicuggest_inner .js_bacesuggest_insert').before(insertCompany);
          $('.js_company').find('.js_bacesuggest_hidden').val(companyHidden);
          $(targetFrom).find('.js_electric').find('.js_input').val(electrification);
          $(targetFrom).find('.js_gauge').find('.js_input').val(gauge);
          $(targetFrom).find('.js_power').find('.js_input').val(power_system);
          $(targetFrom).find('.js_siteurl_name').find('.js_input').val(site_name);
          $(targetFrom).find('.js_siteurl_url').find('.js_input').val(site_url);
          $(targetFrom).find('.js_region').find('.js_input').val(region);

          $(targetFrom).find('.js_year').find('.js_select').val(open_year);
          $(targetFrom).find('.js_year').find('.js_changeing_select_text').text(open_year);

          var idName = '';
          $.each(data.train_line.carriages, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_traincar').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
            var hiddenId = idName.substr( 0, idName.length-1);
            $('.js_traincar').find('.js_bacesuggest_hidden').val(hiddenId);
          });

          var idName = '';
          $.each(data.train_line.train, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_train').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_train').find('.js_bacesuggest_hidden').val(hiddenId);

          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.js_basicedit_route_target').show();
            $('.js_basicedit_route_targetform').hide();
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });

  formTextAdjust();
  // 編集の一言が未入力時にdisabled
  $('.js_detailstation_wordrea').keyup(function(){
    textNumCount('js_detailstation_wordrea',20);
  });
}


// =====================================
//         詳細ページ(車両) 基本情報変更
// =====================================
function traincarBasicEdit() {
  var trigger = $('.js_basicedit_traincar_trigger');
  var targetStatic = $('.js_basicedit_traincar_target');
  var targetFrom = $('.js_basicedit_traincar_targetform');

  $(trigger).click(function(){
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_basic_traincar.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $('body').append('<div class="comment_modal_bg">');
          $(targetStatic).hide();
          $(targetFrom).show();

          var type = data.carriages.type;
          var electrification = data.carriages.electrification;
          var gauge = data.carriages.gauge;
          var power_system = data.carriages.power_system;
          var site_name = data.carriages.site_name;
          var site_url = data.carriages.site_url;
          var open_year = data.carriages.open_year;
          var maximum_speed = data.carriages.maximum_speed;

          $('.js_bacesuggest_item').remove();//リセット

          $(targetFrom).find('.js_type').find('.js_input').val(type);
          $(targetFrom).find('.js_electric').find('.js_input').val(electrification);
          $(targetFrom).find('.js_gauge').find('.js_input').val(gauge);
          $(targetFrom).find('.js_power').find('.js_input').val(power_system);
          $(targetFrom).find('.js_siteurl_name').find('.js_input').val(site_name);
          $(targetFrom).find('.js_siteurl_url').find('.js_input').val(site_url);
          $(targetFrom).find('.js_maxspeed').find('.js_input').val(maximum_speed);

          $(targetFrom).find('.js_year').find('.js_select').val(open_year);
          $(targetFrom).find('.js_year').find('.js_changeing_select_text').text(open_year);

          var idName = '';
          $.each(data.carriages.commpany, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_company').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_company').find('.js_bacesuggest_hidden').val(hiddenId);

          var idName = '';
          $.each(data.carriages.train, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_train').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_train').find('.js_bacesuggest_hidden').val(hiddenId);

          var idName = '';
          $.each(data.carriages.route, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_route').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_route').find('.js_bacesuggest_hidden').val(hiddenId);


          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.js_basicedit_traincar_target').show();
            $('.js_basicedit_traincar_targetform').hide();
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });

  formTextAdjust();
  // 編集の一言が未入力時にdisabled
  $('.js_detailstation_wordrea').keyup(function(){
    textNumCount('js_detailstation_wordrea',20);
  });
}


// =====================================
//         詳細ページ(列車) 基本情報変更
// =====================================
function trainBasicEdit() {
  var trigger = $('.js_basicedit_train_trigger');
  var targetStatic = $('.js_basicedit_train_target');
  var targetFrom = $('.js_basicedit_train_targetform');

  $(trigger).click(function(){
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_basic_train.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $('body').append('<div class="comment_modal_bg">');
          $(targetStatic).hide();
          $(targetFrom).show();

          var type = data.train.type;
          var site_name = data.train.site_name;
          var site_url = data.train.site_url;

          $('.js_bacesuggest_item').remove();//リセット

          $(targetFrom).find('.js_type').find('.js_input').val(type);
          $(targetFrom).find('.js_siteurl_name').find('.js_input').val(site_name);
          $(targetFrom).find('.js_siteurl_url').find('.js_input').val(site_url);

          var idName = '';
          $.each(data.train.commpany, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_company').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_company').find('.js_bacesuggest_hidden').val(hiddenId);

          var idName = '';
          $.each(data.train.carriage, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_traincar').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_traincar').find('.js_bacesuggest_hidden').val(hiddenId);

          var idName = '';
          $.each(data.train.route, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_route').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_route').find('.js_bacesuggest_hidden').val(hiddenId);


          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.js_basicedit_train_target').show();
            $('.js_basicedit_train_targetform').hide();
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });

  formTextAdjust();
  // 編集の一言が未入力時にdisabled
  $('.js_detailstation_wordrea').keyup(function(){
    textNumCount('js_detailstation_wordrea',20);
  });
}


// =====================================
//         詳細ページ(鉄道会社) 基本情報変更
// =====================================
function companyBasicEdit() {
  var trigger = $('.js_basicedit_company_trigger');
  var targetStatic = $('.js_basicedit_company_target');
  var targetFrom = $('.js_basicedit_company_targetform');

  $(trigger).click(function(){
    var datailid = $(this).attr('data-detailid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_detail_basic_company.json',
      dataType: 'json',
      data: {
        'datailid': datailid
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $('body').append('<div class="comment_modal_bg">');
          $(targetStatic).hide();
          $(targetFrom).show();

          var site_name = data.company.site_name;
          var site_url = data.company.site_url;
          var region = data.company.region;
          var address = data.company.address;
          var open_year = data.company.open_year;
          var distance = data.company.distance;

          $('.js_bacesuggest_item').remove();//リセット

          $(targetFrom).find('.js_address').find('.js_input').val(address);
          $(targetFrom).find('.js_region').find('.js_input').val(region);
          $(targetFrom).find('.js_siteurl_name').find('.js_input').val(site_name);
          $(targetFrom).find('.js_siteurl_url').find('.js_input').val(site_url);
          $(targetFrom).find('.js_distance').find('.js_input').val(distance);
          $(targetFrom).find('.js_year').find('.js_select').val(open_year);
          $(targetFrom).find('.js_year').find('.js_changeing_select_text').text(open_year);

          var idName = '';
          $.each(data.company.carriage, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var insert = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + id + '">' + name + '</span>'
            if(i === 0) {
              idName = idName + id + ':' + name + ',';
            }
            else if(i > 0) {
              idName = idName + id + ':' + name + ',';
            }
            $('.js_traincar').find('.basicuggest_inner .js_bacesuggest_insert').before(insert);
          });
          var hiddenId = idName.substr( 0, idName.length-1);
          $('.js_traincar').find('.js_bacesuggest_hidden').val(hiddenId);


          $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
            $('.js_basicedit_company_target').show();
            $('.js_basicedit_company_targetform').hide();
          });
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });

  formTextAdjust();
  // 編集の一言が未入力時にdisabled
  $('.js_detailstation_wordrea').keyup(function(){
    textNumCount('js_detailstation_wordrea',20);
  });
}


//詳細ページのサジェストをコントロール
function basicSugget(trigger,url,listClass) {
  // var trigger = trigger;
  // var url = url;

  $(trigger).keydown(function(e){//keydouwnが複数回呼ばれてしまう
    var value = $(this).val();
    // trigger = $(this);//不要?
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      data: {
        'inputKey': value
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data) {
        if(data.result === 'success'){
          $('.basic_suggest_list_item').remove();//リセット
          $.each(data.sujest, function(i,value) {
            var id = this['id'];
            var name = this['name'];
            var html = '<li class="basic_suggest_list_item ' + listClass + '" data-baseid="' + id + '">' + name + '</li>';
            $('.js_basic_suggest_list').append(html);
          });

          //サジェストリストの表示位置調整
          var suggestWidth = $('.js_basic_suggest_list').outerWidth();
          var targetOffset = $(trigger).offset();
          var targetX = targetOffset.left;
          var targetY = targetOffset.top;
          var targetWidth = $(trigger).outerWidth();
          var targetHeight = $(trigger).outerHeight();
          var adjustWidth = suggestWidth - targetWidth;
          var addLeft = targetX;
          var addTop = targetY + 30;
          $('.js_basic_suggest_list').css({"left":addLeft,"top":addTop}).addClass('on');
        }
        else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });

    if(value === '') {
      if((e.which && e.which === 8) || (e.keyCode && e.keyCode === 8)){
        var classCheck = $(this).attr('class');
        if(classCheck.match('js_bacesuggest_insert_noclear')) {
          return false;
        }
        $(this).closest('.js_bacesuggest').find('.js_bacesuggest_item:last').remove();
      }
    }
  });

  $(trigger).focusout(function(){
    setTimeout(function(){
      $('.js_basic_suggest_list').removeClass('on');
      $('.basic_suggest_list_item').remove();
    },200);
    $(trigger).val('');

    // hiddenに渡すvalueを生成
    var idName = '';
    $(this).closest('.js_bacesuggest').find('.js_bacesuggest_item').each(function(i,value){
        var hiddenName = $(this).text();
        var hiddenid = $(this).attr('data-baseid');
        if(i === 0) {
          idName = idName + hiddenid + ':' + hiddenName + ',';
        }
        else if(i > 0) {
          idName = idName + hiddenid + ':' + hiddenName + ',';
        }
    });
    var hiddenId = idName.substr( 0, idName.length-1);
    $(this).closest('.js_bacesuggest').find('.js_bacesuggest_hidden').val(hiddenId);
  });

  $(document).on("click", '.' + listClass, function(){
    //要素を置き換える箇所のみ適用
    var classCheck = $(trigger).attr('class');
    if(classCheck.match('js_bacesuggest_insert_noclear')) {
      $(trigger).closest('.js_bacesuggest').find('.js_bacesuggest_item').remove();
    }

    var suggestlistName = $(this).text();
    var suggestlistId = $(this).attr('data-baseid');
    var html = '<span class="basicuggest_inner_item js_bacesuggest_item" data-baseid="' + suggestlistId + '">' + suggestlistName + '</span>';

     $(trigger).closest('.js_bacesuggest').find('.js_bacesuggest_insert').before(html);

    $('.basic_suggest_list_item').remove();
    $(trigger).val('');

    // hiddenに渡すvalueを生成
    var idName = '';
    $(trigger).closest('.js_bacesuggest').find('.js_bacesuggest_item').each(function(i,value){
        var name = $(this).text();
        var id = $(this).attr('data-baseid');
        if(i === 0) {
          idName = idName + id + ':' + name + ',';
        }
        else if(i > 0) {
          idName = idName + id + ':' + name + ',';
        }
    });
    var hiddenId = idName.substr( 0, idName.length-1);
    $(trigger).closest('.js_bacesuggest').find('.js_bacesuggest_hidden').val(hiddenId);
  });
}

// =====================================
//       カラーピッカー
// =====================================
function colorPicker() {
  var trigger = $('.js_colorpicker');
  var pickerModal = $('.js_colorpicker_modal');
  var colorList = ['FFFF00','FFCC00','FF9900','FF6600','FF3300','FF0000','FF6666','FF3366','FF0066','FF66CC','FF33CC','FF00CC','9966CC','9933CC','9900CC','6666CC','6633CC','6600CC','3366CC','3333CC','3300CC','33FF00','33CC00','339900','996600','993300','990000','CC6600','CC3300','CC0000','CC6666','CC3366','CC0066','996666','993366','990066','666666','663366','660066','006666','003366','000066','336600','333300','330000','666600','663300','660000'];
  var colorChangeTarget = $('.js_colorchange_target');
  var colorChangeTargetFont = $('.js_colorchange_target_font');


  $(trigger).click(function(){
    var detailId = $(this).attr('data-detailid');
    var modalWidth = $(pickerModal).outerWidth();
    var modalHeight = $(pickerModal).outerHeight();
    var targetOffset = $(this).offset();
    var targetX = targetOffset.left;
    var targetY = targetOffset.top;
    var targetWidth = $(this).outerWidth();
    var targetHeight = $(this).outerHeight();
    var adjustWidth = modalWidth - targetWidth;
    var addLeft = targetX - adjustWidth;
    var addTop = targetY + targetHeight + 15;
    if($(pickerModal).hasClass('on')) {
      pickerModal.hide().removeClass('on')
    } else {
      $(pickerModal).show().css({"position":"absolute","left":addLeft,"top":addTop}).addClass('on');
    }

    $('.modal_colorpicker_colorbox_list_item').remove();

    $.each(colorList, function(i,value){
      var colorName = value;
      var colorCode = '#' + value;
      var colorBox = '<li class="modal_colorpicker_colorbox_list_item js_selected_color" data-colorid="' + colorName + '" style="background-color: ' + colorCode + ';"></li>';
      $('.modal_colorpicker_colorbox_list').append(colorBox);
    });

    $(document).on("click", ".js_selected_color", function(){
      $('.js_selected_color').removeClass('sendTarget');
      var selectedColorName = $(this).attr('data-colorid');
      var selectedColorCode = '#' + selectedColorName;
      colorChangeTarget.css('background',selectedColorCode)
      colorChangeTargetFont.css('color',selectedColorCode)
      $(this).addClass('sendTarget');
      $('.js_colorpicker_sendbtn').removeClass('noactive').prop('disabled',false);
    });

    $(document).on("click", ".js_colorpicker_sendbtn", function(){
      var sendColor = $(this).closest('.js_colorpicker_modal').find('.sendTarget').attr('data-colorid');
      $.ajax({
        // type: 'PATCH',
        type: 'GET',
        url: '/app/assets/javascripts/sample_colorpicker.json',
        dataType: 'json',
        data: {
          'color': sendColor,
          'datailid': detailId
        },
        error: function(jqXHR, textStatus, errorThrown) {
          showFlash('error', 'エラーが発生しました。');
        },
        success: function(data) {
          if(data.result === 'success'){
            location.reload();
          } else if(data.result === 'error' && data.message) {
            showFlash('error', data.message);
          }
        }
      });
    });
  });
}



// =====================================
//       フラッシュメッセージ表示
// =====================================
var showFlash = function(status, message){
  $('.notice').remove();
  var notice = $('<div class="notice">');
  notice.addClass(status);
  notice.html('<p>'+message+'</p>');
  if(status === 'error'){
    notice.find('p').prepend('<i class="s s-caution s-0_9x">');
  }
  $('body>.wrapper').append(notice);
  notice.css({
    'opacity' : 0,
    'top' : -30
  }).animate({
    'opacity' : 1,
    'top' : 0
  }, 500, 'easeOutExpo');
  setTimeout(function(){
    notice.fadeOut(2000);
  },2000);
  $('html,body').stop().animate({scrollTop: 0}, 300, 'easeOutExpo', function(){

  });
};
window.showFlash = showFlash;


// =====================================
//   フラッシュメッセージ表示(ページ遷移後)
// =====================================
function flashErrorReloaded() {
  var target = $('.js_flash_error_reloaded');
  if(target.length != 1) {
    return false;
  } else {
    setTimeout(function(){
      target.fadeOut(2000);
    },2000);
  }
}


// =====================================
//   乗りものスコア/ユーザースコアのゲージ操作
// =====================================
function scoreParcentAdjust() {
  var targetNum = $('.js_scoreparcent');
  var targetAdjust = $('.js_scoreparcent_adjust');
  var parcent = targetNum.text();
  targetAdjust.css('width', parcent);
}


// =====================================
//       FAQ開閉
// =====================================
function faqToggle(){
  var qaContainer;
  var qaTarget = $('.qa_block .question');
  qaTarget.on('click', function(){
    qaContainer = $(this).parent();

    if( qaContainer.hasClass('open') ){
      qaContainer.removeClass('open');
      qaContainer.find('.answer').slideUp(100);
    } else {
      qaContainer.addClass('open');
      qaContainer.find('.answer').slideDown(100);
    }
  });
}



// =====================================
//       設定ページ セレクト 文字のセット
// =====================================
function selectSet(){
  $('.form_parts_select').on('change', function(){
    var selectText = $(this).find('[value="'+$(this).val()+'"]').text();
    $(this).parent().find('.form_parts_inner span').text(selectText);
  });
}

// =====================================
//   設定ページ アカウントIDボタンのアクティブ化
// =====================================
function userIdBtnActive(){
  $('form .userid_check_input').on('keyup', function(){
    var targetBtn = $(this).parent().find('.userid_check');
    if(!targetBtn.hasClass('disabled') && $(this).val() === ''){
      // console.log('on');
      targetBtn.addClass('disabled');
    } else if(targetBtn.hasClass('disabled') && $(this).val() !== ''){
      // console.log('off');
      targetBtn.removeClass('disabled');
    }
  });
}


// =====================================
//       設定ページ アカウントIDのチェック
// =====================================
function userIdCheck(){
  $('form .userid_check').on('click', function(){
    var checkBtn = $(this);
    if(checkBtn.hasClass('disabled')){ return false; }

    var userId = checkBtn.parent().find('input').val();
    $.ajax({
      type: 'GET',
      // type: 'POST',
      url: '/app/assets/javascripts/sample_userid_check.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_userid_check_error.json',

      dataType: 'json',
      data: { userid: userId },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        if(data.result === 'success'){
          $('.userid_url span').text(userId);
          $('.userid_url').show();
          $('.success_message').show();
          checkBtn.parent().find('input').removeClass('error');
          checkBtn.parent().find('.error_message').remove();
        } else if(data.result === 'error' && data.message) {
          if( checkBtn.parent().find('.error').width() > 0 ){ return false; }
          $('.userid_url').hide();
          $('.success_message').hide();
          checkBtn.parent().find('input').addClass('error');
          checkBtn.parent().append('<span class="error_message"><i class="s s-caution s-1_0x"></i>' + data.message + '</span>');
        }
      }
    });

  });
}



// =====================================
//       notifications list
// =====================================
var notifications = {
  'tgtSelector' : '.notifications_list',
  'nextpage' : 0,
  'loadingFlg' : false,
  'loader' : '<div class="loader" id="mypage_timeline_loader"></div>',
  'endFlg' : false,
  'ini' : function(){
    //初期表示時のロード
    if($(notifications.tgtSelector).size()){
      notifications.load(notifications.nextpage);
      $(window).scroll(function(){
        var toriggerPoint = $(notifications.tgtSelector).height()+$(notifications.tgtSelector).offset().top;
        if(toriggerPoint-$(window).height()-$(window).scrollTop() < 100){
          notifications.load(notifications.nextpage);
        }
      });
    }
  },
  'load': function(page){
    //data.nextPageが0だったらそれ以降ajax処理を実行しない
    if(notifications.endFlg){
      return false;
    }
    var getNum = 20;//取得数
    if(notifications.loadingFlg) {
      //2重ロード回避
      return false;
    }
    notifications.loadingFlg = true;
    $(notifications.tgtSelector).append(notifications.loader);

    //1秒後にロード開始
    setTimeout(function(){
      $.ajax('/app/assets/javascripts/sample_notifications.json', {
        type: 'GET',
        dataType: 'json',
        data: {
          'page' : page,
          'getNum':getNum
        },
        error: function(jqXHR, textStatus, errorThrown) {
          showFlash('error', 'エラーが発生しました。');
        },
        success: function(data, textStatus, jqXHR) {
          //data.nextPageが0だったらそれ以降ajax処理を実行しない
          if(data.nextPage == "0"){
            notifications.endFlg = true;
          }

          //flgをfalseに戻す
          notifications.loadingFlg = false;

          //ローダーを削除
          $('#mypage_timeline_loader').remove();

          //URL変更
          if(notifications.nextpage){
            urlControll.push(location.pathname+'?page='+notifications.nextpage);
          }

          //次頁カウントアップ
          notifications.nextpage ++;

          //HTML生成
          if(data.notice.length){
            //1件以上あるかチェック
            var html = '';

            $(data.notice).each(function(){
              html += '<div class="notification_item">'+
                '<a href="'+this['url']+'">'+
                  '<div class="icon">'+
                    '<img alt="" src="'+this['userIcon']+'">'+
                  '</div>'+
                  '<p class="message">'+this['content']+'</p>'+
                  '<p class="time">'+this['time']+'</p>'+
                '</a>'+
              '</div>';
            });

            $(notifications.tgtSelector).append(html);

            //順にclass hideを削除
            $('.posted_image_item.hide').each(function(i){
              $(this).delay(300*i).queue(function(next) {
                  $(this).removeClass('hide');
              });
            });
          }
        }
      });
    },1000);
  }
}


// =====================================
//       informations list
// =====================================
var informations = {
  'tgtSelector' : '.informations_list',
  'nextpage' : 0,
  'loadingFlg' : false,
  'loader' : '<div class="loader" id="mypage_timeline_loader"></div>',
  'endFlg' : false,
  'ini' : function(){
    //初期表示時のロード
    if($(informations.tgtSelector).size()){
      informations.load(informations.nextpage);
      $(window).scroll(function(){
        var toriggerPoint = $(informations.tgtSelector).height()+$(informations.tgtSelector).offset().top;
        if(toriggerPoint-$(window).height()-$(window).scrollTop() < 100){
          informations.load(informations.nextpage);
        }
      });
    }
  },
  'load': function(page){
    //data.nextPageが0だったらそれ以降ajax処理を実行しない
    if(informations.endFlg){
      return false;
    }
    var getNum = 20;//取得数
    if(informations.loadingFlg) {
      //2重ロード回避
      return false;
    }
    informations.loadingFlg = true;
    $(informations.tgtSelector).append(informations.loader);

    //1秒後にロード開始
    setTimeout(function(){
      $.ajax('/app/assets/javascripts/sample_informations.json', {
        type: 'GET',
        dataType: 'json',
        data: {
          'page' : page,
          'getNum':getNum
        },
        error: function(jqXHR, textStatus, errorThrown) {
          showFlash('error', 'エラーが発生しました。');
        },
        success: function(data, textStatus, jqXHR) {
          //data.nextPageが0だったらそれ以降ajax処理を実行しない
          if(data.nextPage == "0"){
            informations.endFlg = true;
          }

          //flgをfalseに戻す
          informations.loadingFlg = false;

          //ローダーを削除
          $('#mypage_timeline_loader').remove();

          //URL変更
          if(informations.nextpage){
            urlControll.push(location.pathname+'?page='+informations.nextpage);
          }

          //次頁カウントアップ
          informations.nextpage ++;

          //HTML生成
          if(data.notice.length){
            //1件以上あるかチェック
            var html = '';

            $(data.notice).each(function(){
              html += '<div class="information_item">'+
                '<a href="'+this['url']+'">'+
                  '<div class="icon">'+
                    '<img alt="" src="'+this['userIcon']+'">'+
                  '</div>'+
                  '<p class="message">'+this['content']+'</p>'+
                  '<p class="time">'+this['time']+'</p>'+
                '</a>'+
              '</div>';
            });

            $(informations.tgtSelector).append(html);

            //順にclass hideを削除
            $('.posted_image_item.hide').each(function(i){
              $(this).delay(300*i).queue(function(next) {
                  $(this).removeClass('hide');
              });
            });
          }
        }
      });
    },1000);
  }
}




// ユーザーフォロー機能
// =============================================================================
// 初期化
// =============================================================================
var ajaxFollowBotton = function($target){
  var self     = this;
  this.$target = $target;
  this.ajaxOps = this.ajaxTestOps ? this.ajaxTestOps : this.ajaxOps;
  $target.on('click',function(e){ self.toggle(e) });
};
// =============================================================================
// 設定
// =============================================================================
ajaxFollowBotton.idName    = 'userid';
// テスト用のajaxパラメータ 本番は削除してください
ajaxFollowBotton.ajaxTestOps = {
  'url'      : '/app/assets/javascripts/user_follow.json',
  'dataType' : 'json',
  'type'     : 'GET',
  'dataType' : 'json'
};
ajaxFollowBotton.ajaxOps = {
  'url'  : '',
  'type' : 'POST',
};
// =============================================================================
// フォロー/アンフォロートグル
// =============================================================================
ajaxFollowBotton.toggle = function(e){
  e.preventDefault();
  var idName = this.idName,
      id     = null,
      def    = null,
      param  = null;
  $btn = $(e.currentTarget);

  // 処理中にボタンが押された場合処理を中断
  if($btn.hasClass('fire')) return;

  // 処理中はクラス属性fireを付ける
  $btn.addClass('fire');

  // ユーザーID関係の処理 ------------------------------------------------------
  if($btn.data(idName)) id = $btn.data(idName);
  // 自身に定義されていなければ親を辿っていく <- 不要であれば削除してください。
  if(id === null){
    $temp = $this.parents('[data-'+idName+']');
    id    = $temp.length > 0 ? $($temp[0]).data(idName) : id;
  }
  // ユーザーIDが見つからなければ終了
  if(id === null) return;

  // 追加するパラメータ
  param = $.extend({
      data : {
        'userid' : id
      }
  },this.ajaxOps);

  def = $.ajax(param);
  def.then((function(_$btn,self){
    return function(data){
      self.ajaxResultHandler(data,_$btn);
    }
  })($btn,this),(function(_$btn,self){
    return function(data){
      self.ajaxResultHandler(data,_$btn);
    }
  })($btn,this));
};
// =============================================================================
// ajax後の処理
// =============================================================================
ajaxFollowBotton.ajaxResultHandler = function(data,$btn){
  if(data.result && data.result == 'success'){ // 成功時の処理
    if(data.follow) $btn.addClass('followed');
    if(!data.follow) $btn.removeClass('followed');
  }else{ // 失敗時の処理
    if(showFlash){
      showFlash('error','エラーが発生しました。');
    }else{
      showFlash('error','エラーが発生しました。');
    }
  }
  $btn.removeClass('fire');
}

$(function(){
  ajaxFollowBotton.call(ajaxFollowBotton,$('.follow_button'));
});












// =====================================
//       モーダル制御
// =====================================
function modalControl(){
  var modalBtn = $('.modal_btn');
  modalBtn.on('click', function(){
    if($(this).hasClass('js_modal_post_delete')) {
      var modalContentDataId = $(this).data('postid');
    }
    else if($(this).hasClass('js_modal_mame_delete')) {
      var modalContentDataId = $(this).data('mameid');
    }
    modalOpen($(this),modalContentDataId);
  });
}

/* モーダル 開く */
function modalOpen(_this,modalContentDataId){
  var modalWrapper = $('#modal_container');
  var modalInner = modalWrapper.find('.modal_inner');
  var modalHeight;
  var modalFadeTime = 300;
  var modalContentId = _this.data('modal');
  modalContent = $("#"+modalContentId);
  if( modalContent.length === 0 ){
    return false;
  }
  //複数回実行するとコンテンツが２重になるため、リセット処理追加
  modalInner.find('.insert_content_for_modal').remove();
  modalInner.append(modalContent.addClass('insert_content_for_modal'));

  modalWrapper.css({
    'display' : 'block',
    'opacity' : 0
  }).stop().animate({
    'opacity' : 1
  }, modalFadeTime, 'easeOutExpo', function(){
  });

  modalHeight = modalInner.outerHeight();
  modalInner.css({
    'position' : 'fixed',
    'top' : '50%',
    'margin-top' : -(modalHeight/2)
  });

  modalWrapper.on('click', function(){
    modalClose();
  });
  modalContent.on('click', function(e){
    e.stopPropagation();
  });
  modalInner.find('.modal_close_btn').on('click', function(){
    modalClose();
  });
  modalContent.find('.cancel').on('click', function(){
    modalClose();
  });

  $(modalContent).find('.js_contents_delete_hidden').val(modalContentDataId);
}

/* モーダル 閉じる */
function modalClose(){
  var modalWrapper = $('#modal_container');
  modalWrapper.fadeOut(100);
}

// =====================================
//         いいねボタン
// =====================================
function gooodBtnCount(){
  var goodBtn = $('.good_btn');
  var postid = goodBtn.data('postid');

  goodBtn.on('click', function(){
    $.ajax({
      type: 'GET',
      // type: 'POST',
      url: '/app/assets/javascripts/sample_goodbtn_count.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_goodbtn_error.json',

      dataType: 'json',
      data: { postid: postid },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        if(data.result === 'success'){
          goodBtn.find('span').text(data.likn_num);
          if(goodBtn.hasClass('on')){
            goodBtn.removeClass('on');
          } else {
            goodBtn.addClass('on');
          }
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}

// =====================================
//         コメント いいねボタン
// =====================================
function commentGooodBtnCount(){
  var commentGoodBtn = $('.good_link');
  var commentid = commentGoodBtn.data('commentid');

  commentGoodBtn.on('click', function(){
    var targetBtn = $(this);
    $.ajax({
      // type: 'POST',
      type: 'GET',
      url: '/app/assets/javascripts/sample_commentgoodbtn_count.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_goodbtn_error.json',

      dataType: 'json',
      data: { commentid: commentid },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        if(data.result === 'success'){
          targetBtn.find('.good_link_num').text(data.likn_num);
          if(targetBtn.hasClass('on')){
            targetBtn.removeClass('on');
            targetBtn.find('.good_link_text').text('いいね');
          } else {
            targetBtn.addClass('on');
            targetBtn.find('.good_link_text').text('いいねを取り消す');
          }
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}

// =====================================
//         ツールボックス表示
// =====================================
function toolBoxToggle(){
  $('.tool_box_link').on('click', function(){
    if(!$(this).hasClass('on')){
      $(this).closest('.tool_box_container').find('.tool_box').fadeIn(100);
      $(this).addClass('on');
    } else {
      $(this).closest('.tool_box_container').find('.tool_box').fadeOut(100);
      $(this).removeClass('on');
    }
  });
}

// =====================================
//         写真縦横 100%調整
// =====================================
function postImageAdjust(){
  var galleryContainer = $('.photo_gallery');
  var mainImages = galleryContainer.find('.image_list li');
  var thumbImages = galleryContainer.find('.thumb_list li');

  setTimeout(function(){
    var firstImage = mainImages.first().find('img');
    if( firstImage.width() < firstImage.height() ){
      mainImages.first().addClass('img-vertical');
    } else {
      mainImages.first().addClass('img-horizontal');
    }

    thumbImages.each(function(){
      var _thisThumb = $(this);
      var verticalImageNo = thumbImages.index(_thisThumb);
      if( _thisThumb.find('img').width() < _thisThumb.find('img').height() ){
        _thisThumb.addClass('img-vertical');
        mainImages.eq(verticalImageNo).addClass('img-vertical');
      } else {
        _thisThumb.addClass('img-horizontal');
        mainImages.eq(verticalImageNo).addClass('img-horizontal');
      }
    });
  }, 200);
}

// =====================================
//         写真切り替え
// =====================================
function postImageChange(){
  var galleryContainer = $('.photo_gallery');
  var mainImages = galleryContainer.find('.image_list li');
  var thumbImages = galleryContainer.find('.thumb_list li');
  var galleryCurrentNo = 0;

  //初回処理
  mainImages.removeClass('active');
  thumbImages.removeClass('active');
  mainImages.first().addClass('active');
  thumbImages.first().addClass('active');

  thumbImages.on('click', function(){
    mainImages.removeClass('active');
    thumbImages.removeClass('active');
    galleryCurrentNo = thumbImages.index($(this));
    $(this).addClass('active');
    mainImages.eq(galleryCurrentNo).addClass('active');
  });
}

// =====================================
//         内容を報告
// =====================================
function sendReport(){
  $('.report_form').on('submit', function(e){
    e.preventDefault();
    var reportValue = $(this).find('input:checked').val();
    var postid = $(this).find('input[type="submit"]').data('postid');

    $.ajax({
      // type: 'PATCH',
      type: 'GET',
      url: '/app/assets/javascripts/sample_send_report.json',

      //エラーのサンプル
      // url: '/app/assets/javascripts/sample_send_report_error.json',

      dataType: 'json',
      data: { value: reportValue, postid: postid },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        $('.tool_box').hide();
        $('.report_form :checked').prop("checked", false);
        if(data.result === 'success'){
          showFlash('success', '送信が完了しました。');
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}


// =====================================
//         コメント 表示
// =====================================
function showComment(){
  // 親コメント: 初回1件 表示、moreリンク追加
  var commentLimit = 3;
  var comentList = $('.comment_list');
  var commentCount = comentList.find('>.comment').length;
  if(commentCount > commentLimit){
    var moreHtml = '<div class="comment_more">';
    moreHtml += '<a href="javascript:void(0)">その他のコメントをみる <span>';
    moreHtml += commentCount - commentLimit;
    moreHtml += '件</span></a>';
    comentList.append(moreHtml);

    comentList.find('>.comment').hide();

    for(var i=0; i<commentLimit; i++){
      comentList.find('>.comment').eq(i).show();
    }
  }

  // 子コメント: 初回1件 表示、moreリンク追加
  $('.comment_list > .comment').each(function(){
    var replyLimit = 1;
    var parentComment = $(this);
    var replyList = parentComment.find('.reply_list');
    var replyCount = replyList.find('.comment').length;

    if(replyCount > replyLimit){
      var repMoreHtml = '<div class="comment_more">';
      repMoreHtml += '<i class="s s-reply s-1_1x"></i>';
      repMoreHtml += '<a href="javascript:void(0)">その他の返信をみる <span>';
      repMoreHtml += replyCount - replyLimit;
      repMoreHtml += '件</span></a>';
      replyList.append(repMoreHtml);

      replyList.find('.comment').hide();
      replyList.find('.comment').first().show();
    }
  });

  // コメント全展開
  $('.comment_list').on('click', '.comment_more a', function(){
    $(this).parent().parent().find('>.comment').show();
    $(this).parent().remove();
  });
}

// =====================================
//   コメント 返信欄の表示（ユーザ名の挿入）
// =====================================
function showReplyForm(){
  $('.reply_link').on('click', function(){
    // 返信欄の表示
    var replyCommentId = $(this).attr('data-commentid');
    $('.reply_input.active').removeClass('active');
    var targetComment = $(this).closest('.comment');
    var targetInput = targetComment.find('>.comment_inner >.actions .reply_input');
    targetInput.addClass('active');

    $(this).closest('.comment_inner').find('.js_reply_input_hidden').val(replyCommentId);

    // ユーザ名の挿入
    // if( targetInput.find('a').width() === null ){
    //   var replyUserUrl = targetComment.find('>.user_name a').attr('href');
    //   var replyUserName = targetComment.find('>.user_name .user_name_text').text();
    //   var replyHtml = '<a href="' + replyUserUrl + '">' + replyUserName + '</a>';
    //   targetInput.append(replyHtml);
    //   targetInput.find('input[type="text"]').css('padding-left', targetInput.find('a').width()+15 );
    // }
  });
}

// =====================================
//   コメント 送信ボタンのアクティブ化
// =====================================
function commentBtnActive(){
  $('.post_detail_comment').on('keyup', 'input[type="text"]', function(){
    var targetBtn = $(this).parent().find('input[type="submit"]');
    if(!targetBtn.hasClass('disabled') && $(this).val() !== ''){
      // console.log('on');
      targetBtn.prop('disabled', false);
      targetBtn.addClass('disabled');
    } else if(targetBtn.hasClass('disabled') && $(this).val() === ''){
      // console.log('off');
      targetBtn.attr('disabled', 'diabled');
      targetBtn.removeClass('disabled');
    }
  });
}

// =====================================
//       コメントの編集
// =====================================
function commentEdit(){
  var editLink = $('.comment .edit_link a');
  var editComment, editText;

  /* 編集フォーム 閉じる */
  $('body').on('click', '.comment_modal_bg, .comment_edit_form_cancel', function(){
    $('.comment_modal_bg').remove();
    editComment = $('.comment.edit_active');
    editComment.removeClass('edit_active');
    editComment.find('>.comment_inner').show();
    editComment.find('>.comment_edit_form').hide();
  });

  /* 編集フォーム 開く */
  editLink.on('click', function(){
    var commentId = $(this).data('commentid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_comment_edit.json',
      dataType: 'json',
      data: {
        commentId: commentId
      },
      error: function(jqXHR, textStatus, errorThrown) {
        showFlash('error', 'エラーが発生しました。');
      },
      success: function(data, textStatus, jqXHR) {
        if(data.result === 'success'){
          var content = data.content;
          editComment.find('>.comment_edit_form textarea').focus().text(content);
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
      $('body').append('<div class="comment_modal_bg">');
      $('.tool_box').hide();
      editComment = $(this).closest('.comment');
      editComment.addClass('edit_active');
      editComment.find('>.comment_inner').hide();
      editComment.find('>.comment_edit_form').show();
      editComment.find('>.comment_edit_form textarea').focus().text(editText);
      editComment.find('>.comment_edit_form').find('.js_comment_edit_hidden').val(commentId);
  });
}


// =====================================
//       投稿の編集
// =====================================

function post_edit() {
  targetForm = $('.js_modal_post_edit');
  var eventTrigger = $('.js_trigger_postedit');
  $(eventTrigger).on('click', function(){
    targetForm.find("select option").attr("selected", false);
    var postid = $(this).attr('data-postid');
    $.ajax({
      type: 'GET',
      url: '/app/assets/javascripts/sample_edit_post.json',
      dataType: 'json',
      data: {
          'postid': postid
        },
      error: function(jqXHR, textStatus, errorThrown) {
        $('.js_modal_post_edit, .js_originalmodal_closeitem').hide();
        showFlash('error', 'エラーが発生しました。');

      },
      success: function(data) {
        if(data.result === 'success'){
          var postText = data.post.content;
          var postTarget = data.post.tagstags;
          $('.modal_post_inner_insert_imagebox_item').remove();
          targetForm.find('.tag').remove();

          $.each(data.post.tags, function() {
            var type = 'official';
            if (this['official'] === false) {
              type = 'private';
            }
            var value = this['name'];
            var insertTag = '<span class="tag '+type+'"><span class="label">'+value+'</span><span class="tag_delete" >×</span><input type="hidden" value="'+value+'" name="tags[innertags][]"></span>';
            targetForm.find('.selected_tag_list').append(insertTag);
          });

          if(postTarget === '全体に公開') {
            $(targetForm).find('select').find('option[value=all]').attr("selected", true);
          } else {
            $(targetForm).find('select').find('option[value=follower]').attr("selected", true);
          }
          $(targetForm).find('.js_modal_post_select_text').text(data.post.tagstags);
          $(targetForm).find('.js_modal_post_textarea').text(postText);

          $.each(data.post.postImageList, function(i,value) {
            var imageUrl = value;
            var insertImage = '<div class="modal_post_inner_insert_imagebox_item"><p class="modal_post_inner_insert_imagebox_item_inner"><img alt="" class="modal_post_inner_insert_imagebox_item_inner_img" src="' + imageUrl + '"></p><div class="modal_post_inner_insert_imagebox_item_close js_modal_post_image_close"><i class="s s-close s-1 s-1_1x originalmodal_close on modal_post_inner_insert_imagebox_item_close_icon"></i></div></div>'
            $(targetForm).find('.modal_post_inner_insert_imagebox').show().append(insertImage);
          });
          $('.js_modal_postedit_hidden').val(postid);
        } else if(data.result === 'error' && data.message) {
          showFlash('error', data.message);
        }
      }
    });
  });
}



//タグフォロー機能
// =============================================================================
// 初期化
// =============================================================================
var ajaxTagFollowBotton = function($target){
  var self     = this;
  this.$target = $target;
  this.ajaxOps = this.ajaxTestOps ? this.ajaxTestOps : this.ajaxOps;
  $target.on('click',function(e){ self.toggle(e) });
};
// =============================================================================
// 設定
// =============================================================================
ajaxTagFollowBotton.adminInductionClassName = 'js_admininduction_trigger';
ajaxTagFollowBotton.tagName                 = 'tag_id';
ajaxTagFollowBotton.tagKey                  = 'tagId';
// テスト用 <- テスト用パラメータがある場合、本番用パラメータを上書きするようにしているので、本番時は決してください
ajaxTagFollowBotton.ajaxTestOps = {
  'url'      : '/app/assets/javascripts/tag_follow.json',
  'dataType' : 'json',
  'type'     : 'GET',
  'dataType' : 'json'
};
// 本番用
ajaxTagFollowBotton.ajaxOps = {
  'url'  : '',
  'type' : 'POST',
};
// =============================================================================
// タグのフォロー/アンフォロートグル
// =============================================================================
ajaxTagFollowBotton.toggle = function(e){
  e.preventDefault();
  var tagName  = '',
      self     = this,
      id       = null,
      tagName  = null,
      key      = null,
      def      = null,
      addParam = {},
      i        = 0,
      $btn     = $(e.currentTarget);

  // 非会員状態で会員誘導処理を実行する状態であれば処理しない
  if($btn.hasClass(this.adminInductionClassName)) return;

  // 処理中にボタンが押された場合処理を中断
  if($btn.hasClass('fire')) return;

  // 処理中はクラス属性fireを付ける
  $btn.addClass('fire');

  // タグID関係の処理 ----------------------------------------------------------
  tagName = this.tagName;
  key     = this.tagKey;
  id      = $btn.data(tagName);
  // 自身に定義されていなければ親を辿っていく <- 不要であれば削除してください。
  if(!id){
    $temp = $this.parents('[data-'+tagName+']');
    id    = $temp.length > 0 ? $($temp[0]).data(tagName) : id;
  }
  // ユーザーIDが見つからなければ終了
  if(id === null) return;

  // 追加するパラメータ
  addParam.data      = {};
  addParam.data[key] = id;
  param              = $.extend(addParam,this.ajaxOps);

  def = $.ajax(param);
  def.then((function(_$btn,self){
   return function(data){
     self.ajaxResultHandler(data,_$btn);
   }
  })($btn,this),(function(_$btn,self){
   return function(data){
     self.ajaxResultHandler(data,_$btn);
   }
  })($btn,this));
};
// =============================================================================
// ajax後の処理
// =============================================================================
ajaxTagFollowBotton.ajaxResultHandler = function(data,$btn){
  if(data.result && data.result == 'success'){ // 成功時の処理
   if(data.follow) $btn.addClass('followed');
   if(!data.follow) $btn.removeClass('followed');
  }else{ // 失敗時の処理
   showFlash('error','エラーが発生しました。');
  }
  $btn.removeClass('fire');
}

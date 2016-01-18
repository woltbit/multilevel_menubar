/**
 * index.js
 * http://www.woltbit.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, woltbit
 * http://www.woltbit.com
 */
(function($){
    var $menubar = $('#menubar'),
        $menu_li = $('#menu_ul > li');

    $menubar.click(function(){
        var $mainContainer = $('#main_container'),
            $pageWrapper = $('#page-wrapper'),
            $windows = $(window).width(),
            $menu_ul = $('#menu_ul li').children('ul'),
            $arr = [$mainContainer, $pageWrapper];

        if ($menu_ul.hasClass('toggled')) {
            $menu_ul.animate({right:"-100%"}, 100, "linear").removeClass('toggled');
        }

        $.each($arr, function( index, value){
            if (value.hasClass('toggled')) {
                value.animate({marginRight:"0%"}, 100, "linear").removeClass('toggled');
            } else {
                if($windows < 760) {
                    value.animate({marginRight:"40%"}, 100, "linear").addClass('toggled');
                } else {
                    value.animate({marginRight:"20%"}, 100, "linear").addClass('toggled');
                }
            }
        });
    });

    $menu_li.each(function(){
        if($(this).children('ul').length > 0) {
            var _target = $(this).children('a'); //menu_ul > li a
            if (!_target.hasClass('toggled')) {
                _target.addClass('toggled').append('<i class="fa fa-angle-right"></i>');
            }
        }
    }).click(function(e){
        e.stopPropagation();
        var $Ntarget = $(e.target);
        if(!$Ntarget.is('li') && $Ntarget.parents('li').length > 0) {
            $Ntarget = $Ntarget.parents('li:first');
        }

        if(!$Ntarget.is('#menu_ul > li')) {
            return;
        }

        var $next = $(this).children('ul'); //menu_ul > li ul
        if($next.find('#bttop').length > 0) {
            $next.addClass('toggled').animate({right:"0%", top:"0%"}, 100, "linear").children('li').css({display:"block"});
        } else {
            $next.prepend('<li id="bttop"><i class="fa fa-angle-left"></i></i>Back To Top</li>').addClass('toggled').animate({right:"0%", top:"0%"}, 100, "linear").children('li').css({display:"block"});
        }

        var $Snext = $next.children('li'); //menu_ul > li ul li
        $Snext.each(function(){
            if ($(this).children('ul').length > 0) {
                if (!$(this).hasClass('toggled')) {
                    $(this).addClass('toggled').append('<i id="fa_right" class="fa fa-angle-right">');
                }
            }

            var $_this = $(this);
            $_this.click(function(e){
                e.stopPropagation();
                var $NNtarget = $(e.target);
                var $_Sthis = $_this.children('ul');
                if($_Sthis.find('#Sbttop').length > 0) {
                    $_Sthis.addClass('toggled').animate({right:"0%", top:"0%"}, 100, "linear").children('li').css({display:"block"});
                } else {
                    $_Sthis.prepend('<li id="Sbttop"><i class="fa fa-angle-left">Back To Top</li>').addClass('toggled').animate({right:"0%", top:"0%"}, 100, "linear").children('li').css({display:"block"});
                }

                $('li[id^="Sbttop"]').each(function(){
                    var $Tthis = $(this);
                    $Tthis.click(function(e){
                        e.stopPropagation();
                        var $Tparent = $Tthis.parent('ul');
                        $Tparent.removeClass('toggled').animate({right:"-100%", top:"0%"}, 100, "linear");
                    });
                });
            })
        });

        $('li[id^="bttop"]').each(function(){
            var $this = $(this);
            $this.click(function(){
                var $parent = $this.parent('ul');
                $parent.removeClass('toggled').animate({right:"-100%", top:"0%"}, 100, "linear");
            });
        });
    })
}(jQuery));
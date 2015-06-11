(function( $ ){
        $.fn.getBackgroundImageSizeCover = function(callback) {
            this.each(function() {
                var wrapper = $(this)
                div_height = wrapper.height();
                div_width = wrapper.width();
                bg_imge_str = wrapper.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                console.log(bg_imge_str);

                if(bg_imge_str == 'none'){
                  image_object = wrapper.find('.bgsc').get(0);
                  if(image_object.complete){
                    go();
                  }
                  return;
                }

                wrapper.css('background-image', 'none');

                image_object = new Image();
                image_object.src = bg_imge_str;
                image_object.className = 'bgsc';
                $(image_object).on('load', go);

                wrapper.append(image_object);

                if(image_object.complete){
                  go();
                }

                function go(event){

                    var ratio1 = image_object.width / image_object.height
                        , ratio2 = div_width / div_height
                        , toH = div_height
                        , toW = div_width
                        , marginLeft = 0
                        , marginTop = 0
                        , targetH = 0
                        , targetW = 0;

                    if(ratio1 < ratio2){
                      targetW = toW;
                      targetH = targetW / ratio1;
                      marginTop = (toH - targetH) / 2;
                    }else{
                      targetH = toH;
                      targetW = targetH * ratio1;
                      marginLeft = (toW - targetW) / 2;
                    }

                    callback(Math.round(targetW), Math.round(targetH), Math.round(marginLeft), Math.round(marginTop), wrapper);
                }
            });
        };
    })( jQuery );

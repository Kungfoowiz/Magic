$(function () {



    var collapsible = function (targetElement, collapseWidth, expandedWidth) {

        var target = $(targetElement);
        var widthCollapsed = collapseWidth;
        var widthExpanded = expandedWidth;

        var collapseMenu = function () {
            target.animate({ width: widthCollapsed }, { queue: false, duration: 500 });
            return true;
        }

        var expandMenu = function () {
            target.animate({ width: widthExpanded }, { queue: false, duration: 500 });
            return true;
        }

        collapseMenu();

        target.on("mouseover", function () {
            expandMenu();
        });

        target.on("mouseout", function () {
            collapseMenu();
        });

        return true;

    }


    var audioCollapsible = new collapsible(".audio-control", "20px", "300px");


});

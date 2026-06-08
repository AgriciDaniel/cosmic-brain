////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// dhtml functions: require IE4 or later
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var POPUP_COLOR = "LightYellow";
var POPUP_REPEAT = "no-repeat";
var POPUP_IMAGE = "";
var IMAGE_OPEN = "%OpenPictureContentsTopic%";
var IMAGE_CLOSE = "%ClosePictureContentsTopic%";
var INDEX_SELECTED = "%OpenPictureNavigatorIndex%";
var INDEX_UNSELECTED = "%ClosePictureNavigatorIndex%";
var CONTENTS_SELECTED = "%OpenPictureNavigatorContents%";
var CONTENTS_UNSELECTED = "%ClosePictureNavigatorContents%";
var ANCHOR = "";
var _d2hInlinePopup = null;

function d2hCreatePopupIFrame(doc)
{
    var nstx = doc.all["nstext"];
    if (nstx == null)
        nstx = doc.body;
    nstx.insertAdjacentHTML("BeforeEnd", "<div id='popupDiv'></div>")
    var div = getElemById(document, "popupDiv");
    if (div == null)
	    return null;
    div.innerHTML = "<iframe id=\"popupFrame\" name=\"d2h_popupFrameWnd\" frameborder=\"no\" height=\"0px\" width=\"0px\" style=\"display:none; position: absolute;\"></iframe>";
    var frm = getElemById(doc, "popupFrame");
    if (typeof div.removeNode != "undefined")
        div.removeNode(false);
    frm.style.margin = "0pt";
    frm.style.padding = "0pt";
    return frm;
} 

function dhtml_popup(url)
{
	ANCHOR = "";
	var pop, main, body, x, y;

	// no url? then hide the popup
	if (url == null || url.length == 0)
	{
		pop = document.all["popupFrame"];
		if (pop != null)
		{
			pop.style.display = "none";
			pop.setAttribute("src", "about:blank");
		}
		return;
	}

	// if the popup frame is already open, close it first
	var popUpShown = dhtml_popup_is_open();
	if (popUpShown)
	{
		// the main window is the parent of the popup frame
		main = window.parent;
		body = main.document.body;
		pop = main.document.all["popupFrame"];

		// add the popup origin to the event coordinates
		x = pop.offsetLeft + window.event.offsetX;
		y = pop.offsetTop + window.event.offsetY;

		// hide the popup frame
		pop.style.display = "none";
	}
	else
	{
		// the main window is the current window
		main = window;
		body = document.body;
		pop = document.all["popupFrame"];

		// use the event coordinates for positioning the popup
		x = window.event.x;
		y = window.event.y;
		// account for the scrolling text region, if present
		var nstx = document.all["nstext"];
		if (nstx != null)
		{
			if (document.body.scroll == "no")
				y += nstx.scrollTop - nstx.offsetTop;
		}
		// get the popup frame, creating it if needed
        if (pop == null)
            pop = d2hCreatePopupIFrame(document);
	}
	if (pop == null)
	{
	    d2hwindow(url, "d2hPopup");
	    return;
	}

	// get frame style
	var sty = pop.style;

	// load url into frame
	var anchorIndex = url.indexOf("#", 0);
	var strUrl;
	if (anchorIndex >= 0)
	{
		ANCHOR = url.substr(anchorIndex + 1);
		//workaround to reset current src
		strUrl = url.substr(0, anchorIndex);
	}
	else
	    strUrl = url;
    if (popUpShown)
        open(strUrl, "d2h_popupFrameWnd");
    else
        pop.setAttribute("src", strUrl);

	// initialize frame size/position
	sty.border    = "1px solid #cccccc";
	sty.posLeft   = x + body.scrollLeft     - 30000;
	sty.posTop    = y + body.scrollTop + 15 - 30000;
	var wid       = body.clientWidth;
	sty.posWidth  = (wid > 500)? wid * 0.6: wid - 20;
	sty.posHeight = 0;

	// wait until the document is loaded to finish positioning
	main.setTimeout("dhtml_popup_position()", 100);
}
	
function dhtml_popup_is_open()
{
	if (window.name != "")
		return window.name != "right";
	else
		return window.location.href != window.parent.location.href;
}

function dhtml_popup_position()
{
	// get frame
	var pop = document.all["popupFrame"];
	var frm = document.frames["popupFrame"];
	var sty = pop.style;

	if (frm.document.readyState != "complete")
	{
		window.setTimeout("dhtml_popup_position()", 100);
		return;
	}

	if (frm.document.body.all.length == 0)
		//if frame is empty, it contains its document, workaround must be applied
		d2h_set_popup_html(frm.document);

	if (ANCHOR != "")
		//for non-splitting mode topics that are not needed must be hidden
		d2h_hide_unused_elements(frm.document);

	// get containing element (scrolling text region or document body)
    var body = document.all["nstext"];
    var poptext = frm.document.all["nstext"];
    var nsbanner = frm.document.all["_d2hTitleNavigator"];
    d2hStandardizePopupMargin(frm.document.body, poptext, nsbanner);
    if (body == null)
        body = document.body;

	// hide navigation/nonscrolling elements, if present
	dhtml_popup_elements(frm.self.document);

	// get content size
	sty.display = "block";
	frm.scrollTo(0,1000);
	sty.posHeight = frm.self.document.body.scrollHeight;

	// make content visible
	sty.posLeft  += 30000;
	sty.posTop   += 30000;

	// adjust x position
	if (sty.posLeft + sty.posWidth + 10 - body.scrollLeft > body.clientWidth)
		sty.posLeft = body.clientWidth  - sty.posWidth - 10 + body.scrollLeft;

	// if the frame fits below the link, we're done
	if (sty.posTop + sty.posHeight - body.scrollTop < body.clientHeight)
		return;

	// calculate how much room we have above and below the link
	var space_above = sty.posTop - body.scrollTop;
	var space_below = body.clientHeight - space_above;
	space_above -= 35;
	space_below -= 20;
	if (space_above < 50) space_above = 50;
	if (space_below < 50) space_below = 50;

	// if the frame fits above or we have a lot more room there, move it up and be done
	if (sty.posHeight < space_above || space_above > 2 * space_below)
	{
		if (sty.posHeight > space_above)
			sty.posHeight = space_above;
		sty.posTop = sty.posTop - sty.posHeight - 30;
		return;
	}

	// adjust frame height to fit below the link
	sty.posHeight = space_below;
}

function dhtml_popup_elements(doc)
{
    d2hShowTopicTitleInPopup(doc);
    d2hHideBreadcrumbs(doc);

	// set popup background style
	doc.body.style.backgroundColor = POPUP_COLOR;
	doc.body.style.backgroundImage = "url('" + d2hGetRelativePath(doc, POPUP_IMAGE) + "')";
	doc.body.style.backgroundRepeat = POPUP_REPEAT;

	// reset background image/color of scrolling text region, if present
	var nstx = doc.all["nstext"];
	if (nstx != null)
	{
		nstx.style.backgroundImage = "none";
		nstx.style.backgroundColor = "transparent";
	}
}

function d2hSetTopicTextRightIndent(elem)
{
    if (_needIndentation)
        elem.style.paddingRight = "20px";
}

function dhtml_nonscrolling_resize()
{
	if (document.body.clientWidth == 0)
		return;

	var oBanner= document.all.item("nsbanner");
	var oText= document.all.item("nstext");

	if (oText == null)
		return;

	var oTitleRow = document.all.item("TitleRow");

	if (oTitleRow != null)
		oTitleRow.style.padding = "4px 10px 4px 22px;";

	if (oBanner != null)
	{
		document.body.scroll = "no"
		oText.style.overflow = "auto";
 		oBanner.style.width = document.body.clientWidth;
		d2hSetTopicTextRightIndent(oText);
		oText.style.width = document.body.clientWidth;
		oText.style.top = 0;  

		if (document.body.offsetHeight > oBanner.offsetHeight + 4)
			oText.style.height = document.body.offsetHeight - oBanner.offsetHeight - 4;
		else
			oText.style.height = 0;
	}	

//	try{nstext.setActive();} //allows scrolling from keyboard as soon as page is loaded. Only works in IE 5.5 and above.
//	catch(e){}

	d2hRegisterEventHandler(window, document.body, "onresize", "d2hnsresize();");
	d2hRegisterEventHandler(window, document.body, "onbeforeprint", "d2h_before_print();");
	d2hRegisterEventHandler(window, document.body, "onafterprint", "d2h_after_print();");
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// d2h functions: browser-independent
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function d2hie()
{
	var ie = navigator.userAgent.toLowerCase().indexOf("msie");
	return ie != -1 && parseInt(navigator.appVersion) >= 4;
}

function d2hpopup(url)
{
    if (_d2hInlinePopup != null)
    {
        var elem = (window.event.srcElement) ? window.event.srcElement : null;
        if (elem == null || !d2hElementInContainer(elem, _d2hInlinePopup))
        {
            d2hHideInline(_d2hInlinePopup);
            _d2hInlinePopup = null;
        }
    }

	// use dhtml if we can
	if (d2hie())
	{
		dhtml_popup(url);
		return false;
	}

	// use regular popups
	if (url != null && url.length > 0)
	{
		var pop = window.open(url, '_d2hpopup', 'resizable=1,toolbar=0,directories=0,status=0,location=0,menubar=0,height=300,width=400');
		pop.focus();                 // if the popup was already open
		pop.onblur = "self.close()"; // doesn't work, not sure why...
	}

	// and ignore the click
	return false;
}

function d2hwindow(url, name)
{
    if (name != 'main')
    {
        window.open(url, name, 'scrollbars=1,resizable=1,toolbar=0,directories=0,status=0,location=0,menubar=0,height=300,width=400');
        return false;
    }
    return true;
}

function d2hcancel(msg, url, line)
{
	return true;
}

function d2hload()
{
	window.focus();
	window.onerror = d2hcancel;
	if (window.name == '_d2hpopup')
	{
		var major = parseInt(navigator.appVersion);
		if (major >= 4)
		{
			var agent = navigator.userAgent.toLowerCase();
			if (agent.indexOf("msie") != -1)
				document.all.item("ienav").style.display = "none";
			else
				document.layers['nsnav'].visibility = 'hide';
		}
	}
}

function d2hframeload()
{
	// for compatibility with HTML generated by earlier versions
}

function d2htocload()
{
	if (d2hie())
	{
		var id, elt;
		var count = document.all.length;

		for (i = 0; i < count; i++)
		{
			elt = document.all.item(i);

			if (elt.id.substring(0, 1) == "c")
				elt.style.display = "none";

			else if (elt.id.substring(0, 2) == "mi")
				d2himage(elt, IMAGE_CLOSE, "closed.gif");
		}
	}
}

function d2hclick()
{
	if (d2hie())
	{
		var id = window.event.srcElement.id;

		var n = id.substring(0, 1);
		if (id.substring(0, 1) != "m")
			return;

		var sub = id.substring(2);
		var elt = document.all.item("c" + sub);
		var img = document.all.item("mi" + sub);

		if (elt != null)
		{
			if (elt.style.display == "none")
			{
				elt.style.display = "";
				d2himage(img, IMAGE_OPEN, "open.gif");
			}
			else
			{
				elt.style.display = "none";
				d2himage(img, IMAGE_CLOSE, "closed.gif");
			}
		}
	}
}

// Sets a specified relative URL of image to specified HTML element
function d2himage(element, image, def)
{
	if (element != null)
	{
		// Sets the default image if open image is not initialized
		if (image.substring(0, 2) == "%O")
			image = def;

		// Sets the default image if close image is not initialized
		else if (image.substring(0, 2) == "%C")
			image = def;

		// Hide element if image is missing
		if (image == "")
			element.style.visibility = "hidden";

		// Sets the specified image to element and displays it
		else
		{
			element.src = d2hGetRelativePath(element.document, image);
			element.style.visibility = "visible";
		}	
	}
}

function d2hswitchpane(id)
{
	var sel, unsel, selimg, unselimg;
	var prefix = id.substring(0, 8);
	if (prefix == "D2HIndex")
	{
		sel = document.all("D2HIndex");
		unsel = document.all("D2HContents");
		selimg = INDEX_SELECTED;
		unselimg = CONTENTS_UNSELECTED;
	}
	else if (prefix == "D2HConte")
	{
		sel = document.all("D2HContents");
		unsel = document.all("D2HIndex");
		selimg = CONTENTS_SELECTED;
		unselimg = INDEX_UNSELECTED;
	}

	if (sel != null)
	{
		sel.className = sel.id + "Selected";
		var selimgelm = document.all(sel.id + "Image");
		d2himage(selimgelm, selimg, "");
	}

	if (unsel != null)
	{
		unsel.className = unsel.id + "Unselected";
		var unselimgelm = document.all(unsel.id + "Image");
		d2himage(unselimgelm, unselimg, "");
	}
}

function d2hactivepane()
{
	var id = "D2HContents";
	var frms = window.parent.frames;
	if (frms.length < 2)
		return id;

	var frm = frms["left"];
	if (frm == null)
		return id;

	var body = frm.document.body;
	if (body != null)		
		id = body.id;

	return id;				
}

function d2hnsresize()
{
	if (d2hie())
	{
		dhtml_nonscrolling_resize();
		var id = d2hactivepane();
		d2hswitchpane(id);
	}
}

function d2h_before_print()
{
	document.body.scroll = "yes";
	var oText = document.all.item("nstext");
	if (oText != null)
	{
		oText.style.overflow = "visible";
		oText.style.width = "100%";
	}
	var nav = document.all["ienav"];
	if (nav != null)
		nav.style.display = "none";
	var oBanner = document.all.item("nsbanner");
	if (oBanner != null)
	{
		oBanner.style.borderBottom = "0px";
		oBanner.style.margin = "0px 0px 0px 0px";
		oBanner.style.width = "100%";
	}
}

function d2h_after_print()
{
	document.location.reload();
}

function d2h_set_popup_html(doc)
{
	doc.body.innerHTML = document.body.innerHTML;
	var frame = doc.all("popupFrame");
	if (frame != null)
		frame.removeNode(true);
	var nst = doc.all["nstext"];
	if (nst != null)
	{
		nst.style.paddingTop = "0px";
		nst.style.paddingLeft = "10px";
		nst.style.removeAttribute("top", false);
		nst.style.removeAttribute("width", false);
		nst.style.removeAttribute("height", false);
	}
	var count = doc.all.length;
	var elt, i;
	//need to reset onclick event to prevent script error
	//because scripts don't work when body is copied from document to frame
	for (i = 0; i < count; i++)
	{
		elt = doc.all.item(i);
		if ((elt.tagName == "A") || (elt.tagName == "a"))
			elt.onclick = "";
	}
}

function d2h_hide_unused_elements(doc)
{
	var title = doc.all["TitleRow"];
	if (title != null)
		title.style.display = "none";
	var nsb = doc.all["nsbanner"];
	if (nsb != null)
		nsb.style.display = "none";

	var count = doc.all.length;
	var show = false, inTopic = false, id, elt, i;
	for (i = 0; i < count; i++)
	{
		elt = doc.all.item(i);
		var id = elt.id;
		if (!inTopic && (id.length > 10) && (id.substring(0, 10) == "_D2HTopic_"))
			inTopic = true;
		if (elt.className == "_D2HAnchor")
			show = (elt.name == ANCHOR);
               	if (inTopic && !show)
			elt.style.display = "none";
	}
}

function d2hGetRelativePath(doc, path)
{
	if (path.length >= 0)
	{
		var relPart = doc.body.getAttribute("relPart");
		if (relPart == null)
			relPart = "";
		return relPart  + path;
	}
	else
		return "";
}

function d2hHideInline(elem)
{
    if (elem != null)
    {
        elem.style.visibility = "hidden";
        elem.style.position = "absolute";
        if (typeof elem.style.display != "undefined")
            elem.style.display = "none";
    }
}

function d2hShowInline(elem)
{
    if (elem != null)
    {
        elem.style.visibility = "";
        elem.style.position = "";
        if (typeof elem.style.display != "undefined")
            elem.style.display = "";
    }
}

function d2hInitInlineDropdown(elemId)
{
    var elem = getElemById(document, elemId);
    d2hHideInline(elem);
}

function d2hInitInlineExpand(elemId)
{
    var elem = getElemById(document, elemId);
    d2hHideInline(elem);
}

function d2hInitInlinePopup(elemId)
{
    var elem = getElemById(document, elemId);
    if (elem != null)
    {
        d2hHideInline(elem);
        elem.style.backgroundColor = POPUP_COLOR;
        elem.style.backgroundImage = "url('" + d2hGetRelativePath(document, POPUP_IMAGE) + "')";
        elem.style.backgroundRepeat = POPUP_REPEAT;
        elem.style.border = "1px solid #cccccc";
    }
}

function d2hInlineExpand(evt, elemId)
{
    var elem = getElemById(document, elemId);
    if (elem != null)
    {
        if (elem.style.visibility == "hidden")
            d2hShowInline(elem);
        else
            d2hHideInline(elem);
    }
    return false;
}

function d2hInlineDropdown(evt, elemId)
{
    var elem = getElemById(document, elemId);
    if (elem != null)
    {
        if (elem.style.visibility == "hidden")
            d2hShowInline(elem);
        else
            d2hHideInline(elem);
    }
    return false;
}

function getElemById(doc, id)
{
    if (typeof doc.all != "undefined")
        return doc.all(id);
    else
        return doc.getElementById(id);
}

function d2hInlinePopup(evt, elemId)
{
    var elem = getElemById(document, elemId);
    if (elem != null)
    {
        if (elem.style.visibility == "hidden")
        {
            if (d2hNeedSendToBody(elem))
                d2hSend2Body(elem);
            if (typeof elem.style.display != "undefined")
                elem.style.display = "";
            elem.style.width = "auto";
            elem.style.height = "auto";
            var pt = d2hGetInlinePosition(evt);
            elem.style.visibility = "visible";
            setInlinePopup2Pos(elem, pt.x, pt.y);
            _d2hInlinePopup = elem;
        }
        else
        {
            d2hHideInline(elem);
            elem.style.left = 0;
            elem.style.top = 0;
        }
    }
    return false;
}

function setInlinePopup2Pos(popupElem, x, y)
{
    var nstext = getElemById(document, "nstext");
    if (nstext == null)
        nstext = document.getElementsByTagName((document.compatMode && document.compatMode == "CSS1Compat") ? "HTML" : "BODY")[0];
    d2hStandardizePopupMargin(popupElem);
    var w_width = nstext.clientWidth ? nstext.clientWidth + nstext.scrollLeft : window.innerWidth + window.pageXOffset;
    var w_height = nstext.clientHeight ? nstext.clientHeight + nstext.scrollTop : window.innerHeight + window.pageYOffset;
    popupElem.style.width = "auto";
    popupElem.style.height = "auto";
    var textWidth = popupElem.offsetWidth;
    var w = (w_width > 300)? w_width * 0.6: w_width;
    if (textWidth > w)
        textWidth = w;
    popupElem.style.width = textWidth + "px";
    var t_width = popupElem.offsetWidth;
    var t_height = popupElem.offsetHeight;
    textWidth = Math.sqrt(16*t_width*t_height/9);
    popupElem.style.width = Math.round(textWidth) + "px";
    t_width = popupElem.offsetWidth;
    t_height = popupElem.offsetHeight;
    popupElem.style.left = x + 8 + "px";
    popupElem.style.top = y + 8 + "px";
    var x_body_bottom = (document.body.clientWidth ? document.body.clientWidth : window.innerWidth) + document.body.scrollLeft;
    var y_body_bottom = (document.body.clientHeight ? document.body.clientHeight : window.innerHeight) + document.body.scrollTop;
    if (x + t_width > x_body_bottom)
        popupElem.style.left = x_body_bottom - t_width + "px";
    if (y + t_height > y_body_bottom)
        popupElem.style.top = y_body_bottom - t_height + "px";
}

function d2hIsTopicTitle(elem)
{
    if (elem.nodeType != 1)
        return false;
    var tagName = elem.tagName;
    tagName = tagName.substring(0, 1).toLowerCase();
    if (tagName == "h" || tagName == "p")
        return true;
    return false;
}

function d2hTraverseElements(elem, func)
{
    func(elem);
    var c = elem.firstChild;
    while (c != null)
    {
        if (c.nodeType == 1)
        {
            func(c);
            d2hTraverseElements(c, func);
        }
        c = c.nextSibling;
    }
}

function d2hSetZeroMargin(elem)
{
    elem.style.margin = "0pt";
    elem.style.padding = "0pt";
}

function d2hGetFirstChildElement(parent)
{
    var c = parent.firstChild;
    while (c != null && c.nodeType != 1)
        c = c.nextSibling;
    if (c != null && c.nodeType == 1)
        return c;
    return null;
}

function d2hStandardizePopupMargin(elem, marginpading2zeroElem, ienav)
{   
    elem.style.margin = "0pt";
    elem.style.padding = "6pt";
    var h = null;
    var contents;
    if (typeof marginpading2zeroElem != "undefined" && marginpading2zeroElem != null)
    {
        d2hSetZeroMargin(marginpading2zeroElem);
        contents = marginpading2zeroElem;
        if (typeof ienav != "undefined" && ienav != null)
        {
            ienav.className = "";
            d2hTraverseElements(ienav, d2hSetZeroMargin);
        }
    }
    else
        contents = elem;
    if (contents != null)
        h = d2hGetFirstChildElement(contents);
    if (h != null)
    {
        var tagName = h.tagName.toLowerCase();
        if (tagName == "div")
        {
            d2hSetZeroMargin(h);
            h = d2hGetFirstChildElement(h);
        }
        if (h != null && d2hIsTopicTitle(h))
            d2hSetZeroMargin(h);
    }
}

function d2hGetParentElement(elem)
{
    var parent = null;
    if (typeof elem != "undefined" && elem != null)
    {
        if (typeof elem.parentElement != "undefined")
            parent = elem.parentElement;
        else
        {
            parent = elem.parentNode;
            if (parent != null && parent.nodeType != 1)
            {
                parent = parent.parentNode;
                if (parent != null && parent.nodeType != 1)
                    parent = null;
            }
        }
    }
    return parent;
}

function d2hShowTopicTitleInPopup(doc)
{
    var nav = getElemById(doc, "nsbanner");
    if (nav == null)
        return;
    var title = getElemById(doc, "_d2hTitleNavigator");
    if (title == null)
    {
        nav.style.display = "none";
        return;
    }
    var parent = d2hGetParentElement(nav);
    if (parent == null)
        return;
    var objTitle = null;
    if (typeof title.removeNode != "undefined")
        objTitle = title.removeNode(true);
    else
        objTitle = title.cloneNode(true);
    parent.replaceChild(objTitle, nav);
}

function d2hNeedSendToBody(elem)
{
    var p = d2hGetParentElement(elem);
    return !(p == null || p == document.body);
}

function d2hMoveToEnd(elem, newParent)
{
    var obj = null;
    if (typeof elem.removeNode != "undefined")
        obj = elem.removeNode(true);
    else
    {
        var parent = d2hGetParentElement(elem);
        obj = parent.removeChild(elem);
    }
    newParent.appendChild(obj);
}

function d2hSend2Body(elem)
{
    var body = document.body;
    d2hMoveToEnd(elem, body);
}

function point(x, y)
{
    this.x = x;
    this.y = y;
}

function d2hGetInlinePosition(evt)
{
    var pt = new point(evt.clientX + document.body.scrollLeft, evt.clientY + document.body.scrollTop);
    return pt;
}

function d2hRegisterEventHandler(obj, altObj, eventName, handler)
{
	var o = obj;
	var oldHandler = o[eventName.toLowerCase()];
	if (typeof oldHandler == "undefined" || oldHandler == null)
	{
		o = altObj;
		oldHandler = o[eventName.toLowerCase()];
	}
	if (typeof oldHandler == "undefined" || oldHandler == null)
	{
		if (typeof document.scripts != "undefined")
		{
			var objName = typeof obj.open != "undefined" ? "window" : obj.tagName.toLowerCase();
			var altName = typeof altObj.open != "undefined" ? "window" : altObj.tagName.toLowerCase();
			for (var i = 0; i < document.scripts.length; i++) 
			{
				var script = document.scripts[i];
				if ((script.htmlFor == obj.id || script.htmlFor == objName || script.htmlFor == altObj.id || script.htmlFor == altName) && script.event == eventName)
				{
					oldHandler = script.innerHTML;
					break;
				}
			}
		}
	}
	else
	{
			var defFunc = oldHandler.toString();
			var beg = defFunc.indexOf('{');
			var end = defFunc.lastIndexOf('}');
			if (beg > 0 || end > beg)
				oldHandler = defFunc.substring(beg + 1, end - 1);
	}
	if (oldHandler && oldHandler.indexOf(handler) > -1)
		return;
	var newHandler = oldHandler;
	if (oldHandler == null || newHandler.length == 0)
		newHandler = handler;
	else
		newHandler += "; " + handler;
	o[eventName.toLowerCase()] = new Function("event", newHandler);
}

function d2hInitMainThemeHandlers()
{
	d2hRegisterEventHandler(window, document.body, "onload", "d2hnsresize();");
	d2hRegisterEventHandler(window, document.body, "onmousedown", "d2hpopup();");
}

function d2hInitSecThemeHandlers()
{
	d2hRegisterEventHandler(window, document.body, "onload", "d2hload();");
	d2hRegisterEventHandler(window, document.body, "onmousedown", "d2hpopup();");
}

function d2hElementInContainer(elem, container)
{
    do
    {
        if (elem == container)
            return true;
    }
    while ((elem = d2hGetParentElement(elem)) != null)
    return false;
}

function d2hHideBreadcrumbs(doc)
{
    var breadcrumbs = getElemById(doc, "d2h_breadcrumbs");
    if (breadcrumbs != null)
        breadcrumbs.style.display = "none";
}

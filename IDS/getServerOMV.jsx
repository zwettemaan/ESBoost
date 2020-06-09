
/* This snippet was posted by Vlad Vadilla to the AdobeDevs Slack group */

/* global XML, $, app */
(function () {
    function getOMV() {
        var res = new XML('<dictionary engine=""/>'),
            cls = $.dictionary.getClasses(),
            i,
            map = res.appendChild($.dictionary.toXML()).map,
            pack = res.appendChild(new XML('<package/>')).package;
        
        map['@title'] = decodeURIComponent(app.filePath.name) + ' (' + app.version + ') Object Model';
        
        //fix href
        var hrefs = map.xpath('//topicref[@href]');
        for (i = 0; i < hrefs.length(); i++){
            hrefs[i]['@href'] = '#/' + hrefs[i]['@href'].toString();
        }
        for (i = 0; i < cls.length; i++){
            pack.appendChild($.dictionary.getClass(cls[i]).toXML());
        }
        return res;
    }
    var r = getOMV(),
        f = File('~/Desktop/server.xml');
    f.open('w');
    f.writeln(r.toXMLString());
    f.close();

}());
import urllib
import urllib2
import sys
from optparse import OptionParser, OptionGroup #note: deprecated in Python27, use argparse

server_url = 'http://ambushnetworks.com:9876/parse'
progVersion = "0.1"
def post_node(data):
    #Post to Karan's Node script
    post_url = server_url
    user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
    values = {'url' : data[1],
              'data': data[0]}
    headers = { 'User-Agent' : user_agent }
    senddata = urllib.urlencode(values)
    req = urllib2.Request(post_url, senddata, headers)
    response = urllib2.urlopen(req)
    print "Posted message: "+data[0]

def cli():
    #post_node(["Hmm, let me think about this.",None]) #post to karan's thing
    #usage = """ Give it a message... """
    #parser = OptionParser(usage=usage,version="%prog "+progVersion)
    #parser.disable_interspersed_args()
    #group1 = OptionGroup(parser, "Global Options", "")
    #group1.add_option("-m", "--message", dest="message", default=None, metavar="[message]")
    #parser.add_option_group(group1)
    #(options, args_for_condition) = parser.parse_args()

    #message = options.message
    count = 1;
    stringToPost = ""
    while(count < len(sys.argv)):
        stringToPost += sys.argv[count]
        stringToPost += " "
        count+=1
    print stringToPost
    say(msg=stringToPost)

def say(msg="hello"):
    post_node([msg,None]) #post to karan's thing

if __name__ == "__main__":
    cli()

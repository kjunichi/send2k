require('cfpropertylist')
plist = CFPropertyList::List.new(:file => "test.plist")
plist.save("out.plist",CFPropertyList::List::FORMAT_XML)


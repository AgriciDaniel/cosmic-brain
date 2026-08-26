Bag Check

1  Bag Check

Summary

Menu

Master Data  Access Control  Bag Check

Transaction code

back

Function authorization

back

The  “bag  check”  function  allows  for  the  access  control  function  to  decide  which  employees  are  to  be

checked  when  leaving  the  premises.  The  decision  is  made  using  a  random  generator  where  the

probability can  be  specified. If a bag check is to be  carried out the ZKS terminal triggers a contact that

announces the bag check by an optical or acoustic signal.

MOC_BagCheck.docx

Version: 1.0.1362

Page 1 of 2

The “bag check” function is only provided by terminals of the type CT-385.

Bag Check

Field Descriptions

Access

Access where a bag check is to be carried out.

Active

This  option  enables  or  disables  the  currently  displayed  entry.  Inactive  configurations  are  not

processed at entries.

Open entrance

This  option  defines  whether  the  entrance  is  to  be  opened  or  remains  closed  during  a  bag  check.

This  depends,  however,  on  whether  the  bag  check  takes  place  in  front  of  or  behind  the  access

point.

Bag check at … out of … access attempts

Number of checks that are to be performed for a specified number of access attempts. The above

screenshot is configured so as to check six out of 100 access attempts on average, i.e. every 17th

access  is  checked.  The  decision  is  made  for  each  entry  using  a  random  generator  with  the

probability  that  is  configured  here.  Consequently,  it  might  be  the  case  that  two  bag  checks  are

performed directly one after the other. But it may also be the case that there are far more than 17

access attempts between two checks.

Comment

Comment on the configuration

Valid from, valid until

Validity period for the bag check. The bag check function is not restricted if the validity end date is

not filled out.

Time, until

Period of time during which the bag check is performed.

Monday, Tuesday, ..., Other day off

Weekdays  when  the  bag  check  is  performed.  Three  types  of  public  holidays  are  supported  in

addition to weekdays.

MOC_BagCheck.docx

Version: 1.0.1362

Page 2 of 2


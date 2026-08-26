Manual

MES Weaver
SIS-MWV 3.0

Version 1.5.15584

Last changed on: 19.06.2020

MES Weaver

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SIS-MWV_30.docx

Version: 1.5.19608

Page 2 of 477

MES Weaver

Fehler! Hyperlink-Referenz ungültig.

Contents

1  MES Weaver 3.0 - Overview ...................................................................... 39

2  MES Weaver 3.0 - Technical Overview ..................................................... 41

3  Maintenance Manager 2.0 ......................................................................... 46

3.1  Application ........................................................................................................ 46

3.2

Login ................................................................................................................. 46

3.3  Configuration ..................................................................................................... 48

3.4  Package Deployment ........................................................................................ 51

3.4.1  General ................................................................................................. 51

3.4.2

Internal Package Types ......................................................................... 52

3.4.3  Perform deployment .............................................................................. 53

3.5  Deployment ....................................................................................................... 55

3.5.1  Administration of update packages ........................................................ 55

3.5.2  Activation of the Software Status ........................................................... 58

3.6  Additional Functions .......................................................................................... 59

3.6.1  Version Request of the Java Components ............................................. 59

3.6.2  Version request of the Client Components ............................................ 60

3.6.3  Administration ........................................................................................ 61

4  Multilingual Database Contents ................................................................. 64

5  HYDRA Database Password ..................................................................... 78

6  Time-Controlled Host Interfacing ............................................................... 84

7  MLE Communication ................................................................................ 101

8  Logical Systems ....................................................................................... 108

9  Distribution Model .................................................................................... 110

10  Status Monitor MLE Communication........................................................ 113

SIS-MWV_30.docx

Version: 1.5.19608

Page 3 of 477

MES Weaver

11  Inbound Transactions ............................................................................... 116

12  Outbound Transactions ............................................................................ 121

13  MLE Archiving .......................................................................................... 126

14  Logbook ................................................................................................... 128

15  Inspection for Business Parameter Containers (BSCs) ........................... 131

16  Errorcodes and Returncodes ................................................................... 134

16.1  Overview ......................................................................................................... 134

16.1.1  Errorcode 10: Order not available ........................................................ 134

16.1.2  Errorcode 11: Order number ■■.. not allowed ...................................... 134

16.1.3  Errorcode 20: Order is already running ................................................ 134

16.1.4  Errorcode 30: Order has been finished ................................................ 135

16.1.5  Errorcode 31: Order has been interrupted ........................................... 135

16.1.6  Errorcode 32: Invalid OP status change .............................................. 136

16.1.7  Errorcode 40: 1 order can only be logged on to mach. ........................ 136

16.1.8  Errorcode 41: 1 order can only be logged on to stat. ........................... 136

16.1.9  Errorcode 42: Opt. finish oper. when target qua. reach ........................ 137

16.1.10 Errorcode 50: Order status is not available .......................................... 137

16.1.11 Errorcode 51: Old order - logon not possible ....................................... 137

16.1.12 Errorcode 52: Order header status not available ................................. 138

16.1.13 Errorcode 60: OP cannot be logged on several times .......................... 138

16.1.14 Errorcode 70: Order is already running on this mach. .......................... 138

16.1.15 Errorcode 73: The operation is still blocked by MLE ............................ 139

16.1.16 Errorcode 74: OP is deleted logically ................................................... 139

16.1.17 Errorcode 75: Order cannot be recorded ............................................. 139

16.1.18 Errorcode 76: Order is blocked ............................................................ 139

16.1.19 Errorcode 77: Order cannot be logged on ............................................ 140

16.1.20 Errorcode 78: OP cannot be logged on................................................ 140

16.1.21 Errorcode 79: Invalid order status ........................................................ 141

16.1.22 Errorcode 80: Invalid OP status ........................................................... 142

16.1.23 Errorcode 81: The status cannot be assigned manually ...................... 142

16.1.24 Errorcode 82: Status change not allowed ............................................ 142

16.1.25 Errorcode 83: Status not allowed for this order type ............................ 143

SIS-MWV_30.docx

Version: 1.5.19608

Page 4 of 477

MES Weaver

16.1.26 Errorcode 84: Invalid machine status ................................................... 143

16.1.27 Errorcode 85: The operation is still blocked ......................................... 143

16.1.28 Errorcode 86: Target quantity change not allowed ............................... 144

16.1.29 Errorcode 87: The OP is prepared ....................................................... 144

16.1.30 Errorcode 89: The OP is not active ...................................................... 144

16.1.31 Errorcode 90: Machine ■■■■■■■■ not available ................................. 145

16.1.32 Errorcode 91: Machine is no machining center .................................... 145

16.1.33 Errorcode 94: Machine group ■■■■■■■■ not available ....................... 145

16.1.34 Errorcode 95: Posting outside synchronization! ................................... 146

16.1.35 Errorcode 100: It's not possible to logon to this mach. ......................... 146

16.1.36 Errorcode 101: No data available! ....................................................... 146

16.1.37 Errorcode 102: Unknown dialog ■■■■■■■■■■■■■■■ ■■■■■ .............. 147

16.1.38 Errorcode 103: Unknown event ■■■■■ ■■■■■■■■■■■■■■■ ............... 147

16.1.39 Errorcode 104: Unknown command .................................................... 147

16.1.40 Errorcode 105: Parameters are missing .............................................. 147

16.1.41 Errorcode 106: Invalid date ■■■■■■■■■■ ........................................... 148

16.1.42 Errorcode 107: Incorrect order type ..................................................... 148

16.1.43 Errorcode 108: Material staging! .......................................................... 148

16.1.44 Errorcode 109: Logon/off of OP has alr. been confirmed ..................... 149

16.1.45 Errorcode 110: Invalid time stamp ■■■■■■■ ....................................... 149

16.1.46 Errorcode 111: Area functions are not active ....................................... 149

16.1.47 Errorcode 112: Logon not intended at this workplace. ......................... 150

16.1.48 Errorcode 113: Logon n. possible at this mach./category .................... 150

16.1.49 Errorcode 114: No premium group assigned ....................................... 151

16.1.50 Errorcode 115: Invalid premium group ................................................. 151

16.1.51 Errorcode 116: Another premium group already assigned ................... 151

16.1.52 Errorcode 117: Status production is not available ................................ 152

16.1.53 Errorcode 118: The machine is blocked ............................................... 152

16.1.54 Errorcode 119: Overlap quantity exceeded .......................................... 152

16.1.55 Errorcode 130: Invalid serial number ■■■■■■■■■■■■■■■■ ................ 153

16.1.56 Errorcode 131: Serial number ■■■■■■■■■■■■■■■■ assigned ........... 153

16.1.57 Errorcode 132: Predecessor send-ahead qty. n.y. reached ................. 153

16.1.58 Errorcode 134: Too many lines; therefore only one item. ..................... 154

16.1.59 Errorcode 144: No data have been changed! ...................................... 154

16.1.60 Errorcode 145: Process offline ............................................................ 154

16.1.61 Errorcode 146: Communication with client not possible. ...................... 155

SIS-MWV_30.docx

Version: 1.5.19608

Page 5 of 477

MES Weaver

16.1.62 Errorcode 150: No valid INI configuration ............................................ 155

16.1.63 Errorcode 400: Same user no. as ■■■■■■■■■■■■■■■■■■■■ ............ 155

16.1.64 Errorcode 410: Error when opening/writing the file. ............................. 156

16.1.65 Errorcode 411: Status text is not available ........................................... 156

16.1.66 Errorcode 412: Can only be set man.if prod_kenn empty .................... 156

16.1.67 Errorcode 413: Production characteristic not distinct ........................... 156

16.1.68 Errorcode 414: Indicated group does not exist ..................................... 157

16.1.69 Errorcode 415: RESTYP does not fit in single type grp. ....................... 157

16.1.70 Errorcode 416: Function group is not available .................................... 157

16.1.71 Errorcode 417: Event that is not defined .............................................. 158

16.1.72 Errorcode 418: Please enter message................................................. 158

16.1.73 Errorcode 419: Please read message at first ....................................... 158

16.1.74 Errorcode 420: Wrong or missing recipient type .................................. 158

16.1.75 Errorcode 421: Please enter solution ................................................... 159

16.1.76 Errorcode 422: Communication error with escalation man. .................. 159

16.1.77 Errorcode 424: Error in User-Bapi (see protocol) ................................. 159

16.1.78 Errorcode 425: Responsibility profile not available .............................. 159

16.1.79 Errorcode 426: Group still in use (group assignment) .......................... 160

16.1.80 Errorcode 427: Function profile is not available ................................... 160

16.1.81 Errorcode 428: Message is already closed .......................................... 160

16.1.82 Errorcode 429: Circular reference detected ......................................... 161

16.1.83 Errorcode 430: Function requires development license ....................... 161

16.1.84 Errorcode 431: DEF/0: Requires development license ........................ 161

16.1.85 Errorcode 432: Data requires development license ............................. 162

16.1.86 Errorcode 500: Order is not logged on ................................................. 162

16.1.87 Errorcode 501: The container does not belong to order ....................... 162

16.1.88 Errorcode 502: Wrong sequence of containers .................................... 163

16.1.89 Errorcode 503: Log container on only to 1st OP .................................. 163

16.1.90 Errorcode 504: Container still active on preceding OP ......................... 163

16.1.91 Errorcode 505: The 1st OP has not yet been finished .......................... 164

16.1.92 Errorcode 510: Person is not authorized! ............................................. 164

16.1.93 Errorcode 520: Creating not allowed ................................................... 164

16.1.94 Errorcode 522: Station-related logons/offs not allowed ........................ 165

16.1.95 Errorcode 523: Station is already occupied ......................................... 165

16.1.96 Errorcode 524: OP must not be deleted ............................................... 165

16.1.97 Errorcode 526: Order has not been confirmed ..................................... 166

SIS-MWV_30.docx

Version: 1.5.19608

Page 6 of 477

MES Weaver

16.1.98 Errorcode 600: Invalid mode ■■ of plausibility check ........................... 166

16.1.99 Errorcode 601: There are no events for the plaus. check..................... 166

16.1.100

Errorcode 602: Invalid date/time [■■■■■■■■■■■■■■■■] in

event [■■■■■■■■■■] ........................................................................... 166

16.1.101

Errorcode 603: Unknown event [■■■■■■■■■■] in plaus.

check  167

16.1.102

Errorcode 604: Database error when creating a temporary

table

167

16.1.103

Errorcode 605: The logoff of person ■■■■■■■■■■ is

missing at machine ■■■■■■■■■■ ....................................................... 167

16.1.104

Errorcode 606: The logoff of OP ■■■■■■■■■■■■■■■■ is

missing at machine ■■■■■■■■■■ ....................................................... 167

16.1.105

Errorcode 607: The logoff of batch ■■■■■■■■■■■■■■■■ is

missing at machine ■■■■■■■■■■ ....................................................... 168

16.1.106

Errorcode 608: The logoff of input batch

■■■■■■■■■■■■■■■■ is missing at machine ■■■■■■■■■■ ................. 168

16.1.107

Errorcode 609: The logoff of output batch

■■■■■■■■■■■■■■■■ is missing at machine ■■■■■■■■■■ ................. 168

16.1.108

Errorcode 610: Invalid event [■■■■■■■■■■] in the data

maintenance ........................................................................................ 169

16.1.109

Errorcode 611: Confirmations active-recalculation blocked

at the moment! .................................................................................... 169

16.1.110

16.1.111

16.1.112

16.1.113

16.1.114

16.1.115

16.1.116

16.1.117

16.1.118

16.1.119

16.1.120

16.1.121

16.1.122

16.1.123

Errorcode 612: Cost center is invalid ...................................... 169

Errorcode 613: Cost center is blocked .................................... 169

Errorcode 619: Pallet not available. ........................................ 170

Errorcode 629: 20 OPs can only be logged on simultan. ......... 170

Errorcode 630: A negative consumption is not allowed. .......... 170

Errorcode 700: Day model is not available .............................. 171

Errorcode 701: Day model already exists ............................... 171

Errorcode 702: Day model is used within year model ............. 171

Errorcode 703: Day model is used today ................................ 171

Errorcode 704: Status is available in MDE protocol ................ 172

Errorcode 705: Status is available in ADE protocol ................. 172

Errorcode 706: Status is active at the machine ....................... 173

Errorcode 707: Machine has not been indicated ..................... 173

Errorcode 708: Machine status has not been indicated ........... 173

SIS-MWV_30.docx

Version: 1.5.19608

Page 7 of 477

MES Weaver

Errorcode 709: Target machine has not been indicated .......... 173

Errorcode 710: Target status has not been stated .................. 174

Errorcode 711: Processing mode has not been stated ............ 174

Errorcode 712: Processing mode is invalid ............................. 174

Errorcode 713: Machine status is not available ....................... 175

Errorcode 714: Machine status is already available ................ 175

Errorcode 715: Production characteristic is missing ................ 175

Errorcode 716: Product. character. already assigned ............. 176

Errorcode 717: RPA is not available ....................................... 176

Errorcode 718: Status text is not available .............................. 176

Errorcode 719: Disturbance class is not available ................... 176

Errorcode 720: Machine is no line ........................................... 177

Errorcode 721: Year model is assigned to a machine ............. 177

Errorcode 722: Year model is assigned to a person ................ 177

Errorcode 723: Year model has not been indicated ................ 178

Errorcode 724: Year has not been stated ............................... 178

Errorcode 725: Target year model has not been stated .......... 178

Errorcode 726: Target year has not been stated ..................... 179

Errorcode 727: Year model is not available ............................. 179

Errorcode 728: Year model already exists .............................. 179

Errorcode 729: Reference has not been stated ....................... 179

Errorcode 730: Date has not been stated ............................... 180

Errorcode 731: Holiday is not available ................................... 180

Errorcode 732: Holiday already exists ..................................... 180

Errorcode 733: Status text is assigned to a machine .............. 181

Errorcode 734: Status text no. has not been stated ................ 181

Errorcode 735: Status text is not available .............................. 181

Errorcode 736: Status text already exists ................................ 182

Errorcode 737: Machine is available in MDE protocol ............. 182

Errorcode 738: Machine is available in ADE protocol .............. 182

Errorcode 739: Machine is available in LZV protocol .............. 183

Errorcode 740: An OP is still logged on to machine ................ 183

Errorcode 741: Person is still logged on to machine ............... 183

Errorcode 742: Batch is still logged on to machine .................. 184

Errorcode 743: The machine is assigned to a line ................... 184

Errorcode 744: Machine is assigned to a terminal................... 184

16.1.124

16.1.125

16.1.126

16.1.127

16.1.128

16.1.129

16.1.130

16.1.131

16.1.132

16.1.133

16.1.134

16.1.135

16.1.136

16.1.137

16.1.138

16.1.139

16.1.140

16.1.141

16.1.142

16.1.143

16.1.144

16.1.145

16.1.146

16.1.147

16.1.148

16.1.149

16.1.150

16.1.151

16.1.152

16.1.153

16.1.154

16.1.155

16.1.156

16.1.157

16.1.158

16.1.159

SIS-MWV_30.docx

Version: 1.5.19608

Page 8 of 477

MES Weaver

Errorcode 745: Machine already exists ................................... 185

Errorcode 746: Terminal no. has not been stated ................... 185

Errorcode 747: Position has not been stated .......................... 185

Errorcode 748: Disturbance class no. already exists ............... 185

Errorcode 749: Disturbance class abbrev. alr. exists .............. 186

Errorcode 750: Disturb. class is assigned to a status .............. 186

Errorcode 751: Wage/premium indicator not available ............ 186

Errorcode 752: Wage/premium indicator alr. available ............ 187

Errorcode 753: Wage/premium indicat. has been recorded .... 187

Errorcode 754: Operator position not available ....................... 187

Errorcode 755: Operator position already available ................ 188

Errorcode 756: Operator position has been recorded ............. 188

Errorcode 757: Deviation reason not available ........................ 188

Errorcode 758: Deviation reason already available ................. 189

Errorcode 759: Deviation reason has been recorded .............. 189

Errorcode 760: Process parameter not available .................... 189

Errorcode 761: Process parameter alreday available .............. 190

Errorcode 762: Scrap reason not available ............................. 190

Errorcode 763: Scrap reasons are already available ............... 190

Errorcode 764: Terminal is already available .......................... 190

Errorcode 765: Maintenance instruction not available ............. 191

Errorcode 766: Maintenance instruct. is alr. available ............. 191

Errorcode 767: Order no. has not been indicated.................... 191

Errorcode 768: Tool family has not been indicated ................. 191

Errorcode 769: Tool family is not available.............................. 192

Errorcode 770: Tool family is already available ....................... 192

Errorcode 771: Target tool family has not been stated ............ 192

Errorcode 772: Tool reason no. has not been stated .............. 192

Errorcode 773: Tool reason no. is not available ...................... 193

Errorcode 774: Tool reason no. is already available ............... 193

Errorcode 775: Target tool reason no. not indicated ............... 193

Errorcode 776: Tool no. has not been indicated ...................... 194

Errorcode 777: Target tool no. has not been indicated ............ 194

Errorcode 778: Tool number is already available .................... 194

Errorcode 779: Tool number is not available ........................... 195

Errorcode 780: Blocking reason/measure not available .......... 195

16.1.160

16.1.161

16.1.162

16.1.163

16.1.164

16.1.165

16.1.166

16.1.167

16.1.168

16.1.169

16.1.170

16.1.171

16.1.172

16.1.173

16.1.174

16.1.175

16.1.176

16.1.177

16.1.178

16.1.179

16.1.180

16.1.181

16.1.182

16.1.183

16.1.184

16.1.185

16.1.186

16.1.187

16.1.188

16.1.189

16.1.190

16.1.191

16.1.192

16.1.193

16.1.194

16.1.195

SIS-MWV_30.docx

Version: 1.5.19608

Page 9 of 477

MES Weaver

Errorcode 783: Invalid status change ...................................... 195

Errorcode 784: Day model is used within year model ............. 195

Errorcode 785: Year model is assigned to a machine ............. 196

Errorcode 786: Order no.corresponds to result.order no. ........ 196

Errorcode 787: Max. no. of chainings reached ........................ 196

Errorcode 788: All orders have been commissioned ............... 196

Errorcode 789: Invalid material ............................................... 196

Errorcode 790: Chaining qty. greater than OP targ. qty........... 197

Errorcode 791: A running batch must not be changed ............ 197

Errorcode 792: Event maintenance is blocked ........................ 197

Errorcode 793: Event maint. blocked due to recalculat. .......... 197

Errorcode 794: Invalid machine for this action ........................ 198

Errorcode 795: Short-time dist. alr. assigned f. mach. ............. 198

Errorcode 796: Status is available in MDE protocol-LT ........... 198

Errorcode 797: Confirmations are active at the moment ......... 198

Errorcode 798: Posted time too small for reposting ................. 199

Errorcode 799: Month-end closing has alr. been done ............ 199

Errorcode 800: Order technically completed in SAP ............... 199

Errorcode 801: Storage could not be requested ...................... 200

Errorcode 802: Status alr. assigned when shift free ................ 200

Errorcode 803: Reposting leads to problem when compar. ..... 200

Errorcode 806: No appropriate U or E record available ........... 200

Errorcode 808: MDE event not alterable as OP is running ...... 201

Errorcode 809: Invalid superior status1 ID man. at TNR ......... 201

Errorcode 810: Inv.super.stat.2-m.stat.n.avail.f.m.no. ............. 201

Errorcode 811: Invalid superior status3-MST = ueb MST ........ 202

Errorcode 812: Invalid superior satus4-reference chain .......... 202

Errorcode 813: Ev. maint. blocked as lock deleted .................. 202

Errorcode 814: Either yield or scrap ........................................ 202

Errorcode 815: Logoff date/time already exists ....................... 203

Errorcode 816: Terminal has machines assigned ................... 203

Errorcode 900: Unit is not available ........................................ 203

Errorcode 901: Formula is not available .................................. 204

Errorcode 902: Formula still in tab. USRFFIELDELEM ........... 204

Errorcode 903: Formula still in tab. LSTCODES ..................... 204

Errorcode 904: Formula still in tab. EINHUMR ........................ 204

16.1.196

16.1.197

16.1.198

16.1.199

16.1.200

16.1.201

16.1.202

16.1.203

16.1.204

16.1.205

16.1.206

16.1.207

16.1.208

16.1.209

16.1.210

16.1.211

16.1.212

16.1.213

16.1.214

16.1.215

16.1.216

16.1.217

16.1.218

16.1.219

16.1.220

16.1.221

16.1.222

16.1.223

16.1.224

16.1.225

16.1.226

16.1.227

16.1.228

16.1.229

16.1.230

16.1.231

SIS-MWV_30.docx

Version: 1.5.19608

Page 10 of 477

MES Weaver

Errorcode 905: There is alr. standard sequence f.order .......... 205

Errorcode 906: Standard sequence must not be delted .......... 205

Errorcode 907: Act.can't be effect.after this seq.type .............. 205

Errorcode 908: Waiting period charac. already assigned ........ 206

Errorcode 909: Initial stat. has not been assigned yet ............. 206

Errorcode 910: Category not correct ....................................... 206

Errorcode 911: Processing code not available ........................ 206

Errorcode 912: Seq. change n. poss. due to ord. stat. ............ 207

Errorcode 913: Seq. change only possible for alt. seq. ........... 207

Errorcode 914: An OP of the sequnce is alr. running .............. 207

Errorcode 915: Branch OP is invalid ....................................... 207

Errorcode 916: Return address is invalid ................................ 208

Errorcode 917: Location group from/to is invalid ..................... 208

Errorcode 918: Group is no capacity group ............................. 208

Errorcode 919: Sel. field type does not go with DB type.......... 208

Errorcode 920: Error while init. planning component ............... 209

Errorcode 921: ID is not in table USERFIELDDEF .................. 209

Errorcode 922: Year model is still in transp. matrix ................. 209

Errorcode 923: Cost center group <> cost center machine ..... 210

Errorcode 924: Only one SI unit can be defined per type ........ 210

Errorcode 925: Sequence not available .................................. 210

Errorcode 926: Sequence is still used by orders ..................... 210

Errorcode 927: Machine is in production ................................. 211

Errorcode 928: Machine is in production lock .......................... 211

Errorcode 929: An alternative sequence is alr. active ............. 211

Errorcode 930: maximum number of counter is exceeded ...... 212

Errorcode 931: allocation with same type not possible ............ 212

Errorcode 932: Unknown list command .................................. 212

Errorcode 933: status text cannot be deleted .......................... 212

Errorcode 934: hierarchical status cannot be assigned ........... 212

Errorcode 935: counter configuration not supported ............... 213

Errorcode 936: Overlapping shifts ........................................... 213

Errorcode 937: Overlapping breaks ........................................ 213

Errorcode 938: Status must be config. -OP logged on- ........... 214

Errorcode 939: MDE event for Shiftend not alterable .............. 214

Errorcode 940: User name for single sign-on missing ............. 214

16.1.232

16.1.233

16.1.234

16.1.235

16.1.236

16.1.237

16.1.238

16.1.239

16.1.240

16.1.241

16.1.242

16.1.243

16.1.244

16.1.245

16.1.246

16.1.247

16.1.248

16.1.249

16.1.250

16.1.251

16.1.252

16.1.253

16.1.254

16.1.255

16.1.256

16.1.257

16.1.258

16.1.259

16.1.260

16.1.261

16.1.262

16.1.263

16.1.264

16.1.265

16.1.266

16.1.267

SIS-MWV_30.docx

Version: 1.5.19608

Page 11 of 477

MES Weaver

Errorcode 941: Status is not valid (RESTYP/RES) .................. 215

Errorcode 942: Status is not valid (RESTYP/RESFAM) .......... 215

Errorcode 943: Status is not available (RESTYP) ................... 215

Errorcode 944: Status is not active ......................................... 215

Errorcode 945: Status is already active ................................... 216

Errorcode 946: counter configuration not available ................. 216

Errorcode 947: Machine/line group assignment exists ............ 216

Errorcode 948: Copy mach/line grp. ass. MOD=Z not allow .... 217

Errorcode 949: Error in Configuration: PZE controls BDE ....... 217

Errorcode 950: Dissolving of campaign not possible ............... 217

Errorcode 1000: Person must not log on operation ................. 218

Errorcode 951: Machine/capacity group assignment exists ..... 218

Errorcode 1010: Person must not log off operation ................. 218

Errorcode 1019: P.must not log on sever.times in advance .... 219

Errorcode 1020: Person must not log on several times ........... 219

Errorcode 1021: Person may only log on to OP ■■■ ............... 219

Errorcode 1022: Person must not report quantity to OP .......... 220

Errorcode 1023: Person must not interrupt OP ....................... 220

Errorcode 1030: Person not available ..................................... 220

Errorcode 1031: Person has already left the company ............ 221

Errorcode 1032: Person is blocked ......................................... 221

Errorcode 1033: Person has not yet joined the company ........ 221

Errorcode 1040: No order is running on machine .................... 222

Errorcode 1050: Person has already logged on ...................... 222

Errorcode 1060: Person is not logged on ................................ 222

Errorcode 1061: Nobody is logged on to machine................... 223

Errorcode 1070: Changing not possible .................................. 223

Errorcode 1090: Person must not change disturbance ........... 223

Errorcode 1100: Person is already logged on to order ............ 224

Errorcode 1101: Person is already logged on in advance ....... 224

Errorcode 1102: It is not allowed logging off last pers. ............ 224

Errorcode 1110: Person is not logged on to order ................... 225

Errorcode 1114: Person must not log off all persons ............... 225

Errorcode 1120: OP must not be finished ............................... 225

Errorcode 1122: Time stamp for logging on is invalid .............. 226

Errorcode 1123: Period has alr. been posted for person ......... 226

16.1.268

16.1.269

16.1.270

16.1.271

16.1.272

16.1.273

16.1.274

16.1.275

16.1.276

16.1.277

16.1.278

16.1.279

16.1.280

16.1.281

16.1.282

16.1.283

16.1.284

16.1.285

16.1.286

16.1.287

16.1.288

16.1.289

16.1.290

16.1.291

16.1.292

16.1.293

16.1.294

16.1.295

16.1.296

16.1.297

16.1.298

16.1.299

16.1.300

16.1.301

16.1.302

16.1.303

SIS-MWV_30.docx

Version: 1.5.19608

Page 12 of 477

MES Weaver

16.1.304

16.1.305

16.1.306

16.1.307

16.1.308

16.1.309

16.1.310

16.1.311

16.1.312

16.1.313

16.1.314

16.1.315

16.1.316

16.1.317

16.1.318

16.1.319

16.1.320

16.1.321

16.1.322

Errorcode 1124: Period has alr. been posted to for OP ........... 226

Errorcode 1154: Standard time ■■■■ not defined ................... 227

Errorcode 1158: Target quantity not reached/exceeded.......... 227

Errorcode 1159: Inadmissible cost center ............................... 227

Errorcode 1160: Scrap quantity exceeds batch quantity ......... 228

Errorcode 1163: Quantity not reached/exceeded .................... 228

Errorcode 1230: Operations are still logged on ....................... 228

Errorcode 1240: Warning - overproduction OP! ...................... 228

Errorcode 1241: Logon not allowed overprod. of packages .... 229

Errorcode 1242: Warning - overproduction machine! .............. 229

Errorcode 1243: Warning - overproduction Person! ................ 230

Errorcode 1244: Posting not allowed: overproduction OP ....... 230

Errorcode 1245: Below target quantity .................................... 230

Errorcode 1246: Target quantity exceeded ............................. 231

Errorcode 1247: Posting not allowed: underproduction OP ..... 231

Errorcode 1248: Warning - underproduction machine! ............ 231

Errorcode 1249: Warning - underproduction person! .............. 232

Errorcode 1250: Warning - underproduction OP ..................... 232

Errorcode 1251: Logon not allowed underprod. of

packages ............................................................................................. 233

16.1.323

16.1.324

16.1.325

16.1.326

16.1.327

16.1.328

16.1.329

16.1.330

16.1.331

16.1.332

16.1.333

16.1.334

16.1.335

16.1.336

16.1.337

16.1.338

Errorcode 1252: Target output not reached ............................ 233

Errorcode 1253: Target output exceeded ................................ 233

Errorcode 1260: Orig.OP of a split OP can't be logged on ...... 234

Errorcode 1270: Ind.OP of collect.OP can't be logged on ....... 234

Errorcode 1280: Operation is already available ...................... 234

Errorcode 1290: OP cannot be created ................................... 235

Errorcode 1295: EQPOOL/father object not available ............. 235

Errorcode 1296: Object already exists .................................... 235

Errorcode 1297: Object not available ...................................... 235

Errorcode 1300: An individual OP is still logged on ................. 236

Errorcode 1310: A collective OP is still logged on ................... 236

Errorcode 1320: Max. number of persons is logged on ........... 236

Errorcode 1330: Clocking-in of person is missing ................... 237

Errorcode 1340: No collective OP has been logged on ........... 237

Errorcode 1350: COP cannot be interrupted as ind. OP.......... 237

Errorcode 1360: Partial confirmat. not possible for COP ......... 238

SIS-MWV_30.docx

Version: 1.5.19608

Page 13 of 477

MES Weaver

16.1.339

16.1.340

16.1.341

16.1.342

16.1.343

16.1.344

Errorcode 1370: OP has been logged on as COP................... 238

Errorcode 1380: Shop papers not printed ............................... 238

Errorcode 1390: Min. setup time has not been reached .......... 239

Errorcode 1400: Invalid scrap reason ..................................... 239

Errorcode 1401: Invalid deviation reason ................................ 239

Errorcode 1410: Person may only log on COP to 1

machine ............................................................................................... 240

16.1.345

16.1.346

16.1.347

16.1.348

16.1.349

16.1.350

16.1.351

16.1.352

16.1.353

16.1.354

16.1.355

16.1.356

16.1.357

16.1.358

16.1.359

16.1.360

16.1.361

16.1.362

16.1.363

16.1.364

16.1.365

16.1.366

16.1.367

16.1.368

16.1.369

16.1.370

16.1.371

16.1.372

16.1.373

Errorcode 1420: OP has alr. been logged on as Individ.OP .... 240

Errorcode 1430: Person logged on to individual OP ................ 240

Errorcode 1440: Person logged on to collective OP ................ 241

Errorcode 1450: Collective OP not allowed ............................. 241

Errorcode 1451: Collective OP not allowed without ref. ........... 242

Errorcode 1460: Collective OP has already been logged on ... 242

Errorcode 1472: Collect. OP n.possible at machin. center ...... 242

Errorcode 1473: Collect. OP is logged on at other machin ...... 242

Errorcode 1480: An indiv. OP has already been logged on ..... 243

Errorcode 1490: An OC order has already been logged on ..... 243

Errorcode 1491: A collective OP has alr. been logged on ....... 244

Errorcode 1492: Not possible - OP has been logged on ......... 244

Errorcode 1493: Not possible-OP does not have type GKM ... 244

Errorcode 1494: Not possible-OP does not have type GKP .... 245

Errorcode 1520: N.poss. to log pers. on/off to GWP/OCOP .... 245

Errorcode 1530: It's required to enter badge no. at GWP ........ 245

Errorcode 1540: No status change possible at GWP .............. 246

Errorcode 1541: Status not allowed for active OP ................... 246

Errorcode 1542: Status only allowed for active OP ................. 246

Errorcode 1543: Status n. allowed for type of active OP ......... 247

Errorcode 1560: Logging off operation is not allowed ............. 247

Errorcode 1561: Interrupting OP not allowed .......................... 247

Errorcode 1581: No person logged on with operator pos.1 ..... 248

Errorcode 1582: Allow. no. of pers.reached f. oper.pos .......... 248

Errorcode 1585: The event has already been logged on ......... 248

Errorcode 1590: OP can't be logged on due to pred. stat. ....... 249

Errorcode 1591: OP can't be logged on due to preced.stat. .... 249

Errorcode 1592: Preced. OP is prepared in order network ...... 250

Errorcode 1593: Batch status not allowed ............................... 250

SIS-MWV_30.docx

Version: 1.5.19608

Page 14 of 477

MES Weaver

16.1.374

16.1.375

16.1.376

16.1.377

16.1.378

16.1.379

16.1.380

16.1.381

16.1.382

Errorcode 1594: The batch status is invalid ............................ 250

Errorcode 1596: Invalid transport unit ..................................... 251

Errorcode 1600: A capacity OP cannot be logged on .............. 251

Errorcode 1601: Tool is active ................................................ 251

Errorcode 1602: Tool is blocked ............................................. 252

Errorcode 1603: Tool is not available ...................................... 252

Errorcode 1604: Setup acceptance not allowed ...................... 252

Errorcode 1606: The customer batch is already available ....... 253

Errorcode 1607: Missing license

■■■■■■■■■■■■■■■■■■■■■■■■ ......................................................... 253

16.1.383

16.1.384

16.1.385

16.1.386

16.1.387

16.1.388

16.1.389

16.1.390

16.1.391

16.1.392

16.1.393

16.1.394

16.1.395

16.1.396

16.1.397

Errorcode 1609: Invalid quantity unit ....................................... 253

Errorcode 1611: General database error ................................ 254

Errorcode 1612: Batch/lot not available .................................. 254

Errorcode 1613: Batch/lot has already been logged on ........... 254

Errorcode 1614: Batch management not configured ............... 254

Errorcode 1615: Person must not change batch ..................... 255

Errorcode 1617: No piece rate OP .......................................... 255

Errorcode 1620: Batch has already been finished ................... 255

Errorcode 1622: Posting not possible ..................................... 256

Errorcode 1624: Quantities have not yet been posted ............ 256

Errorcode 1625: Only one batch possible ............................... 256

Errorcode 1626: Invalid indicator ............................................ 257

Errorcode 1627: Invalid destination ......................................... 257

Errorcode 1628: Batch/lot has not been logged on ................. 257

Errorcode 1629: The batch is

■■■■■■■■■■■■■■■■■■■■■■■■■■■ .................................................. 258

16.1.398

16.1.399

16.1.400

16.1.401

16.1.402

16.1.403

16.1.404

16.1.405

16.1.406

16.1.407

Errorcode 1630: Not available yet ........................................... 258

Errorcode 1631: Expiry date has been reached ...................... 258

Errorcode 1632: At least one input batch is missing ................ 259

Errorcode 1633: Material cannot be logged on ....................... 259

Errorcode 1634: Material is not planned ................................. 259

Errorcode 1635: The batch contains another material ............. 260

Errorcode 1636: Output batch already available ..................... 260

Errorcode 1637: Operator position not defined ....................... 260

Errorcode 1638: Output batch not logged on .......................... 261

Errorcode 1639: Output batch is missing ................................ 261

SIS-MWV_30.docx

Version: 1.5.19608

Page 15 of 477

MES Weaver

16.1.408

16.1.409

16.1.410

16.1.411

16.1.412

16.1.413

16.1.414

16.1.415

16.1.416

16.1.417

16.1.418

16.1.419

16.1.420

16.1.421

16.1.422

Errorcode 1641: This OP is not subj.to batch management .... 261

Errorcode 1642: Wage grp./premium indicator not defined ..... 262

Errorcode 1643: The max. number of batches is exceeded .... 262

Errorcode 1646: The run through batch is not free .................. 262

Errorcode 1651: Valid batch alr.available f.r-thr.batch ............. 263

Errorcode 1652: This batch is no scrap batch ......................... 263

Errorcode 1653: This r-thr.batch has not been logged on ....... 263

Errorcode 1654: Rthr.batch has already been processed ....... 264

Errorcode 1655: DLGFILE cannot be opened ......................... 264

Errorcode 1656: RETFILE cannot be written ........................... 264

Errorcode 1657: No cost center authorization ......................... 265

Errorcode 1658: No cost center authorization for group .......... 265

Errorcode 1659: Parameters are missing for changing ........... 265

Errorcode 1660: Invalid user ................................................... 266

Errorcode 1661: Missing parameter

■■■■■■■■■■■■■■■■■■■■ ................................................................. 266

16.1.423

Errorcode 1662: Invalid parameter

■■■■■■■■■■■■■■■■■■■■ ................................................................. 266

16.1.424

Errorcode 1663: Person avail.comp. ■■■■ CCR.

■■■■■■■■■■ ....................................................................................... 267

16.1.425

16.1.426

16.1.427

16.1.428

16.1.429

16.1.430

16.1.431

16.1.432

16.1.433

16.1.434

16.1.435

16.1.436

16.1.437

16.1.438

16.1.439

16.1.440

Errorcode 1664: ID card alr.avail. for person ■■■■■■■■ ......... 267

Errorcode 1665: Editor or password invalid............................. 267

Errorcode 1666: Object has been blocked .............................. 268

Errorcode 1667: No. of licenses exceeded:■■■■■■■■ ........... 268

Errorcode 1668: Terminal is not available ............................... 268

Errorcode 1669: Data are already available ............................ 269

Errorcode 1670: Value too long/large for the field ................... 269

Errorcode 1671: Error in license data ...................................... 269

Errorcode 1672: Assignment already available ....................... 269

Errorcode 1673: Aggr. can't be assigned to terminals ............. 270

Errorcode 1674: GWPs can't be assigned to terminals ........... 270

Errorcode 1675: Max. ■■ lines c.be ass.to this terminal .......... 270

Errorcode 1676: Max. ■■ M/WP c.be.assign. to this term. ...... 270

Errorcode 1677: Only agg.,ma.,res.can be assigned to li. ....... 271

Errorcode 1678: Max. ■■ aggr.c.be assigned to this line ........ 271

Errorcode 1679: Assign.of aggr.to term.not deletable ............. 271

SIS-MWV_30.docx

Version: 1.5.19608

Page 16 of 477

MES Weaver

16.1.441

16.1.442

16.1.443

16.1.444

16.1.445

16.1.446

16.1.447

16.1.448

16.1.449

16.1.450

16.1.451

16.1.452

16.1.453

16.1.454

16.1.455

16.1.456

16.1.457

16.1.458

16.1.459

16.1.460

16.1.461

Errorcode 1680: Invalid terminal number ................................ 271

Errorcode 1681: Only mach. with year model c.be assigned ... 272

Errorcode 1682: Assignment not available .............................. 272

Errorcode 1683: Term.type can't be assigned to term. no. ...... 272

Errorcode 1684: Machine is assigned to MDE terminal ■■■ ... 272

Errorcode 1685: Assignment cannot be deleted ..................... 273

Errorcode 1686: Terminal group is not available ..................... 273

Errorcode 1687: Access profile is not available ....................... 273

Errorcode 1688: ID card is not available ................................. 273

Errorcode 1689: Remuneration day type is not available ........ 274

Errorcode 1690: Material buffer is not available ...................... 274

Errorcode 1692: Fct. not possible, no HYD-ALS license ......... 274

Errorcode 1694: Mach.is assign.to input server ■■■ ............... 274

Errorcode 1695: Remuneration model is not available ............ 275

Errorcode 1696: Working time model is not available ............. 275

Errorcode 1697: Shift rythm model is not available ................. 275

Errorcode 1698: No. of licenses exceeded:■■■■■■■■ ........... 276

Errorcode 1700: Personnel number not indicated ................... 276

Errorcode 1701: Company number not indicated .................... 276

Errorcode 1702: Area not indicated ........................................ 276

Errorcode 1703: Invalid badge number

■■■■■■■■■■■■■■■■ .......................................................................... 277

16.1.462

16.1.463

16.1.464

16.1.465

16.1.466

16.1.467

16.1.468

16.1.469

16.1.470

16.1.471

16.1.472

16.1.473

16.1.474

16.1.475

Errorcode 1704: Invalid personnel number ■■■■■■■■■■■ ..... 277

Errorcode 1705: Cost center not indicated .............................. 277

Errorcode 1706: Person is logged on to an order .................... 277

Errorcode 1707: Log data are available for the person ........... 278

Errorcode 1708: Date o.leaving lies bef.date of joining ........... 278

Errorcode 1709: Supervisor ■■■■■■■■ ■■■■ not available .... 279

Errorcode 1710: Superior of ■■■■■■■■ ■■■■ ........................ 279

Errorcode 1720: Wage type not available ............................... 279

Errorcode 1721: Wage type group not available ..................... 279

Errorcode 1722: Logon not available ...................................... 280

Errorcode 1723: Data record has already been uploaded ....... 280

Errorcode 1725: Invalid remuneration day type ....................... 280

Errorcode 1726: Invalid working time day type ........................ 280

Errorcode 1727: Invalid shift type ............................................ 280

SIS-MWV_30.docx

Version: 1.5.19608

Page 17 of 477

MES Weaver

16.1.476

16.1.477

16.1.478

16.1.479

16.1.480

16.1.481

16.1.482

16.1.483

16.1.484

16.1.485

16.1.486

16.1.487

16.1.488

16.1.489

16.1.490

16.1.491

16.1.492

16.1.493

16.1.494

16.1.495

16.1.496

16.1.497

16.1.498

16.1.499

16.1.500

16.1.501

16.1.502

16.1.503

16.1.504

16.1.505

16.1.506

16.1.507

Errorcode 1728: Clearing date in future not allowed ............... 281

Errorcode 1729: The data are administered by SAP ............... 281

Errorcode 1731: Selection crit.or values wrong (■■■■■) ......... 281

Errorcode 1732: Sorting wrong (■■■■■) ................................. 282

Errorcode 1733: The data must not be changed ..................... 282

Errorcode 1734: Last data record not allowed ......................... 282

Errorcode 1735: Report file is not available............................. 282

Errorcode 1736: Access blocked to settled data. .................... 283

Errorcode 1737: Report alr.available in report config. ............. 283

Errorcode 1738: Report alr. avail. as terminal report ............... 283

Errorcode 1739: Data of monthly period partly deleted ........... 284

Errorcode 1740: Period must not be deleted ........................... 284

Errorcode 1741: Absence is already allowed .......................... 284

Errorcode 1742: Either account balance or modification ......... 284

Errorcode 1785: Person has not logged on ............................. 284

Errorcode 1788: Max.no.of OPs that c.be log.on reached ....... 285

Errorcode 1796: Data record has alr. been processed ............ 285

Errorcode 1800: Time zone is assigned to access profile ....... 285

Errorcode 1801: Time zone is assigned to opening hours ....... 286

Errorcode 1802: Time zone is assigned to except.author. ....... 286

Errorcode 1803: No authorization f.responsibility area ............ 286

Errorcode 1804: Access group is assigned to access ............. 286

Errorcode 1805: Access alr.avail. f. reader at terminal ............ 286

Errorcode 1806: Active ID card already available .................... 287

Errorcode 1807: Person has alr.activated normal IDcard ........ 287

Errorcode 1808: IDcard is active for other pers. in PZE .......... 287

Errorcode 1809: Validity date coincides .................................. 287

Errorcode 1810: Reader 1 is reserved for PZE terminal .......... 288

Errorcode 1811: Access is not available ................................. 288

Errorcode 1812: Accesses of security gate at same term. ...... 288

Errorcode 1813: Not authorized for all data records ................ 288

Errorcode 1814: Sync. PNR->KNR

■■■■■■■■■■■■■■■■■■■■■■ ............................................................. 289

16.1.508

16.1.509

16.1.510

Errorcode 1815: Reader is already used at this terminal ......... 289

Errorcode 1850: Resulting order has invalid number .............. 289

Errorcode 1851: Order header not available ........................... 289

SIS-MWV_30.docx

Version: 1.5.19608

Page 18 of 477

MES Weaver

Errorcode 1852: Tool data have not been saved .................... 290

Errorcode 1854: OP has not been saved ................................ 290

Errorcode 1855: Target data record is alr. available ................ 290

Errorcode 1859: OP must not be a split master ...................... 291

Errorcode 1860: OP must not be an OP of a split OP ............. 291

Errorcode 1861: OP must not be a collective OP .................... 291

Errorcode 1862: OP must not be an OP of a collective OP ..... 292

Errorcode 1864: Collective OP does not exist ......................... 292

Errorcode 1865: Stated COP is no collective OP .................... 292

Errorcode 1866: Stated OP is no OP of collective OP ............. 293

Errorcode 1867: OP must not be split ..................................... 293

Errorcode 1868: Max. number of splits of OP exceeded ......... 293

Errorcode 1869: Max. number of splits exceeded ................... 294

Errorcode 1870: Inspection plan is already available .............. 294

Errorcode 1871: Status is not available ................................... 294

Errorcode 1872: Article is not available ................................... 295

Errorcode 1873: Customer is not available ............................. 295

Errorcode 1874: Inspection plan is already active ................... 295

Errorcode 1875: Inspection plan has alr. been released ......... 296

Errorcode 1876: Inspect.characteristic is not available ........... 296

Errorcode 1877: Inspection station is not available ................. 296

Errorcode 1878: Gage is not available .................................... 297

Errorcode 1879: Inspection group is not available................... 297

Errorcode 1880: Test unit is not defined ................................. 297

Errorcode 1881: Tool number is not available ......................... 298

Errorcode 1882: Area is not available ..................................... 298

Errorcode 1883: Supplier is not available ................................ 298

Errorcode 1884: Canceled inspection order is available.......... 298

Errorcode 1885: Insp.plan not found for insp.requirement ....... 299

Errorcode 1886: Serial determination failed ............................ 299

Errorcode 1887: Insp. order has already been canceled ......... 300

Errorcode 1888: Insp.plan not found for insp.requirement ....... 300

Errorcode 1889: IPL is active/insp. requirement found ............ 300

Errorcode 1890: Gage is already in use .................................. 301

Errorcode 1891: Entry is already in use .................................. 301

Errorcode 1892: Insp.character.is not available for IPL ........... 301

16.1.511

16.1.512

16.1.513

16.1.514

16.1.515

16.1.516

16.1.517

16.1.518

16.1.519

16.1.520

16.1.521

16.1.522

16.1.523

16.1.524

16.1.525

16.1.526

16.1.527

16.1.528

16.1.529

16.1.530

16.1.531

16.1.532

16.1.533

16.1.534

16.1.535

16.1.536

16.1.537

16.1.538

16.1.539

16.1.540

16.1.541

16.1.542

16.1.543

16.1.544

16.1.545

16.1.546

SIS-MWV_30.docx

Version: 1.5.19608

Page 19 of 477

MES Weaver

Errorcode 1893: Inspection plan has not been released ......... 302

Errorcode 1894: Insp.requirement is already available............ 302

Errorcode 1895: Inspection requirement is not available ......... 302

Errorcode 1896: Insp. order has already been canceled ......... 303

Errorcode 1897: Insp. order has already been canceled ......... 303

Errorcode 1898: Insp. order has already been canceled ......... 303

Errorcode 1899: Insp. order has already been canceled ......... 304

Errorcode 1900: Premium group invalid .................................. 304

Errorcode 1910: Time tick.from prev.month can't b.postp. ...... 304

Errorcode 1911: Bonus reason not available .......................... 305

Errorcode 1912: Indicate person or premium group ................ 305

Errorcode 1913: Premium area invalid .................................... 305

Errorcode 1914: Used in HR master data ............................... 306

Errorcode 1915: Used in PZE wage type booking ................... 306

Errorcode 1916: Used in ADE log message ............................ 306

Errorcode 1917: Used in LLE results ...................................... 306

Errorcode 1918: Used in LLE bonuses/deductions ................. 307

Errorcode 1919: Used in premium groups............................... 307

Errorcode 1920: Used in assignment of premium groups ........ 307

Errorcode 1921: Used in assignment of premium area ........... 308

Errorcode 1923: Not authorized for sequence/condition .......... 308

Errorcode 1950: N.poss.to change OP logon t.staff logon ....... 308

Errorcode 1951: N.poss.to change staff logon to OP logon ..... 309

Errorcode 1952: End date less than start date ........................ 309

Errorcode 1954: N.poss. to change cancelation message ...... 309

Errorcode 1955: Not possible to change original message ..... 310

Errorcode 1956: Par.conf.n.alterable with curr.run.scen.......... 310

Errorcode 1957: Record type not alterable.............................. 310

Errorcode 1958: Data for OP,MNR and period alr. exists ........ 311

Errorcode 1970: OP is no split OP .......................................... 311

Errorcode 1971: Min. no. of splits not reached ........................ 311

Errorcode 1984: Order has been technically completed .......... 312

Errorcode 1985: Proport.targ. qty./partitioning incorr. .............. 312

Errorcode 1986: Operation cannot be deleted ........................ 312

Errorcode 1987: Operation cannot be changed ...................... 312

Errorcode 1989: Max.number of orders exceeded for prio ...... 313

16.1.547

16.1.548

16.1.549

16.1.550

16.1.551

16.1.552

16.1.553

16.1.554

16.1.555

16.1.556

16.1.557

16.1.558

16.1.559

16.1.560

16.1.561

16.1.562

16.1.563

16.1.564

16.1.565

16.1.566

16.1.567

16.1.568

16.1.569

16.1.570

16.1.571

16.1.572

16.1.573

16.1.574

16.1.575

16.1.576

16.1.577

16.1.578

16.1.579

16.1.580

16.1.581

16.1.582

SIS-MWV_30.docx

Version: 1.5.19608

Page 20 of 477

MES Weaver

Errorcode 1990: Order header cannot be deleted ................... 313

Errorcode 1991: Order header cannot be changed ................. 313

Errorcode 1993: Error in formula calculation for times ............ 314

Errorcode 1994: OP not subj.to comparison of targ.qty. .......... 314

Errorcode 1995: Operation has already been scheduled ........ 314

Errorcode 1996: Batch job is already running ......................... 314

Errorcode 1997: Order type is not equal ................................. 315

Errorcode 1998: Order model not available............................. 315

Errorcode 2000: An U/E record alr. exists in period ................ 315

Errorcode 2001: Wrong sequence of OP logon ....................... 315

Errorcode 2002: Wrong scheduling sequence at machine ...... 316

Errorcode 2003: Not possible to log OP on to group ............... 316

Errorcode 2004: Status of preceding OP not allowed .............. 317

Errorcode 2007: Production variant not found for OP .............. 317

Errorcode 2011: Reserved batch has not been logged on ...... 317

Errorcode 2012: Batch has been reserved f.another order ...... 318

Errorcode 2013: Quantity is missing for an output batch ......... 318

Errorcode 2020: Weight of roll has alr. been recorded ............ 318

Errorcode 2021: Roll alr. assigned to pallet ■■■■■■■■■■ ...... 319

Errorcode 2022: Usage decision alr. available f.order ............. 319

Errorcode 2023: Usage decision alr. available f. batch............ 319

Errorcode 2024: Usage decision is not valid ........................... 320

Errorcode 2025: Batch is still active ........................................ 320

Errorcode 2026: Operation is still running ............................... 320

Errorcode 2027: Processing mode is invalid ........................... 320

Errorcode 2028: Roll has alr. been defined as scrap ............... 321

Errorcode 2029: A quantity blancing must be done ................. 321

Errorcode 2030: Carrier material has alr.been logged on ........ 321

Errorcode 2031: Bill of material item for mat. invalid ............... 322

Errorcode 2032: Unplanned material runs on machine ........... 322

Errorcode 2034: Batch has alr.been reported as finished ........ 322

Errorcode 2036: Batch has no quantity ................................... 322

Errorcode 2039: Machine is not available ............................... 323

Errorcode 2041: Batch has already been blocked ................... 323

Errorcode 2043: Total cutting width is too large ...................... 323

Errorcode 2046: Batch has alr.been logged on i.adv.f.OP ....... 323

16.1.583

16.1.584

16.1.585

16.1.586

16.1.587

16.1.588

16.1.589

16.1.590

16.1.591

16.1.592

16.1.593

16.1.594

16.1.595

16.1.596

16.1.597

16.1.598

16.1.599

16.1.600

16.1.601

16.1.602

16.1.603

16.1.604

16.1.605

16.1.606

16.1.607

16.1.608

16.1.609

16.1.610

16.1.611

16.1.612

16.1.613

16.1.614

16.1.615

16.1.616

16.1.617

16.1.618

SIS-MWV_30.docx

Version: 1.5.19608

Page 21 of 477

MES Weaver

16.1.619

16.1.620

16.1.621

16.1.622

16.1.623

16.1.624

16.1.625

16.1.626

16.1.627

16.1.628

16.1.629

16.1.630

16.1.631

16.1.632

16.1.633

16.1.634

16.1.635

16.1.636

16.1.637

16.1.638

16.1.639

16.1.640

16.1.641

16.1.642

16.1.643

16.1.644

16.1.645

Errorcode 2047: Batch has not been logged on i.adv.f.OP ...... 324

Errorcode 2048: Input batch found without residual qty........... 324

Errorcode 2051: Scrap reason is not allowed .......................... 324

Errorcode 2069: Data record has not been changed ............... 325

Errorcode 2400: Please state valid characteristic no. .............. 325

Errorcode 2401: Charact.assigned to at least one mach. ........ 325

Errorcode 2402: Characteristic used in at least on IPL ........... 325

Errorcode 2403: Characteristic is not available ....................... 326

Errorcode 2404: Collect.is curr.active at meas.channel........... 326

Errorcode 2405: Max.no. of meas.chan.per mach.reached ..... 326

Errorcode 2406: Coll.w.assignm.active at 1 mach.at least ...... 326

Errorcode 2407: Select machine, article or tool no.! ................ 327

Errorcode 2408: Please indicate valid inspect. plan no. .......... 327

Errorcode 2409: Please indicate valid insp.plan version ......... 327

Errorcode 2410: N.possible,insp.plan has been productive ..... 328

Errorcode 2411: Invalid reference has been indicated ............ 328

Errorcode 2412: Please state valid process intervent.no. ........ 328

Errorcode 2413: Process intervent.no.hasn't been stated ....... 329

Errorcode 2415: Channel type not supported .......................... 329

Errorcode 2416: PDV Event not set ........................................ 329

Errorcode 2417: Wrong channel data for anonym pparam ...... 330

Errorcode 2418: Invalid channel number ................................ 330

Errorcode 2419: Invalid cycle time .......................................... 330

Errorcode 2420: Invalid channel orientation ............................ 331

Errorcode 2421: Alert not supported ....................................... 331

Errorcode 2422: Machine already assigned to terminal........... 331

Errorcode 2423: MachNo-TermNo-Chan-Combi already

assig  332

16.1.646

Errorcode 2424: MachNo-TermNo-FKey-Combi already

assig  332

16.1.647

16.1.648

16.1.649

16.1.650

16.1.651

16.1.652

Errorcode 2600: Logical system is not available! .................... 332

Errorcode 2601: Logical system already exists! ...................... 333

Errorcode 2602: Configuration n.available f.log.system! ......... 333

Errorcode 2603: Config. alr. exists for logical system.! ............ 333

Errorcode 2604: Distribution model is not available! ............... 333

Errorcode 2605: Distribution model already exists! ................. 334

SIS-MWV_30.docx

Version: 1.5.19608

Page 22 of 477

MES Weaver

16.1.653

16.1.654

16.1.655

16.1.656

16.1.657

16.1.658

16.1.659

16.1.660

16.1.661

16.1.662

16.1.663

16.1.664

Errorcode 2606: Wrong MESTYP ........................................... 334

Errorcode 2607: IDoc not found .............................................. 334

Errorcode 2608: IDoc status not for processing ...................... 335

Errorcode 2609: No processible data found ............................ 335

Errorcode 2610: Wrong segment type .................................... 335

Errorcode 2611: Segment at wrong position in IDoc ............... 335

Errorcode 2612: Error in initialization ...................................... 335

Errorcode 2613: Order cannot be processed .......................... 335

Errorcode 2614: Error when connecting to sap system ........... 336

Errorcode 2615: Incorrect reply from the SAP system ............ 336

Errorcode 2700: There are dependencies (machine table) ..... 336

Errorcode 2701: There are

dependencies(hierarc.assignm.) .......................................................... 336

16.1.665

16.1.666

16.1.667

16.1.668

16.1.669

Errorcode 2702: There are dependencies(transport table) ...... 337

Errorcode 2703: Hier.ID bigger than select.hier.buffer ............ 337

Errorcode 2704: Hier.ID smaller than hier.buffer ..................... 337

Errorcode 2705: Invalid hierarchy ........................................... 338

Errorcode 2707: Reference tab

MAT_MATTYP/LOS_BESTAND .......................................................... 338

16.1.670

Errorcode 2708: String length not equal

C_GEN_FIX/C_FIX ............................................................................. 338

16.1.671

16.1.672

16.1.673

16.1.674

16.1.675

16.1.676

16.1.677

16.1.678

16.1.679

16.1.680

16.1.681

16.1.682

16.1.683

16.1.684

16.1.685

Errorcode 2709: Material type does not exist .......................... 339

Errorcode 2710: Mat.buffers of type F may be assigned ......... 339

Errorcode 2712: Transp.unit occupied by current batch .......... 339

Errorcode 2715: Wrong status ................................................ 339

Errorcode 2716: Filling out the table(qty.,unit,status) .............. 340

Errorcode 2717: Transport unit not available .......................... 340

Errorcode 2718: Material buffer not available .......................... 340

Errorcode 2719: Semi-finished material type n. available ........ 341

Errorcode 2720: Material buffer not connected with PL ........... 341

Errorcode 2721: Assignment not possible (recursion) ............. 341

Errorcode 2722: Destination is still being used ....................... 341

Errorcode 2723: Max. field length exceeded ........................... 342

Errorcode 2724: Max.no.of decimal places exceeded ............. 342

Errorcode 2725: Invalid indexing. Value range! ....................... 342

Errorcode 2726: Invalid input type .......................................... 342

SIS-MWV_30.docx

Version: 1.5.19608

Page 23 of 477

MES Weaver

Errorcode 2727: Display position has alr. been defined .......... 343

Errorcode 2728: Print position has alr. been defined ............... 343

Errorcode 2729: Table does not exist ..................................... 343

Errorcode 2730: There are still dependencies! ........................ 344

Errorcode 2733: Storage location is still being used ................ 344

Errorcode 2734: The reason text is still being used! ................ 344

Errorcode 2801: Order split not possible. ................................ 344

Errorcode 2802: Order must not be a split order ..................... 345

Errorcode 2803: Order mustn't be order of a split order .......... 345

Errorcode 2804: Only allowed for split order ........................... 345

Errorcode 2805: Quick order alphanumer.after 1st digit .......... 345

Errorcode 2807: Status n.alterable as sequence inactive ........ 345

Errorcode 2808: Start date is after end date ........................... 346

Errorcode 2809: Order type n.alterable as order started ......... 346

Errorcode 2810: Value batch management is different ........... 346

Errorcode 2811: Order not allowed for collective OP .............. 347

Errorcode 2812: Order already exists in archive ..................... 347

Errorcode 2813: Activity Code key not defined ....................... 347

Errorcode 2817: Order Type not available .............................. 348

Errorcode 2818: Categorie order type is not equal .................. 348

Errorcode 2901: Is used as source in inspection plan ............. 348

Errorcode 2902: Inspection order has not been found ............ 349

Errorcode 2903: Indicated company not available................... 349

Errorcode 2904: Is used in specification list ............................ 349

Errorcode 2905: Mandatory insp.has not been carried out ...... 350

Errorcode 2906: Calculat. character., no entry possible .......... 350

Errorcode 2907: Measured value is invalid(not plausible) ....... 350

Errorcode 2908: No Q-character. found for preced.roll ........... 351

Errorcode 2909: Preceding order hasn't been completed ....... 351

Errorcode 2910: Measured values handed down are faulty .... 351

Errorcode 2911: The distributor doesn't contain entries .......... 352

Errorcode 2912: Specified measure not distinct ...................... 352

Errorcode 2913: The assessment catalog is active ................. 352

Errorcode 2914: The assessment catalog is used ................... 353

Errorcode 2915: The assessment has been completed .......... 353

Errorcode 2916: The control plan has been released .............. 353

16.1.686

16.1.687

16.1.688

16.1.689

16.1.690

16.1.691

16.1.692

16.1.693

16.1.694

16.1.695

16.1.696

16.1.697

16.1.698

16.1.699

16.1.700

16.1.701

16.1.702

16.1.703

16.1.704

16.1.705

16.1.706

16.1.707

16.1.708

16.1.709

16.1.710

16.1.711

16.1.712

16.1.713

16.1.714

16.1.715

16.1.716

16.1.717

16.1.718

16.1.719

16.1.720

16.1.721

SIS-MWV_30.docx

Version: 1.5.19608

Page 24 of 477

MES Weaver

16.1.722

16.1.723

16.1.724

16.1.725

16.1.726

16.1.727

16.1.728

16.1.729

16.1.730

16.1.731

16.1.732

16.1.733

16.1.734

16.1.735

16.1.736

16.1.737

16.1.738

16.1.739

16.1.740

16.1.741

16.1.742

Errorcode 2917: The control plan is active .............................. 354

Errorcode 2918: Gage is not allowed for mass output ............. 354

Errorcode 2919: Stock is not available .................................... 354

Errorcode 2920: Department not available. ............................. 355

Errorcode 2921: No.of NCU larger than sample size .............. 355

Errorcode 2922: Invalid input type .......................................... 355

Errorcode 2923: Order status does not allow an entry ............ 355

Errorcode 2924: Character. status doesn't allow entry ............ 356

Errorcode 2925: Measured value violates tolerance limit ........ 356

Errorcode 2926: Characteristic has not been defined ............. 356

Errorcode 2927: The gage has become due ........................... 356

Errorcode 2928: The sample number is invalid ....................... 356

Errorcode 2929: The sample number already exists ............... 356

Errorcode 2930: A measured value with this ID exists ............ 357

Errorcode 2931: Simulation OK .............................................. 357

Errorcode 2932: Min. 1 sample has not been completed! ....... 357

Errorcode 2933: This function not supported for input type! .... 357

Errorcode 2934: Maximum of samples reached! ..................... 358

Errorcode 2935: Maximum of samples for number reached! ... 358

Errorcode 2936: Inspection point(s) not finished! .................... 358

Errorcode 2937: Inspection point(s) not finished for

machine! .............................................................................................. 359

16.1.743

16.1.744

16.1.745

16.1.746

16.1.747

16.1.748

16.1.749

16.1.750

16.1.751

16.1.752

16.1.753

16.1.754

16.1.755

16.1.756

Errorcode 2938: Inspection scope incorrect! ........................... 359

Errorcode 2939: Inspection order not finished! ........................ 359

Errorcode 2940: Inspection not finished! ................................. 360

Errorcode 2941: Last Container already reached! ................... 360

Errorcode 2942: Open measures exist! ................................... 360

Errorcode 2943: Invalid Input type must be "AUTOMAT" ........ 360

Errorcode 2944: Wrong specification ...................................... 360

Errorcode 2945: Characteristic, Changing not possible .......... 361

Errorcode 2946: Prod. operation is still logged on ................... 361

Errorcode 2947: Inspection point(s) already finished! ............. 361

Errorcode 2948: Inspection order already finished! ................. 361

Errorcode 2949: Inspection requirem. already finished! .......... 362

Errorcode 2950: Gauge not useable (status)! ......................... 362

Errorcode 2951: Incorrect format of input data! ....................... 362

SIS-MWV_30.docx

Version: 1.5.19608

Page 25 of 477

MES Weaver

16.1.757

16.1.758

16.1.759

16.1.760

16.1.761

16.1.762

16.1.763

16.1.764

16.1.765

16.1.766

16.1.767

16.1.768

16.1.769

16.1.770

16.1.771

16.1.772

16.1.773

16.1.774

16.1.775

16.1.776

16.1.777

16.1.778

16.1.779

16.1.780

16.1.781

Errorcode 2952: No data found in tnt_table_repo!................... 363

Errorcode 2953: Column is_online is not N! ............................ 363

Errorcode 2954: TNT-table is locked by process!.................... 363

Errorcode 2955: TNT-table,lock status is indeterminate! ......... 363

Errorcode 2956: Entry was not found in tnt_headers! ............. 364

Errorcode 2957: TNT-table was not created! .......................... 364

Errorcode 2958: Index of TNT-table was not created! ............. 364

Errorcode 2959: Archiving file was not found! ......................... 365

Errorcode 2960: File transfer was failed! ................................. 365

Errorcode 2961: Reading file was failed! ................................. 365

Errorcode 2962: Reload flag was not updated! ....................... 366

Errorcode 2963: Param for calculation is missing! .................. 366

Errorcode 2964: Error in formula calculation for test result ...... 366

Errorcode 2965: Wrong acquisition workplace ........................ 367

Errorcode 3000: Transaction has already been opened .......... 367

Errorcode 3001: No transaction has been opened .................. 367

Errorcode 3002: DLG error in transaction -> ROLLBACK ....... 368

Errorcode 3003: Exception: Bapicallexecute: no handler ........ 368

Errorcode 3020: Account blocked, logon not possible ............. 368

Errorcode 3021: Not possible. User is logged on .................... 369

Errorcode 3022: Script file is not available. ............................. 369

Errorcode 3023: Script has already been released ................. 369

Errorcode 3024: Syntax error in script file ............................... 369

Errorcode 3025: Runtime error in script file ............................. 370

Errorcode 3026: Pers at date avail co ■■■■ cc

■■■■■■■■■■ ....................................................................................... 370

16.1.782

Errorcode 3027: Person ■■■■■■■■ badge overlap

■■■■■■■■ ........................................................................................... 370

16.1.783

16.1.784

16.1.785

16.1.786

16.1.787

16.1.788

16.1.789

16.1.790

Errorcode 3028: Label type and alias already exists ............... 371

Errorcode 3029: Label type is not available ............................ 371

Errorcode 3030: Label alias is not available ............................ 371

Errorcode 3031: The data must not be deleted ....................... 372

Errorcode 3100: Workflow active.Modification n.possible ........ 372

Errorcode 3102: Configuration has not been indicated ........... 372

Errorcode 3104: Event has not been indicated ....................... 372

Errorcode 3108: Sub event has not been indicated ................. 373

SIS-MWV_30.docx

Version: 1.5.19608

Page 26 of 477

MES Weaver

Errorcode 3109: Workflow is used. Modificat. impossible ........ 373

Errorcode 3200: Invalid or empty resource ............................. 373

Errorcode 3201: Resource not available ................................. 374

Errorcode 3202: Resource(w/o type)several times i.stock ....... 374

Errorcode 3203: Resource list max. depth reached ................ 374

Errorcode 3204: Resource already available .......................... 375

Errorcode 3205: Resource could not be created ..................... 375

Errorcode 3210: Invalid or empty resource status ................... 375

Errorcode 3211: Resource status is not available ................... 376

Errorcode 3212: Resource status is not allowed ..................... 376

Errorcode 3213: No release status available ........................... 376

Errorcode 3214: Resource type is not available ...................... 376

Errorcode 3215: Resource family is not available ................... 377

Errorcode 3216: No status available for logging off res. .......... 377

Errorcode 3217: Product. status f.resource n.available ........... 377

Errorcode 3218: Resource blocked ......................................... 378

Errorcode 3219: Resource is no DNC resource ...................... 378

Errorcode 3220: Resource scheduled or blocked.................... 378

Errorcode 3221: Machine has not been indicated ................... 379

Errorcode 3222: DNC family has not been stated ................... 379

Errorcode 3223: Machine and DNC family do not match ......... 379

Errorcode 3224: Resource cannot be logged on ..................... 380

Errorcode 3225: Status does not allow processing ................. 380

Errorcode 3226: Res.alr.log.on t.this mach.w.this order .......... 380

Errorcode 3227: Res. has been logged on too many times ..... 380

Errorcode 3228: resource <RES> has alr. been logged on ..... 381

Errorcode 3229: Resource has not been logged on ................ 381

Errorcode 3230: End date is smaller than current time ........... 381

Errorcode 3231: Resource is active ........................................ 382

Errorcode 3232: Resource is not active .................................. 382

Errorcode 3233: There are events for the resource ................. 382

Errorcode 3235: Maintenance is not yet in threshold range .... 383

Errorcode 3240: Resource type is not editable ....................... 383

Errorcode 3241: User field key not defined ............................. 383

Errorcode 3242: Resource type is currently being used .......... 383

Errorcode 3243: Resource family is used ............................... 384

16.1.791

16.1.792

16.1.793

16.1.794

16.1.795

16.1.796

16.1.797

16.1.798

16.1.799

16.1.800

16.1.801

16.1.802

16.1.803

16.1.804

16.1.805

16.1.806

16.1.807

16.1.808

16.1.809

16.1.810

16.1.811

16.1.812

16.1.813

16.1.814

16.1.815

16.1.816

16.1.817

16.1.818

16.1.819

16.1.820

16.1.821

16.1.822

16.1.823

16.1.824

16.1.825

16.1.826

SIS-MWV_30.docx

Version: 1.5.19608

Page 27 of 477

MES Weaver

Errorcode 3244: If changed KENN must have prefix U: .......... 384

Errorcode 3245: prod=F may only exist once per type/fam. .... 384

Errorcode 3246: No header record is available ....................... 385

Errorcode 3247: Resource status is in use.............................. 385

Errorcode 3248: Header record of resource is in use .............. 385

Errorcode 3249: Copy of itself is not possible. ........................ 385

Errorcode 3250: The path is not available ............................... 386

Errorcode 3251: Invalid blocking reason ................................. 386

Errorcode 3252: Invalid measure ............................................ 386

Errorcode 3253: Resource is still available in BOM ................. 387

Errorcode 3254: Res.is still being used as component ............ 387

Errorcode 3255: Invalid maintenance ...................................... 387

Errorcode 3256: Maintenance condition is not allowed ........... 387

Errorcode 3257: Resource measure has alr. been recorded ... 388

Errorcode 3259: Status assignments not configurable ............ 388

Errorcode 3260: DNC file has already been assigned ............. 388

Errorcode 3261: Resource is still i.maintenance calendar ....... 389

Errorcode 3262: Maintenance n.possible for resource type .... 389

Errorcode 3263: Family status has become invalid ................. 389

Errorcode 3264: Status alr. assigned for family/type ............... 390

Errorcode 3265: Resource-ID is invalid! .................................. 390

Errorcode 3266: Master resource already exists ..................... 390

Errorcode 3267: Parent and child are master resources ......... 390

Errorcode 3270: Max. no. of fast USRFLD reached ................ 391

Errorcode 3271: N.possible, entry is still being used ............... 391

Errorcode 3272: N.possible,year model is factory calend. ....... 391

Errorcode 3273: N.possible-processing SYSTEM entry .......... 392

Errorcode 3274: Password must not contain user name ......... 392

Errorcode 3275: Password contains insufficient letters ........... 392

Errorcode 3276: Password contains insufficient numbers ....... 392

Errorcode 3277: Passw.contains insuffic.spec.characters ....... 393

Errorcode 3278: Password is altogether too short................... 393

Errorcode 3279: Password contains invalid characters ........... 393

Errorcode 3280: Password violates password history ............. 394

Errorcode 3281: Password history is not available .................. 394

Errorcode 3282: Password has expired .................................. 394

16.1.827

16.1.828

16.1.829

16.1.830

16.1.831

16.1.832

16.1.833

16.1.834

16.1.835

16.1.836

16.1.837

16.1.838

16.1.839

16.1.840

16.1.841

16.1.842

16.1.843

16.1.844

16.1.845

16.1.846

16.1.847

16.1.848

16.1.849

16.1.850

16.1.851

16.1.852

16.1.853

16.1.854

16.1.855

16.1.856

16.1.857

16.1.858

16.1.859

16.1.860

16.1.861

16.1.862

SIS-MWV_30.docx

Version: 1.5.19608

Page 28 of 477

MES Weaver

16.1.863

16.1.864

16.1.865

16.1.866

16.1.867

16.1.868

16.1.869

16.1.870

Errorcode 3283: Password must be changed! ........................ 395

Errorcode 3284: Bill of material level is invalid ........................ 395

Errorcode 3285: Cutting plan not found for order .................... 395

Errorcode 3286: Overall width of web distrib.too small ............ 395

Errorcode 3287: Parent OP is already available ..................... 396

Errorcode 3288: Cutting plan is already active ........................ 396

Errorcode 3299: Material component not found for OP ........... 396

Errorcode 3300: Assignment code must show the value

NUM  396

16.1.871

16.1.872

16.1.873

16.1.874

16.1.875

16.1.876

16.1.877

16.1.878

16.1.879

16.1.880

16.1.881

16.1.882

16.1.883

16.1.884

16.1.885

16.1.886

16.1.887

16.1.888

16.1.889

16.1.890

16.1.891

16.1.892

16.1.893

16.1.894

16.1.895

16.1.896

16.1.897

Errorcode 3301: No. is not within the defined range ................ 397

Errorcode 3302: Number starts with wrong prefix ................... 397

Errorcode 3303: Generat.type P does not generate a No. ...... 397

Errorcode 3304: Active template must not be deleted ............. 398

Errorcode 3400: Parameter InstID not indicated ..................... 398

Errorcode 3401: Installation path not created .......................... 398

Errorcode 3402: Media path not created ................................. 398

Errorcode 3403: Backup path could not be created ................ 399

Errorcode 3404: Files have already been installed .................. 399

Errorcode 3405: Log file could not be created ......................... 399

Errorcode 3406: Source could not be opened ......................... 400

Errorcode 3420: Do not delete or change stand. config. ......... 400

Errorcode 3421: Do not delete standard configuration ............ 400

Errorcode 3430: Invalid signature 1 or level 1 ......................... 400

Errorcode 3431: Invalid signature 2 or level 2 ......................... 401

Errorcode 3432: Invalid sig.1 and 2 or level 1 and 2 ............... 401

Errorcode 3433: Input for action necessary ............................. 401

Errorcode 3434: No dialog data extisting ................................ 401

Errorcode 3500: Invalid processing flag .................................. 402

Errorcode 3501: Invalid variant ............................................... 402

Errorcode 3502: Invalid BAPI-POS ......................................... 402

Errorcode 3503: Invalid field position ...................................... 402

Errorcode 3504: Invalid formula position ................................. 403

Errorcode 3505: Invalid basic configuration ............................ 403

Errorcode 3506: Invalid segment configuration ....................... 403

Errorcode 3507: Invalid field configuration .............................. 404

Errorcode 3508: Invalid conversion function ........................... 404

SIS-MWV_30.docx

Version: 1.5.19608

Page 29 of 477

MES Weaver

Errorcode 3509: Acronym has already been assigned ............ 404

Errorcode 3510: Invalid formula .............................................. 405

Errorcode 3511: Invalid transaction flag .................................. 405

Errorcode 3512: Transact.not avail.or not yet processed ........ 405

Errorcode 3513: Transaction archived or not available ........... 406

Errorcode 3514: Initial download is not allowed. ..................... 406

Errorcode 3602: Main OP defined several times ..................... 406

Errorcode 3603: Cut number has been defined sev.times ....... 406

Errorcode 3604: Sum of cut widths > overall width ................. 407

Errorcode 3605: Active orders cannot be changed ................. 407

Errorcode 3606: No header rec. available for cut layout.......... 407

Errorcode 3608: Cutting plan alr.avail. for order ...................... 407

Errorcode 3612: Batch has alr.been packed in container ........ 407

Errorcode 3613: Batch has already been deleted ................... 407

Errorcode 3631: Material width of batch is too small ............... 408

Errorcode 3636: Batch is blocked due to quality reasons ........ 408

Errorcode 3638: Article not allowed for package ..................... 408

Errorcode 3639: Roll width not allowed for package ............... 408

Errorcode 3640: Order not allowed for package ...................... 409

Errorcode 3645: The user password expires ........................... 409

Errorcode 3646: Signature(s) required .................................... 409

Errorcode 3647: Higher authorization level required ............... 409

Errorcode 3648: Signature invalid ........................................... 410

Errorcode 3649: Invalid error code .......................................... 410

Errorcode 3650: Material availability exceeded ....................... 410

Errorcode 3653: The handling unit has assigned batches ....... 411

Errorcode 3654: No batches have been assigned to HU ......... 411

Errorcode 3655: Batch is not assigned to handling unit........... 411

Errorcode 3656: Quantity of batch has alr. been recorded ...... 411

Errorcode 3657: Unplaned Material is not allowed .................. 412

Errorcode 3658: Scrap quantity for batch not allowed ............. 412

Errorcode 3659: There is no serial number for quantity........... 412

Errorcode 3660: Serial number is blocked .............................. 412

Errorcode 3661: Webservice communication error ................. 413

Errorcode 3662: Material reservation is not planned ............... 413

Errorcode 3663: Material for BOM cannot be logged on ......... 413

16.1.898

16.1.899

16.1.900

16.1.901

16.1.902

16.1.903

16.1.904

16.1.905

16.1.906

16.1.907

16.1.908

16.1.909

16.1.910

16.1.911

16.1.912

16.1.913

16.1.914

16.1.915

16.1.916

16.1.917

16.1.918

16.1.919

16.1.920

16.1.921

16.1.922

16.1.923

16.1.924

16.1.925

16.1.926

16.1.927

16.1.928

16.1.929

16.1.930

16.1.931

16.1.932

16.1.933

SIS-MWV_30.docx

Version: 1.5.19608

Page 30 of 477

MES Weaver

Errorcode 3664: The working status not exist ......................... 414

Errorcode 3665: Material type n. available .............................. 414

Errorcode 3666: Input material consumed! ............................. 414

Errorcode 3667: Coilno. not assigned ..................................... 415

Errorcode 3668: OP has no box quantity ................................ 415

Errorcode 3669: ATK double scan .......................................... 415

Errorcode 3702: Operation not available ................................. 416

Errorcode 3704: Exclusion list contains password .................. 416

Errorcode 3705: The password is not correct .......................... 416

Errorcode 3706: annotation too long ....................................... 416

Errorcode 4000: PCC: Load Driver ......................................... 417

Errorcode 4001: PCC: Channel not configured ....................... 417

Errorcode 4002: PCC: Channel Write Error ............................ 417

Errorcode 4003: PCC: Channel Read Error ............................ 417

Errorcode 4004: PCC: Channel not active .............................. 417

Errorcode 4005: PCC: Error event .......................................... 418

Errorcode 4100: workplace Ressource cant be logged off ...... 418

Errorcode 4101: Requirement Ressource in parts list ............. 418

Errorcode 4102: assigned resource is invalid .......................... 418

Errorcode 4103: res. is not defined as req. resource ............... 419

Errorcode 4104: invalid reference resource ............................ 419

Errorcode 4105: no free explicit ressource .............................. 419

Errorcode 4106: ressource has no explicit booking ................. 419

Errorcode 4107: Requirement ressource cant be logged on ... 420

Errorcode 4108: Ressource already referenced ...................... 420

Errorcode 4109: Missing logons for req. ressource ................. 420

Errorcode 4110: Resource is a req. resource assigned........... 421

Errorcode 4111: Invalid maintenance duration ........................ 421

Errorcode 4112: Invalid maintenance quantity ........................ 421

Errorcode 4113: No activ maintenance notification ................. 421

Errorcode 4114: Could not create maintenance number ......... 421

Errorcode 4115: Could not create a maintenance order .......... 422

Errorcode 4116: IH number not available ................................ 422

Errorcode 4117: Cavity assignment to resource is invalid ....... 422

Errorcode 4118: Status type is reserved for the system .......... 422

Errorcode 4119: Status type does not exist............................. 423

16.1.934

16.1.935

16.1.936

16.1.937

16.1.938

16.1.939

16.1.940

16.1.941

16.1.942

16.1.943

16.1.944

16.1.945

16.1.946

16.1.947

16.1.948

16.1.949

16.1.950

16.1.951

16.1.952

16.1.953

16.1.954

16.1.955

16.1.956

16.1.957

16.1.958

16.1.959

16.1.960

16.1.961

16.1.962

16.1.963

16.1.964

16.1.965

16.1.966

16.1.967

16.1.968

16.1.969

SIS-MWV_30.docx

Version: 1.5.19608

Page 31 of 477

MES Weaver

16.1.970

16.1.971

16.1.972

16.1.973

16.1.974

16.1.975

16.1.976

16.1.977

16.1.978

16.1.979

16.1.980

16.1.981

16.1.982

16.1.983

16.1.984

16.1.985

16.1.986

16.1.987

16.1.988

16.1.989

16.1.990

16.1.991

16.1.992

16.1.993

16.1.994

16.1.995

16.1.996

16.1.997

16.1.998

16.1.999

Errorcode 4120: Status text is invalid ...................................... 423

Errorcode 4121: Combination RES/RESFAM is invalid ........... 423

Errorcode 4122: Download ist not possible ............................. 424

Errorcode 4123: Upload ist not possible ................................. 424

Errorcode 4124: stroke booking is not possible ....................... 424

Errorcode 4200: data already reloaded ................................... 424

Errorcode 4201: data already reloaded ................................... 425

Errorcode 4202: cannot open reloadfile .................................. 425

Errorcode 4203: Error exporting file to customer dir. ............... 425

Errorcode 4204: Error reading metadata ................................. 425

Errorcode 7000: Resource is in use! ....................................... 425

Errorcode 7003: The filename of the image is too long. .......... 425

Errorcode 7004: Temporary users are not alterable. ............... 426

Errorcode 7005: Autologin user manually login forbidden ....... 426

Errorcode 7007: Person has no qualification for OP ............... 426

Errorcode 7008: Logged on person no qualification for OP ..... 427

Errorcode 7009: Person no qualification for logged on OP ...... 427

Errorcode 7010: Clearing without posting is not possible ........ 428

Errorcode 7011: Change of Batch Number is not allowed ....... 428

Errorcode 7012: Duplicate component not allowed. ................ 428

Errorcode 7013: Carrier status not (2) EMPTY ....................... 428

Errorcode 7014: Original booking is canceled ......................... 429

Errorcode 7015: Reversal booking not editable. ..................... 429

Errorcode 7016: Booking is canceled and not editable. .......... 429

Errorcode 7017: Debited bookings are not editable. ............... 429

Errorcode 7018: Wrong workplace, no allocated time. ............ 430

Errorcode 7019: Possibly teamwork! ....................................... 430

Errorcode 7020: One/more previous AGs are not complete .... 430

Errorcode 7021: AG already been registered in package ........ 430

Errorcode 7022: AG has wrong time type specification. .......... 431

16.1.1000

Errorcode 7023: No package registered on the machine. ....... 431

16.1.1001

Errorcode 7024: Entry is enabled. ........................................... 431

16.1.1002

Errorcode 7025: Error by calculating remaining effort ............. 431

16.1.1003

Errorcode 7026: Workflow could not be started. ..................... 431

16.1.1004

Errorcode 7027: Component not reserved. ............................. 432

16.1.1005

Errorcode 7028: Target qty. smaller than loaded. qty. ............. 432

SIS-MWV_30.docx

Version: 1.5.19608

Page 32 of 477

MES Weaver

16.1.1006

Errorcode 7029: No melting aggregate found ......................... 432

16.1.1007

Errorcode 7030: No melting operation found ........................... 432

16.1.1008

Errorcode 7031: No preceding operation found ...................... 432

16.1.1009

Errorcode 7032: Melting operation already assigned .............. 432

16.1.1010

Errorcode 7033: Incorrect component type ............................. 433

16.1.1011

Errorcode 7034: Component is already available .................... 433

16.1.1012

Errorcode 7035: article do not match ...................................... 433

16.1.1013

Errorcode 7036: Material in output buffer not distinct .............. 433

16.1.1014

Errorcode 7037: OP is not in status prepared ......................... 433

16.1.1015

Errorcode 7038: Batch not in material buffer ........................... 434

16.1.1016

Errorcode 7039: Resource not in material buffer ..................... 434

16.1.1017

Errorcode 7040: Invalid material buffer type ............................ 434

16.1.1018

Errorcode 7041: Batch transport status not allowed ................ 434

16.1.1019

Errorcode 7042: Not allowed run through batch status ........... 434

16.1.1020

Errorcode 7043: Work plan not found ..................................... 435

16.1.1021

Errorcode 7044: Transportation order already assigned ......... 435

16.1.1022

Errorcode 7045: Capacity order type not set ........................... 435

16.1.1023

Errorcode 7046: Kanban order type not set ............................ 435

16.1.1024

Errorcode 7047: Kanban resource status not configured ........ 435

16.1.1025

Errorcode 7048: Kanban order is already available ................. 436

16.1.1026

Errorcode 7049: Capacity order not available ......................... 436

16.1.1027

Errorcode 7050: Max. no. of kanban reached ......................... 436

16.1.1028

Errorcode 7051: Collective batch already running ................... 436

16.1.1029

Errorcode 7052: Child batches have wrong status .................. 436

16.1.1030

Errorcode 7053: Output batch change not allowed ................. 436

16.1.1031

Errorcode 7054: Batch is no collective batch .......................... 437

16.1.1032

Errorcode 7055: Batch has no childs ...................................... 437

16.1.1033

Errorcode 7056: Input file not available ................................... 437

16.1.1034

Errorcode 7060: File could not be saved at the dest. .............. 437

16.1.1035

Errorcode 7061: Destination does not exist ............................. 437

16.1.1036

Errorcode 7062: Dir. could not be created at the dest. ............ 438

16.1.1037

Errorcode 7063: File could not be renamed. ........................... 438

16.1.1038

Errorcode 7064: File could not be read on the HYDRA serv ... 438

16.1.1039

Errorcode 7065: Invalid combination of doc and link type ....... 438

16.1.1040

Errorcode 7066: Access to the directory is not possible .......... 438

16.1.1041

Errorcode 7067: For this record, no text is entered. ................ 439

SIS-MWV_30.docx

Version: 1.5.19608

Page 33 of 477

MES Weaver

16.1.1042

Errorcode 7068: Documents entry does not exist.................... 439

16.1.1043

Errorcode 7069: Collective not available ................................. 439

16.1.1044

Errorcode 7070: The Collective batch is not free .................... 439

16.1.1045

Errorcode 7071: Not allowed batch status .............................. 439

16.1.1046

Errorcode 7072: serial number could not be created ............... 439

16.1.1047

Errorcode 7073: serial number is required .............................. 440

16.1.1048

Errorcode 7074: serial component cannot be logged on ......... 440

16.1.1049

Errorcode 7075: invalid classification ...................................... 440

16.1.1050

Errorcode 7076: SNR does not match the input component ... 441

16.1.1051

Errorcode 7077: serial component cannot be logged off ......... 441

16.1.1052

Errorcode 7078: The coll. batch has assigned batches ........... 441

16.1.1053

Errorcode 7079: already a existing deleted RESSTA .............. 442

16.1.1054

Errorcode 7080: set status deleted only if col. blocked ........... 442

16.1.1055

Errorcode 7081: The TU is not reserved for running OP ......... 442

16.1.1056

Errorcode 7082: The TU could not be logged on .................... 442

16.1.1057

Errorcode 7083: Posting only at longest running OP ............... 443

16.1.1058

Errorcode 7084: Op. already logged on at given workplace .... 443

16.1.1059

Errorcode 7085: Target partitioning is required ....................... 443

16.1.1060

Errorcode 7086: There are open escalations. ......................... 444

16.1.1061

Errorcode 7087: Material type do not match ........................... 444

16.1.1062

Errorcode 7088: Batch class must be yield ............................. 444

16.1.1063

Errorcode 7089: Missing quantity unit.. ................................... 445

16.1.1064

Errorcode 7090: Missing mandatory parameter batch id ......... 445

16.1.1065

Errorcode 7091: Missing mandatory parameter shift end ........ 445

16.1.1066

Errorcode 7092: Missing mandatory parameter shift end ........ 446

16.1.1067

Errorcode 7093: Shift begin not possible ................................ 446

16.1.1068

Errorcode 7094: Shift end is not possible ................................ 446

16.1.1069

Errorcode 7095: Missing mandatory parameter batch class .... 447

16.1.1070

Errorcode 7096: Remaining quantity is not allowed ................ 447

16.1.1071

Errorcode 7097: No counter allowed for MPL type manuell .... 447

16.1.1072

Errorcode 7098: Only batch class yield is allowed .................. 448

16.1.1073

Errorcode 7099: No Shift: No status change possible ............. 448

16.1.1074

Errorcode 7100: Not a valid required resource ........................ 448

16.1.1075

Errorcode 7101: Not enough companay licenses avail. .......... 449

16.1.1076

Errorcode 7102: Not enough companay licenses avail. .......... 449

16.1.1077

Errorcode 7103: Not enough companay licenses avail. .......... 449

SIS-MWV_30.docx

Version: 1.5.19608

Page 34 of 477

MES Weaver

16.1.1078

Errorcode 7104: Not enough company licenses avail. ............ 449

16.1.1079

Errorcode 7105: License service not available ........................ 450

16.1.1080

Errorcode 7106: The batch quality status is invalid ................. 450

16.1.1081

Errorcode 7107: A negative consumption is not allowed. ........ 450

16.1.1082

Errorcode 7108: Batch already archived ................................. 451

16.1.1083

Errorcode 7109: The max. number of batches is exceeded .... 451

16.1.1084

Errorcode 7110: msl attributes are different ............................ 451

16.1.1085

Errorcode 7111: msl time is not defined .................................. 452

16.1.1086

Errorcode 7112: requested amount of data is too large .......... 452

16.1.1087

Errorcode 7113: ReferenceAggr. already assigned ................. 452

16.1.1088

Errorcode 7114: Passwords does not match ........................... 452

16.1.1089

Errorcode 7115: Password processing ................................... 453

16.1.1090

Errorcode 7116: Not enough company licenses avail. ............ 453

16.1.1091

Errorcode 7120: Missing mandatory param. material buffer .... 453

16.1.1092

Errorcode 7121: Missing mandat. param. consumpt. quant. ... 454

16.1.1093

Errorcode 7122: Missing mandatory parameter material ......... 454

16.1.1094

Errorcode 7123: Group is no capacity group ........................... 454

16.1.1095

Errorcode 7124: Validity date causes gap in versions ............. 454

16.1.1096

Errorcode 7125: Incorrect length of batch number .................. 455

16.1.1097

Errorcode 7126: Invalid machine number ............................... 455

16.1.1098

Errorcode 7127: Invalid character in machine number ............ 455

16.1.1099

Errorcode 7128: Invalid character in resource ......................... 455

16.1.1100

Errorcode 7129: Output lot with quantity 0 not allowed. .......... 456

16.1.1101

Errorcode 7130: Output lot with quantity 0 not allowed. .......... 456

16.2  Local error messages at the terminal .............................................................. 456

16.2.1  Overview ............................................................................................. 456

16.2.2  Error when saving the machine label ................................................... 456

16.2.3  Error when saving the machine status ................................................. 457

16.2.4  Error 901 ............................................................................................. 457

16.2.5  Error 902 ............................................................................................. 457

16.2.6  Error 903 ............................................................................................. 457

16.2.7  Error 904 ............................................................................................. 457

16.2.8  Error 905 ............................................................................................. 457

16.2.9  Error 906 (DOS terminals only)............................................................ 457

16.2.10 Error 907 (DOS terminals only)............................................................ 457

16.2.11 Error 908 (DOS terminals only)............................................................ 458

SIS-MWV_30.docx

Version: 1.5.19608

Page 35 of 477

MES Weaver

16.2.12 Error 909 ............................................................................................. 458

16.2.13 Error 951 ............................................................................................. 458

16.2.14 Error code 10001 ................................................................................. 458

16.2.15 Error code 10002 ................................................................................. 458

16.2.16 Error code 10003 ................................................................................. 458

16.2.17 Error code 10004 ................................................................................. 458

16.2.18 Error code 10005 ................................................................................. 459

16.2.19 Error code 10006 ................................................................................. 459

16.2.20 Error code 10007 ................................................................................. 459

16.2.21 Error code 10008 ................................................................................. 459

16.2.22 Error code 10009 ................................................................................. 459

16.2.23 Error code 10010 ................................................................................. 460

16.2.24 Error code 10011 ................................................................................. 460

16.2.25 Error code 10012 ................................................................................. 460

16.2.26 Error code 10013 ................................................................................. 460

16.2.27 Error code 10014 ................................................................................. 460

16.2.28 Error code 10015 ................................................................................. 460

16.2.29 Error code 10016 ................................................................................. 461

16.2.30 Error code 10017 ................................................................................. 461

16.2.31 Error code 10018 ................................................................................. 461

16.2.32 Error code 10019 ................................................................................. 461

16.2.33 Error code 10020 ................................................................................. 461

16.2.34 Error code 10021 ................................................................................. 462

16.2.35 Error code 10022 ................................................................................. 462

16.2.36 Error code 10023 ................................................................................. 462

16.2.37 Error code 18001 ................................................................................. 462

16.2.38 Error code 19001 ................................................................................. 462

16.2.39 Error code 20001 ................................................................................. 462

16.2.40 Error code 20002 ................................................................................. 463

16.2.41 Error code 20003 ................................................................................. 463

16.2.42 Error code 20004 ................................................................................. 463

16.2.43 Error code 20005 ................................................................................. 463

16.2.44 Error code 20006 ................................................................................. 463

16.2.45 Error code 20007 ................................................................................. 464

16.2.46 Error code 20008 ................................................................................. 464

16.2.47 Error code 20009 ................................................................................. 464

SIS-MWV_30.docx

Version: 1.5.19608

Page 36 of 477

MES Weaver

16.2.48 Error code 20010 ................................................................................. 464

16.2.49 Error code 20011 ................................................................................. 464

16.2.50 Error code 20012 ................................................................................. 464

16.2.51 Error code 20013 ................................................................................. 465

16.2.52 Error code 20014 ................................................................................. 465

16.2.53 Error code 20015 ................................................................................. 465

16.2.54 Error code 20016 ................................................................................. 465

16.2.55 Error code 20017 ................................................................................. 465

16.2.56 Error code 29801 ................................................................................. 466

16.2.57 Error code 30001 ................................................................................. 466

16.2.58 Error code 30002 ................................................................................. 466

16.2.59 Error code 30003 ................................................................................. 466

16.2.60 Error code 30004 ................................................................................. 466

16.2.61 Error code 30005 ................................................................................. 466

16.2.62 Error code 39801 ................................................................................. 467

16.2.63 Error code 39802 ................................................................................. 467

16.2.64 Error code 60001 ................................................................................. 467

16.2.65 Error code 60002 ................................................................................. 467

16.2.66 Error code 60003 ................................................................................. 467

16.2.67 Error code 60004 ................................................................................. 468

16.2.68 Error code 60005 ................................................................................. 468

16.2.69 Error code 60006 ................................................................................. 468

16.2.70 Error code 60007 ................................................................................. 468

16.2.71 Error code 60008 ................................................................................. 468

16.2.72 Error code 60009 ................................................................................. 468

16.2.73 Error code 60010 ................................................................................. 469

16.2.74 Error code 60011 ................................................................................. 469

16.2.75 Error code 60012 ................................................................................. 469

16.2.76 Error code 70001 ................................................................................. 469

16.2.77 Error code 70002 ................................................................................. 469

16.2.78 Error code 70003 ................................................................................. 470

16.2.79 Error code 70004 ................................................................................. 470

16.2.80 Error code 70005 ................................................................................. 470

16.2.81 Error code 70006 ................................................................................. 470

16.2.82 Error code 70007 ................................................................................. 470

16.2.83 Error code 70008 ................................................................................. 470

SIS-MWV_30.docx

Version: 1.5.19608

Page 37 of 477

MES Weaver

16.2.84 Error code 70009 ................................................................................. 471

16.2.85 Error code 70010 ................................................................................. 471

16.2.86 Error code 70011 ................................................................................. 471

16.2.87 Error code 70012 ................................................................................. 471

16.2.88 Error code 70013 ................................................................................. 471

16.2.89 Error code 70014 ................................................................................. 472

16.2.90 Error code 70015 ................................................................................. 472

16.2.91 Error code 70016 ................................................................................. 472

16.2.92 Error code 70017 ................................................................................. 472

16.2.93 Error code 70018 ................................................................................. 472

16.2.94 Error code 70019 ................................................................................. 472

16.2.95 Error code 70020 ................................................................................. 473

16.2.96 Error code 70021 ................................................................................. 473

16.2.97 Error code 81001 ................................................................................. 473

16.2.98 Error code 81002 ................................................................................. 473

16.2.99 Error code 81003 ................................................................................. 473

16.2.100

16.2.101

16.2.102

16.2.103

16.2.104

16.2.105

16.2.106

16.2.107

16.2.108

16.2.109

16.2.110

16.2.111

16.2.112

16.2.113

16.2.114

16.2.115

16.2.116

16.2.117

16.2.118

Error code 81004 .................................................................... 474

Error code 81005 .................................................................... 474

Error code 81006 .................................................................... 474

Error code 81007 .................................................................... 474

Error code 81008 .................................................................... 474

Error code 81009 .................................................................... 474

Error code 81010 .................................................................... 475

Error code 81011 .................................................................... 475

Error code 81012 .................................................................... 475

Error code 81013 .................................................................... 475

Error code 81014 .................................................................... 475

Error code 81015 .................................................................... 476

Error code 81016 .................................................................... 476

Error code 81017 .................................................................... 476

Error code 82001 .................................................................... 476

Error code 82002 .................................................................... 476

Error code 82003 .................................................................... 476

Error code 82004 .................................................................... 477

Error code 82005 .................................................................... 477

SIS-MWV_30.docx

Version: 1.5.19608

Page 38 of 477

MES Weaver

1

 MES Weaver 3.0 - Overview

Purpose

MES Weaver 3.0 is the basic system for the HYDRA application.

The basic system offers the following interfaces:

o

Interface to a relational database system

o

Interface for the business logic

o

Interface for the client applications

o  Special interfaces for applications, like for example the PDM "Production Data Manager" interface

Implementation considerations

The HYDRA basic system is the general basic integral part of any HYDRA installation.

Integration

-

Features

o  Supports the databases listed in the compatibility list

o  Supports the operating systems listed in the compatibility list

o  HYDRA data pool for configuration, master and movement data

o  Basis for communicating with systems offered by manufacturers

o  Comprehensive  authorization  concept:  Login,  user  administration,

function  and  cost  center

authorizations as well as responsibility areas, user profiles and password policies

o  Terminal configuration

o  Administrative functions:

- Job administration

- Interface communication

- Administration tools for the HYDRA client

- Download functions for program updates belonging to HYDRA consoles and -terminals

System check lists

SIS-MWV_30.docx

Version: 1.5.19608

Page 39 of 477

MES Weaver

o  Other functions:

- Plausibility checks for actual entered data

- Supports user exits/ customer exits

- Basis for data storage/ archiving

- Ability to log modifications to configurations (history)

SIS-MWV_30.docx

Version: 1.5.19608

Page 40 of 477

MES Weaver

2  MES Weaver 3.0 - Technical Overview

Introduction

MESWeaver 3.0 supports the following features:

  Complete Unicode support of HYDRA data base and HYDRA business logic

  Complete support of East Asian languages on Windows terminal (both labeling and master as

well as movement data)

  Multi-lingual display of user data (master data) on Windows terminal and console

Unicode support

Unicode  is  an  international  standard  in  which  a  digital  code  is  identified  for  each  meaningful  character

and/or text element of all known writing cultures and symbol systems on the long term.

MESWeaver  3.0  provides  server-sided  support  (data  base  and  business  logic)  to  the  application  of

Unicode so that texts can be processed in different languages and stored in the HYDRA data base.

SIS-MWV_30.docx

Version: 1.5.19608

Page 41 of 477

UNICODE supports the scripts/writings below and hence the data base and business logic of MW 3.0:

MES Weaver

MW 3.0 is structured as follows:

Data base layer

Data base (SQL server 2008 R2 or Oracle 11)

Business logic

Client layer

MESWeaver 30

Unicode

Unicode

Unicode

Windows terminal)2,3

MES Operation Center

)2   Possible fonts: West Europe, East Europe, Cyrillic, Chinese, Korean, Japanese
)3   The  relevant  client  must  explicitly  be  adjusted  to  the  correct  font  and  can  only  represent  symbols  of

that specific font correctly. All other symbols are substituted by a question mark "?".

SIS-MWV_30.docx

Version: 1.5.19608

Page 42 of 477

MES Weaver

Complete support of East Asian languages on Windows terminal

  The  Windows  terminal  offers  the  complete  support  of  East  Asian  languages,  both  for  labeling

and for master as well as movement data.

  The  Windows  operating  system  installed  for  the  Windows  terminal  must  provide  the  relevant

character set for which labeling as well as master and movement data are to be displayed.

Multi-lingual display of user data (master data) on terminal and MES

Operation Center

  As a supplement to the native language of data base contents, designations of master data may

be managed in several languages in MW 3.0 (e.g. machine designations, status texts, ...)

  The terminal requests texts for the language in  which the terminal  is configured. This does not

only allow for operating the terminal of a German system with an English surface in England, for

instance, but also displaying key designations from the data base in English.

  Such  multi-lingual  texts  may  also  be  displayed  and  maintained  through  the  MES  Operation

Center - in analogy to the terminal.

  The number of supported languages is optional, i.e. all languages supported by HYDRA MW 3.0

may be configured.

  For  UNICODE-compatible  Clients,  there  are  not  restrictions  with  regard  to  the  languages  which

may be displayed.



In addition, the Windows terminal display may be switched to East Asian languages (*1).

  Multi-lingual  master  data  may  be  maintained  using  the  system  text  configurator  (STC).  This

allows for facilitated translation.

(*1)  Since  English  is  a  language  without  any  'umlaut'  and  all  fonts  depict  the  Latin  alphabet,  English  is

available for all language configurations.

SIS-MWV_30.docx

Version: 1.5.19608

Page 43 of 477

MES Weaver

Notes on the HYDRA server

All files are read and/or stored in UTF-8 format unless specified otherwise. Files and/or data displayed on

the  clients  are  transferred  into  the  client's  font.  Since  the  clients  are  only  capable  of  depicting  specific

fonts, Unicode symbols without any equivalent in the client's font are represented by a question mark.

The following notes are to be observed:

-  All  files  on  the  server  are  stored  in  UTF-8  format.  Application  of  an  UTF-8  compatible  editor  is

urgently recommended.

-

If  -  in  deviation  of  UTF-8  -  the  SAP  FILE  interface  is  to  be  operated  in  the  national  code  page

1252, 1250, etc., this is possible by using the parameter/CP={code page}, e.g. /CP=CP-1252

-  The  current  PDM  interface  is  compatible  with  MW  3.0,  but  also  backward  compatible  with  MW

2.0. The PDM interface is operated in MW 3.0 with UTF-8. Data may be converted into the local

code page of the Windows client by configuration from the server code page.

-  File  names  and  directory  names  should  only  comprise  letters  and  figures  of  the  Latin  alphabet

(no special characters, symbols, 'umlauts'). Please also refer to additional notes in the following

sections.

-

Notes on HYDR@WEB

HYDR@WEB has been released for operation with MW 3.0.

The following restrictions are to be observed:

  HYDR@WEB  may  only  be  operated  with  West  European,  East  European  and  Cyrillic  data  base

contents.  HYDR@WEB  has  not  been  released  for  operation  with  Asian  data  base  contents    (e.g.

Chinese texts).

Notes on the Windows terminal

Windows terminal programs do not support Unicode, but national code pages. These may be single byte

code pages (SBCS, e.g. Western Europe, Eastern Europe, or Cyrillic), but also multibyte code pages

(MBCS, such as Chinese, Japanese or Korean).

SIS-MWV_30.docx

Version: 1.5.19608

Page 44 of 477

MES Weaver

The translation from Unicode to the national code page of the terminal takes place on the HYDRA server

level in the file server and/or multiplexer: Data are written in Unicode format by the HYDRA server and

converted during transport to the terminal (and vice-versa when data are sent to the HYDRA server):

On the levels Display of Information, Manual Recording of Information and Data Print (including HYD-

ETD), the above-mentioned national code pages are supported across all products.

The following restrictions are to be observed on the Windows terminal:

  The interfaces between the terminals in the direction of the machine, e.g.

o

local PDM interfacing

o  PCC-ADP

o  PCC incl. driver

do NOT support ANY national code pages at present.

File  contents  on  this  level  are  limited  to  ASCII  characters  from  32dec  to  127dec,  i.e.  primarily  the

characters

␣!"#$%&'()*+,-./0123456789:;<=>?

@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^
`abcdefghijklmnopqrstuvwxyz{|}~

Notes on DOS terminals

The following restrictions are to be observed for the operation of DOS terminals under MW 3.0:

  DOS terminals may principally be operated with MW 3.0. DOS terminals only support the characters

of  code  page  850  (DOS-Latin-1,  Western  Europe).  Due  to  the  lack  in  code  page  support  outside

code page 850 (Western Europe), we urgently recommend reducing text displays and input to ASCII

characters 32dec through 127dec (cf. above), since otherwise display problems with national special

characters may occur: As described above, "?" will be displayed as substitute characters.

SIS-MWV_30.docx

Version: 1.5.19608

Page 45 of 477

MES Weaver

3  Maintenance Manager 2.0

Overview

The Maintenance Manager is a web based to to administer HYDRA systems. This tool is used to maintain

server and client components.

3.1  Application

Open the web front end browser in order to use the Maintenance Manager.

The address for the web front end is  http://Servername:Port/ (if http://hydra:18080/ the server's name is

hydra  and  the  standard  port  18080  is  used  for  the  first  instance.  Then  port  18081,  …  for  further

instances.).

3.2  Login

You need to log on in order to use the Maintenance Manager. Password for the login is:

Mosbach74821

SIS-MWV_30.docx

Version: 1.5.19608

Page 46 of 477

MES Weaver

Illustration 1 Login Maintenance Manager

Now the user is on the main page of the Maintenance Managers.

Illustration 2 Main Page Maintenance Manager

SIS-MWV_30.docx

Version: 1.5.19608

Page 47 of 477

MES Weaver

3.3  Configuration

Menu point: Settings

You can configure the Maintenance Manager beforehand in order for the Maintenance Manager to cope

with certain conditions of the HYDRA system (or instances). The user can neglect the above if you use

the relevant installation service. However, the user must attend to the following values in the tab System:

Value

WSP host

WSP port

Description

Host name of the WSP server

Port of the WSP server

Tomcat path

Installation directory of the Tomcat

Tomcat version

Tomcat Version (compatible with 6 or 8)

Java version

Java Version (compatible with 5 or 8)

A  directory  can  be  specified  that  is  processed  in  cycles  and  that  automatically  transfers  uninstalled

update packages. For example, if a network is released, several systems with identical update packages

can be processed or installed simultaneously.

Click on Save to save the configuration.

Illustration 3 System configuration

SIS-MWV_30.docx

Version: 1.5.19608

Page 48 of 477

You  can  find  the  settings  to  configure  the  MOC  Updater  in  the  tab  MOC  settings. With  the  settings  the

user  can  configure  the  process  and  input  fields  of  the  GUI  for  the  MOC  Updater.  The  user  can  also

specify if the fields can be changed in the GUI for the MOC Updater.

MES Weaver

Illustration 4 Configuration master server

Value

Description

Master host

Standard  value  for  the  host  name  of  the  master  server  that  the

MOC Updater uses during the setup.

Standard  value:  Identical  with  the  host  name  of  the Maintenance

Manager.

Master port

Standard value for the port of the master server that is used in the

GUI of the MOC Updater during setup.

Standard  value:  Identical  with  the  port  of  the  Maintenance

Manager.

MOC root directory

Standard value for the target directory of the MOC installation that

is used in the GUI of the 'MOC Updater' during setup.

Standard value: „C:\Program Files (x86)\MPDV\MOC“

Lock MOC root

The  lock  specifies  if  the  user  can  change  the  GUI  for  the  'MOC

Updated'.

SIS-MWV_30.docx

Version: 1.5.19608

Page 49 of 477

MES Weaver

Standard value: de activated

Path to ZIP archive

Standard  value  for  the  file  path  to  the  ZIP  archive  of  the  MOC

installation  that  is  used  in  the  GUI  of  the  MOC  Updater  during

setup.

Standard value: not specified

Lock ZIP path

The  lock  specifies  if  the  user  can  change  the  path  to  the  ZIP

archive in the GUI for the MOC Updater.

Standard value: de activated

Default setup source is zip

Activates  the  ZIP  archive  as  a  standard  value  for  the  installation

source in the GUI of the MOC Updater.

Standard value: "Maintenance Manager"

Lock default setup source

The  lock  specifies  if  the  user  can  change  the  value  for  the

installation source in the GUI for the MOC Updater.

Standard value: de activated

Days to keep backups

The  above  specifies  the  duration  (in  days)  of  how  long  to  keep

backups for the client updates.

Standard value: 30

Shortcuts only for current user  This  activates  that  the  systems  selects  by  default  only  the

currently logged user, when preparing MOC links.

Standard value: "All users of this PC".

The user can release all stored settings that are distributed and used by the MOC Updater with a click on

Rescan.

If all changes are carried out in the subdirectory of the MOC Runtime directory, then the user must also

click on Rescan. This process is required in order to install changes, found during the search for updates,

with the MOC Updater.

Click on Save to save the configuration.

The tab Logbook contains information of the last deployments.

SIS-MWV_30.docx

Version: 1.5.19608

Page 50 of 477

MES Weaver

Illustration 5 Information of the last updates.

The tab Environment displays the current environment variables.

Illustration 6 Systems settings display

3.4  Package Deployment

3.4.1 General

The Maintenance Manager can install update packages for the HYDRA system. Such an update package

may  contain  content  for  the  client  (MOC),  the  server,  web  services  (JAVA)  and  updates  for  the

Maintenance Manager itself.

Such an Update Package contains all different types.

-  Client   Updates for MOC

SIS-MWV_30.docx

Version: 1.5.19608

Page 51 of 477

MES Weaver

-

Java  Updates for web services

-  Server  Update for non-web service components of the server

-  Maintenance Manager → Update of the Maintenance Manager

The different internal packages are deployed for update according to their type.

3.4.2 Internal Package Types

3.4.2.1

Java

The Jave software is located in the Tomcat Web archive. This file has the ending .war. Normally, required

web  applications  need  further  files  (configuration,  user  exit,  ...).  This  is  located  in  a  sub-directory  (e.g.

MOC) that is specified by the environment variable JHYDRADIR.

In order to keep the  updates small, the user should  not always  exchange the complete web application

but only the changed components.

3.4.2.2

Server

The Server Packages are established packages from HYDRA 7. The packages are forwarded to the BAPI

HYDRA.INSTALL which then manages the packages.

3.4.2.3  Client

The  domain  manages  and  supplies  the  client  software,  but  in  order  to  process  the  client  a  different

structure is required.

For this reason the Maintenance Manager uses a split structure:

Updates

These  are  the  individual  update  packages  (containing  one  or  several

domains) installed in the Maintenance Manager.

MaintenanceManager\upd\MOC

Runtime

This is the runtime version required by the client.

MaintenanceManager\rt\MOC

SIS-MWV_30.docx

Version: 1.5.19608

Page 52 of 477

MES Weaver

3.4.3 Perform deployment

Menu point: Update

The screen to deploy update packages contains only a button to select a file. The user must select here

the  required  update  package.  The  button  "Deploy  package"  installs  the  package  in  the  Maintenance

Manager.  You can automatically activate the package if  you select Auto activate after deployment.  This

option is selected per default.

WARNING:

The function Overwrite newer versions can only be applied to Java components in the update package.

Only use this function after consultation with MPDV.

Illustration 7 Selection update packages

SIS-MWV_30.docx

Version: 1.5.19608

Page 53 of 477

MES Weaver

Illustration 8 Deployment

Sometimes the column Version, containing the internal packages, is highlighted during installation. If the

column  is  highlighted  in  yellow,  then  the  update  package  has  the  same  version.  If  the  column  is

highlighted  in  red,  the  shown  version  is  older  than  the  version  of  the  installed  update  package.  In  this

case, the button Deploy update is blocked until the user selects Overwrite.

Illustration  9 Installing older update packages

SIS-MWV_30.docx

Version: 1.5.19608

Page 54 of 477

MES Weaver

Illustration 10 Progress during update

3.5  Deployment

3.5.1 Administration of update packages

Menu point: Package administration

Register: Server/Client

The process is the same for the deployment of client update packages and for Jave update packages. If

there are differences, then they are dealt with separately.

All updates installed in the Maintenance Manager are listed in the administration of update packages.

You can determine if an update package was deployed or not in the runtime structure with the content of

the column Deployed. If the update package was deployed, then the date of the update is visible in the

column. If the update package was deployed or previously undeployed into the runtime structure, then the

column  remains  empty.  But  the  update  package  remains  in  the  Maintenance  Manager  until  it  is  finally

deleted.

When the user selects an update package, detailed information is available for the package.

SIS-MWV_30.docx

Version: 1.5.19608

Page 55 of 477

MES Weaver

If  you  have  deployed  the  update  package,  then  the  function  Deploy  or  Undeploy  is  available.  The

deployment loads content of update packages into the local runtime structure. During the deployment, all

files are saved that are overwritten by the content of the update package to enable an 'Undeployment' of

a update package.

If  the  deployed  package  contains  older  versions  than  the  runtime,  then  the  system  queries  as  to  the

deployment  of  older  versions  nor  not.  (Please  only  carry  out  a  deployment  of  older  versions  after

consulting  with  MPDV!)  No  version  checks  take  place  in  the  client  Undeployment,  as  it  might  be

required in some cases to change a component with an older version.

The Undeployment removes the update package from the runtime structure and replaces the one with a

previously loaded update package.

Only  the  latest  deployed  update  package  can  be  used  during  an  Undeployment,  because  components

from  the  latest  update  package  might  be  overwritten  when  saving  the  update  package  that  was  just

deployed.

Illustration 11 Undeployment WSP packages

SIS-MWV_30.docx

Version: 1.5.19608

Page 56 of 477

MES Weaver

Ilustration 12 Undeployment MOC packages

You  can  delete  the  update  package  completely  after  undeployment.  That  deletes  the  backup  of  the

update package. If the user had undeployed the update package, then the button Delete can be selected.

Clicking on the button Delete removes the update package totally.

Illustration 13 Delete server update packages

SIS-MWV_30.docx

Version: 1.5.19608

Page 57 of 477

MES Weaver

Illustration14 Delete client update packages

3.5.2 Activation of the Software Status

Menu point: Activate

During the activation of the local runtime structure all libraries are gathered into one Web application. This

application is activated in the Tomcat (if the application is available, the old one is removed and replaced

by the new one).

Then the files are automatically in JHYDRADIR activated.

Illustration 15 Activation of the Software Status

Use the button Activate.

SIS-MWV_30.docx

Version: 1.5.19608

Page 58 of 477

MES Weaver

Illustration 16 Activation update packages

Activation takes ca. 3-5 minutes and is then confirmed.

Illustration 17 Progress during Update

When  using  Tomcat  6,  the  activation  might  be  interrupted  when  the  server  is  overloaded  due  to  an

increased number of activation processes. In this case, an error message occurs. Any other activations

are available after a restart.

3.6  Additional Functions

3.6.1 Version Request of the Java Components

Menu point: Current versions → WSP versions

The following data is supplied when requesting the version:

  Component name

  Component title

  Component version

SIS-MWV_30.docx

Version: 1.5.19608

Page 59 of 477

  Supplier of the component

  Modified on

MES Weaver

Illustration 18 Version information WSP

A  comparison  of  versions  supplies  the  same  data  for  the  versions  in  the  runtime  structure  and  also  for

active ones.

3.6.2 Version request of the Client Components

The following data is supplied when requesting the version:

  Component name

  Component title

SIS-MWV_30.docx

Version: 1.5.19608

Page 60 of 477

MES Weaver

Illustration 19 Version information MOC

3.6.3 Administration

Menu point: System administration → Path configuration

The  menu  point  System  Administration  contains  functions  to  maintain  HYDRA  paths  and  to  manage

logged users. This area of the application requires access data of a HYDRA user.

3.6.3.1  Maintenance of HYDRA paths

The path configuration of the Maintenance Manager enables to display, create, edit, delete and copy of

HYDRA paths. You can maintain in the path configuration of the Maintenance Manager the same fields

like in the HYDRA path configuration. The HYDRA Documentation can be used to describe the values.

SIS-MWV_30.docx

Version: 1.5.19608

Page 61 of 477

Menu point: System administration → Path configuration

MES Weaver

Illustration 20 Maintenance of HYDRA paths

3.6.3.2  Administration of Logged In Users

Menu point: System administration → Logged in users

The administration of logged in users enables to lock other users in the current Maintenance Manager.

Illustration 21 Administration of logged in users

SIS-MWV_30.docx

Version: 1.5.19608

Page 62 of 477

The button 'Logout' signs out tagged users. Multi selection is possible (STRG + mouse click).

'Logout' signs out all logged in users.

A confirmation prompt is displayed for both functions before deleting.

MES Weaver

Illustration 22 Confirmation prompt 'Logged in users'

SIS-MWV_30.docx

Version: 1.5.19608

Page 63 of 477

MES Weaver

4  Multilingual Database Contents

Summary

This document describes how the multilingual display of user data (master data) is processed.



In  addition  to  the  native  language  of  database  contents,  MW  3.0  allows  for  multilingual

designations of master data (e.g. machine designations, status texts, …) to be managed.

  The  terminal  requests  the  texts  for  that  language  in  which  the  terminal  is  configured.

Consequently, it is not only possible to operate a terminal of a German system with English user

interface, e.g. in England but also to display important designations from the database in English.



Just as it is the case for the terminal, these multilingual texts may also be displayed  and edited

using the MES Operation Center.



It is possible to activate up to 8 languages at the same time which are supported by HYDRA-MW

3.0.

  There  are  no  restrictions  as  regards  the  languages  that  can  be  displayed  for  clients  that  are

compatible with Unicode.

  The Windows terminal can also display East Asian languages. (*1)

  Multilingual master data can be edited using the system text configurator (STC), which simplifies

translation.

  HYDRA partially also delivers initial data that include texts in the native column. These texts have

to be translated by way of STC.

 (*1)  Since  English  is  a  language  without  umlauts  and  all  character  sets  represent  the  Latin  alphabet,

English is available for all language configurations.

Available languages

At  the  moment  MESWeaver  3.0  supports  the  languages  listed  in  the  following  paragraph  for  which  the

"multilingual database contents" functions can also be provided:

  German

  English

SIS-MWV_30.docx

Version: 1.5.19608

Page 64 of 477

MES Weaver

  Dutch

  French

  Danish

  Czech

  Spanish

  Portuguese

  Bulgarian

  Polish

  Slovenian

  Hungarian

  Slovak

  Romanian

  Chinese,Simplified



Italian

  Russian

  Serbian,Cyrillic

  Swedish

  Norwegian

  Croatian



Japanese

  Korean

Activation

The  multilingual  database  content  functions  are  generally  available  (short:  MDBI).The  languages

concerned that are to support the MDBI function have to be prepared and activated explicitly  by  MPDV

Implementing.

Functions

In  addition  to  the  native  language  of  database  contents,  MW  3.0  allows  for  multilingual  designations  of

master data (e.g. machine designations, status texts, …) to be managed. These multilingual master data

may  be  administered  and  translated  via  the  system  text  configurator  (STC).  If  the  required  language  is

prepared  (configured,  activated  and  translated)  for  MDBI  access  to  language-specific  master  data  is

activated and represented when the clients are started (or when languages are changed at the console).

Management table

Active  and  inactive  MDBI  languages  are  managed  in  the  hyd_languages  table,  where  required

configurations are defined.

Only MPDV Implementing is responsible for managing the languages (activation/deactivation).

SIS-MWV_30.docx

Version: 1.5.19608

Page 65 of 477

Schema

Field name

Type

Size

Description

MES Weaver

language_id

smallint

language_iso

char

language_ui

char

language_cp

char

language_ml

char

language_name

char

active

char

sbcs

char

language_def

smallint

-

2

10

6

80

80

1

1

-

Unique language index

 e.g. 6 for Czech

Language key according to ISO code 639

 e.g.

“cs“ for Czech

Language of the user interface

 e.g. “cs-CZ” for

Czech

Windows codepage of the language

 e.g.  1250

for

Eastern European

Multilingual

language  designation

(English),  e.g.

“Czech“ for Czech

Language-specific  designation  in  the  character  set  of

the respective language

 e.g. “Česky“ for Czech

Y … activated

 N  …  deactivated

(by  default)

”This

field

is  configured  by  MPDV  during

implementing/customizing  and  must  not  be  changed
manually.

Single Byte Character Set Y/N

Language index of the default language

Index:

create unique index ix_langid on hyd_languages (language_id);

Default configuration

The following MDBI configuration is created when the HYDRA database is being built:

-----------------------------------------------------------
ID ISO CP     ML                           ACTIVE SBCS DEF
-----------------------------------------------------------
01 de  1252   German                       N      Y    00
02 en  1252   English                      N      Y    00
03 nl  1252   Dutch                        N      Y    02
04 fr  1252   French                       N      Y    02
05 da  1252   Danish                       N      Y    02
06 cs  1250   Czech                        N      Y    02

SIS-MWV_30.docx

Version: 1.5.19608

Page 66 of 477

MES Weaver

07 es  1252   Spanish                      N      Y    02
08 pt  1252   Portuguese                   N      Y    02
09 bg  1250   Bulgarian                    N      Y    02
10 pl  1250   Polish                       N      Y    02
11 sl  1250   Slovenian                    N      Y    02
12 hu  1250   Hungarian                    N      Y    02
13 sk  1250   Slovak                       N      Y    02
14 ro  1250   Romanian                     N      Y    02
15 zh  936    Chinese, Simplified          N      N    02
17 it  1252   Italian                      N      Y    02
18 ru  1251   Russian                      N      Y    02
19 sr  1251   Serbian, Cyrillic            N      Y    02
20 sv  1252   Swedish                      N      Y    02
21 no  1252   Norwegian                    N      Y    02
22 hr  1250   Croatian                     N      Y    02
23 ja  932    Japanese                     N      N    02
24 ko  949    Korean                       N      N    02

MPDV  changes  this  configuration  during  the  implementation  process  according  to  the  customer’s

requirements..

Implementing of MDBI functions

MPDV activates the steps required to support MDBI functions during implementing.

Overview of multilingual columns

The following table shows the supported table columns for which MDBI functions are available:

Realized in

Comment

HR    Multilingual  configuration  of

Accounts  are  displayed

in

the

account designations

corresponding

language  (terminal

info, time sheet, account lists)

HR  Multilingual  configuration  of

Designations  are  displayed  in  the

the  designation  of  remuneration

corresponding

language

(time

day types

sheet, personnel scheduling)

HR  Multilingual  configuration  of

Designations  are  displayed  in  the

the  designation  of  absence

corresponding  language  (display  of

reasons

latest  clockings  at

the

terminal,

absence reason list)

PEP Multilingual configuration of

Designations  are  displayed  in  the

qualification designations

corresponding  language  (HYDRA-

PEP  on  user  interface,  personnel

schedule

is  displayed  on

the

terminal):

HYD Designation of units

  Configuration of units

SIS-MWV_30.docx

Version: 1.5.19608

Page 67 of 477

MES Weaver

  No  other  dialogs  in  which  the

designation is displayed (only the

abbreviation is displayed)

MDE  Workplace  configuration:

  Workplace configuration

Designation, comment

  Designations are displayed on the

console

o

MDE

  Configuration

Designation  of  machine  status

texts

  The  designation  is  displayed  in

the corresponding language

o Machine overview

o Machine  overview:  combo

box

o Order overview

o Machine status log

o Event maintenance

o Status/Status classes/RPA

o Status/Status

classes/RPA:

Combo box

o

  Terminal display

MDE

  Configuration

Designation of status classes

  The  designation  is  displayed  in

the corresponding language

o Machine overview

o Order overview

o Machine status log

o Maintenance of postings

o Event maintenance

o Downtimes  of  one/several

machines

BDE

  Multilingual

configuration

of

Designation

of

resource

account

designations

and

performance accounts

abbreviations

SIS-MWV_30.docx

Version: 1.5.19608

Page 68 of 477

MES Weaver

  The  designation  is  displayed  in

the corresponding language

o MDE:

Status/Status

classes/RPA: all tabs

o MDE:

Status/status

classes/RPA:  RPA  profile

(column heading)

o  ADE:

versatile

dialogs

(column headings)

BDE

  Multilingual  configuration  of  the

Designation of order status texts

designation of order status texts

  The  designation  is  displayed  in

the corresponding language

o  ADE:  versatile  combo  boxes

(e.g.

order

overview,

schedule violations, …)

o ADE: Order overview: list

o ADE: Order information

o ADE: Change status

o ADE: AVG

BDE:  Designation  of

reason

  Multilingual

configuration

of

texts

reason

text

designations

(deviation

reasons,

scrap

reasons,

problem

quantity

reason, rework reason)

  The  designation  is  displayed  in

the corresponding language

o Scrap  statistic  based  on

orders/machines

o Article statistics

o Maintenance of postings

o Event maintenance

  Terminal display

BDE

  Multilingual  configuration  of  order

Order type designation

type designations

  Designations are displayed in the

corresponding

language

in

SIS-MWV_30.docx

Version: 1.5.19608

Page 69 of 477

MES Weaver

WRM

Resource type

HYDRA-ADE

(e.g.

order

overview, schedule violations)

  Multilingual

configuration

of

resource type descriptions

  Designations are displayed in the

corresponding

language

(resource

status,

resource

information,  maintenance

of

resource  documents,

resource

history)

  Terminal display

WRM

  Multilingual

configuration

of

Resource families

resource family descriptions

WRM

Measures

  Display

in

different

evaluations/reports

on

the

console

  Terminal display

  Multilingual

configuration

of

designations

of

measures,

descriptions and comments

  Display

in

different

evaluations/reports

on

the

console

  Entry function of measures on the

console

  Terminal display

WRM

  Multilingual  configuration  of  the

Designation

of

status

designation of status assignments

assignment

WRM

Maintenances

  Display  of  the  designation  in  the

respective

language

(resource

status,  maintenance  of  resource

documents)

  Terminal display

  Multilingual

configuration

of

maintenance designations as well

as comments

  Display in versatile evaluations on

the  console,  among  other  things,

SIS-MWV_30.docx

Version: 1.5.19608

Page 70 of 477

MES Weaver

MPL

Material types

the  machine  history,  resource

history, maintenance

  Multilingual  configuration  of  the

designation

  Displayed

in

versatile

evaluations/reports

on

the

console

MPL/WRM

Material

locations

  Multilingual

configuration

of

buffers/storage

material buffer designations

  Display

in

different

evaluations/reports

on

the

console

  Terminal display

MPL

Transport units

  Multilingual  configuration  of  the

designations of transport units

MPL

  Multilingual

configuration

of

Material type designation

material type designations

  Designations are displayed in the

corresponding

language  (batch

data

overview,

batch

data

maintenance)

MPL

  Multilingual

configuration

of

Designation of material attributes

material attribute designations

  Designations are displayed in the

corresponding

language  (batch

data

overview,

batch

data

maintenance)

CAQ

  Displayed in many HYDRA-CAQ

Short designation of statuses

search dialogs

CAQ

  Displayed in many master data

Detailed designation of HYDRA-

catalogs

CAQ statuses

  Displayed in nearly all dialogs in

the “areas” menu item

  Display in evaluations/reports

CAQ

  Short  designation  of  HYDRA-

Short designation of the area

CAQ areas

SIS-MWV_30.docx

Version: 1.5.19608

Page 71 of 477

MES Weaver

CAQ

  Display in the terminal

Detailed designation of the area

configuration of the CAQ tab

  Display in inspection planning

  Inspection

requirements/calibration

  In all evaluations/reports

Detailed designations of

  Initial sample inspection

HYDRA-CAQ status types

CAQ

Designation of forms

CAQ

Form descriptions

  Displayed in master data, forms

  Displayed in all dialogs from

which forms can be printed

  Displayed in master data, forms

  Displayed in all dialogs from

which forms can be printed

CAQ

  Display in dynamic modification

Dynamic modification norm

norms

  Inspection plans (WEP)

  Characteristics (WEP)

  Inspection orders (WEP)

CAQ

  Displayed in master data,

Designation of inspection

inspection severity definition

severity definition

  Inspection plans (WEP)

  Characteristics (WEP)

  Inspection orders (WEP)

CAQ

  Displayed in entries of inspection

Designation of inspection

severity definitions

severity

  Inspection plans (WEP)

  Characteristics (WEP)

  Inspection orders (WEP)

CAQ

  Displayed in master data,

Designation of transitional

transitional definitions

definitions

  Inspection plans (WEP)

SIS-MWV_30.docx

Version: 1.5.19608

Page 72 of 477

MES Weaver

  Characteristics (WEP)

  Inspection orders (WEP)

CAQ

  Displayed in master data catalog

Characteristic designation

of characteristics

  Inspection plan characteristics

  Inspection order characteristics

  PLP characteristics

  EMU characteristics

  Complaint details of

characteristics

CAQ

  Displayed in master data catalog

Characteristic location

of characteristics

  Inspection plan characteristics

  Inspection order characteristics

  PLP characteristics

  EMU characteristics

  Complaint details of

characteristics

  Terminal

CAQ

  Displayed in gage master data,

Gage designation

gage management

  Characteristics

  Terminal

CAQ

  Displayed in characteristics

Designation of inspection station

CAQ

Article designation

  Displayed in master data articles

  Inspection plans

  Inspection requirements

  Complaint details

CAQ

  Displayed in master data defect

Defect designation

catalogs

SIS-MWV_30.docx

Version: 1.5.19608

Page 73 of 477

CAQ

  Displayed in master data,

Designation of measures

measures

MES Weaver

CAQ

Measure text

CAQ

Document designation

  Evaluation of measures

  Complaints header

  Complaint details

  Master data of measures

  Master data characteristics

  Inspection plan header

  Inspection requirement header

  Inspection plan characteristics

  Inspection order characteristics

  Gage management

  Complaint header and details

CAQ

Document entries

CAQ

Documents





CAQ

  Displayed in master data, cost

Cost type designation

types

  Complaints header

  Complaint details

CAQ

  Displayed in master data, MDI

MDI channel designation

configuration

CAQ Workflow

  Displayed in master data,

Element designation

workflow

CAQ Workflow

Measure text

  Complaint header workflow

  Complaint detail workflow

  Workflow element (master data,

complaint detail, complaint

header)

SIS-MWV_30.docx

Version: 1.5.19608

Page 74 of 477

MES Weaver

CAQ

  Displayed in master data,

Designation of analysis selection

analysis selection catalog

catalog

CAQ

Evaluation catalog, designation

of the entry

  Displayed in characteristics

  Supplier evaluation and

  master data evaluation catalog

CAQ

  Supplier evaluation and

Designation of evaluation groups

  master data evaluation catalog

CAQ

  Displayed in evaluation catalogs -

Designation of evaluation

-> entries

elements

CAQ

Evaluation catalog number

  Displayed in evaluation catalogs

CAQ

  Displayed in evaluation catalogs -

Designation of evaluation

-> classes

classes

CAQ

  Displayed in inspection plan -->

Designation of certificate

certificates

characteristics

CAQ

  Displayed in master data

Designation of distributor

CAQ

  Displayed in master data,

Designation of companies

company

  Inspection requirements

  Gage management

  When the parties in charge are

assigned

  External people

CAQ

  Displayed in master data,

Company’s country of residence

company catalog

CAQ

  Displayed in master data,

Designation of department

department

  When the parties in charge are

SIS-MWV_30.docx

Version: 1.5.19608

Page 75 of 477

MES Weaver

assigned

  External people

CAQ

  Displayed in all dialogs where

Party in charge name 1

parties in charge may be selected

CAQ

  Displayed in all dialogs where

Party in charge name 2

parties in charge may be selected

CAQ

  Displayed in all dialogs where

Party in charge name 3

parties in charge may be selected

CAQ

Designation of units

  Currently not displayed



MOC

Administration

MDE

  Displayed in the resource status

Resource status types

type dialog (MOC)

MDE

  Displayed in resource status texts

Resource status texts

dialog (MOC)

MDE

Production levels

  Configuration

  The  designation  is  displayed  in

the corresponding language

SYS

  Configuration



Enhanced object configuration

MDE

Machine counter

PDV

Event designation

CAQ

QM catalog

  The  designation  is  displayed  in

the corresponding language

  Configuration (MOC)

  The  designation  is  displayed  in

the

corresponding

language

(MOC)

  Configuration (MOC)

  The  designation  is  displayed  in

the

corresponding

language

(MOC)

  Configuration (console)

  The  designation  is  displayed  in

SIS-MWV_30.docx

Version: 1.5.19608

Page 76 of 477

the

corresponding

language

(CTAIP)

MES Weaver

Translation of database texts for MDBI

Initial database texts are translated by way of the “System Text Configurator” tool.

This  tool  makes  it  possible  to  translate  a  specified  amount  of  database  texts  manually  and  in  a  semi-

automated way using data from the HYDRA dictionary.

The tool is stored in the following directory on the HYDRA server:

UNIX:

<HYDRADIR>/admtools/systemtextconfigurator

Windows:  <HYDRA>\admtools\systemtextconfigurator

Fehler! Hyperlink-Referenz ungültig.The documentation dealing with the tool can be found in the following

directory:

UNIX:

<HYDRADIR>/admtools/systemtextconfigurator/help

Windows:  <HYDRA>\admtools\systemtextconfigurator\help

Before  the  STC  tool  is  used,  it  has  to  be  configured  on  the  basis  of  the  documentation  (e.g.  DB-

Connection).

Attachment

Internal description of the  HYD-MDBI function

Initialization of new columns

Further creation/checking of MDBI columns

Disabling of MDBI languages

A

B

C

D



SIS-MWV_30.docx

Version: 1.5.19608

Page 77 of 477

MES Weaver

5  HYDRA Database Password

1.1  Summary

HYDRA uses a separate database user and database password to access the  corresponding database

system. The database  user "hydadm" is created  along  with a  default password  if HYDRA  is installed in

the default way.

This  document  describes  how  the  database  password  can  be  changed  on  the  database  level  and  how

HYDRA is informed about the password in encrypted manner.

The  database  password  is  transferred  to  the  HYDRA  console  in  an  encrypted  form;  this  prevents  the

database password from being read in an uncoded manner on the server or the client.

References to other Documentation

---

Changing the HYDRA DB user password

Please note

,

Oracle and SQL servers have a  separate user administration. Consequently, the database user

hydadm is not identical to the HYDRA administrator (hydadm).

Password change

The password of the HYDRA DB user "hydadm" can be changed as follows:

  1.  Exit HYDRA using the HYDRA Manager

  2.  Change the password as follows:

SIS-MWV_30.docx

Version: 1.5.19608

Page 78 of 477

MES Weaver



The database user is not identical to the HYDRA administrator (hydadm). Start sqlplus and log

in as user hydadm

d:\hydra> sqlplus

Enter  password  and  upon  request,  enter  the  old  and  the  new  password  incl.  confirmation

(Syntax PASSW[ORD] [username]):

SQL> password

Changes the password for HYDADM

Old password: ******

New password: ******

Enter the new password once more: ******

SQL> exit



Start  the  SQL  Server  Enterprise  Manager.  Choose  the  server  from  the  left-hand  side.  Select

"security" and click the "user name". In the detail area right click the user name to be changed

and then select "properties". Enter a new password within the "password" field of the "general"

tab and confirm the password.

  3.  Start an MS-DOS prompt and go to the HYDRA installation directory.

  4.  Now change the configuration as follows:





Enter the following entries that assign the new password (HYDBPW) to the user (HYDBUSER)

hydadm in the "environment" section of hymap.cfg.

…

[Environment]

…

HYDBUSER=hydadm

HYDBPW={ new password}

…

Install the modified hymap.cfg file, in this context, the password of the Windows user hydadm

is to be specified.

Please note: The Windows user is not identical to the Oracle user!

d:\hydra> ntinst –if hymap.cfg

Enter the following rows in hy_env.scr:

export HYDBUSER=hydadm

export HYDBPW={ New password}

SIS-MWV_30.docx

Version: 1.5.19608

Page 79 of 477

  5.  Check the database connection via the "projekt“ program. The program should output "HYDRA“ or

the  set  project.  In  the  event  of  an  error,  a  database  error  including  the  corresponding  "sqlcode"

occurs. Check the values entered in the configuration in cases of error and repeat step 4.

MES Weaver

d:\hydra> projekt.exe





/usr/hydra> projekt.out

  6.  Start HYDRA using the Hydra-Manager.

Generate encoded database password

The database password (HYDBPW) is defined in an encoded form on the HYDRA server.

The  tool  "DB-Password-Generator"  generates  an  encrypted  password  for  the  specified  user  and  the

entered password (that has a maximum of ten characters).

This  generated  password  (32  characters  long)  is  to  be  entered  as  the  new  password  and  tested  as

described in section 2.2.

The  "hyd_pwd.exe“  program

is  provided

in

the

following  directory  on

the  HYDRA  server:

<HYDRADIR>/admtools/hyd_pwd

For installation purposes, copy the directory on a Windows PC and run the program "hyd_pwd.exe“.

Other database users and passwords

Irrespective  of  HYDRA,  different  database  users  are  created  by  the  respective  database  system.  The

sections that follow describe these database users and their relation to HYDRA and MPDV Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 80 of 477

MES Weaver

ORACLE database

INTERNAL user

Used by MPDV:

MPDV uses this user to create the ORACLE instance.

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

DBSNMP user

Used by MPDV:

MPDV does not use this user

Password can be changed:

YES

Password is changed by:

MPDV

Please note:

This user should not be deleted as it might be used by ORACLE Support.

OUTLN user

Used by MPDV:

MPDV does not use this user

Password can be changed:

YES

Password is changed by:

MPDV

Please note:

This user should not be deleted as it might be used by ORACLE Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 81 of 477

MES Weaver

SYS user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

SYSTEM user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

Microsoft SQL Server database

sa user

Used by MPDV:

MPDV

uses

this

user

to

create

the

database

instance

and

database.

MPDV Support uses this user to view the database.

The database user "sa" is created along with a default password if HYDRA is installed in the default way.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

SIS-MWV_30.docx

Version: 1.5.19608

Page 82 of 477

MES Weaver

hydadm user

Used by MPDV:

MPDV Support uses this user to view the database.

Password can be changed:

YES

Password is changed by:

MPDV

MPDV Support has to be informed about the modification and the new password.

SIS-MWV_30.docx

Version: 1.5.19608

Page 83 of 477

MES Weaver

6  Time-Controlled Host Interfacing

Usage

You  use  the  time-controlled  host  interfacing  in  order  to  transfer  files  from  other  systems  (e.g.  ERP

systems)  to  the  HYDRA  server  on  a  cyclical  basis  (time-controlled)  or  in  order  to  transfer files  from  the

HYDRA server to other systems using HYDRA Scheduler.

The different interface files are each processed, or rather made available, on the HYDRA server by the

HYDRA MLE file port interface.

Here, the system supports the following transmission type and operating system combinations:

HYDRA server

Linux

Windows

External system

UNIX

Windows

FTP, NFS

FTP

FTP

FTP, UNC

Other (e.g. AS/400)

FTP

FTP

SIS-MWV_30.docx

Version: 1.5.19608

Page 84 of 477

MES Weaver

Requirement

To use the time-controlled host interfacing, the requirements listed below must be met:

Transfer protocol

In order to  exchange data  with an external system, it must be possible to access it via  FTP (Port

21). If both systems run on identical operating systems, alternately  you can also make use of the

following solutions:

UNIXUNIX:

Specify  the  path  on  the  mounted  NFS  share  (Network  File  System)

WindowsWindows

Specify UNC path (Universal Naming Convention) on a network share

Access authorization for NFS connections

The external system's NFS share must be installed on the HYDRA server.

HYDRA (user "hydadm") requires read and write access rights to the installed directory in order

to be able to rename, copy and delete files there.

Access authorization for UNC connections

HYDRA (user "hydadm") requires read and write access rights to the network share in order to

be able to rename, copy and delete files there.

To  test  the  access  rights  to  the  network  share  via  the  specified  UNC  path,  log  onto  the  HYDRA

server  as  user  "hydadm"  and  enter  the  following  command  in  a  Windows  command  prompt:

  "dir \\ServerName\FreigabeName"

The content of the network share "ShareName" must be displayed without any errors.

SIS-MWV_30.docx

Version: 1.5.19608

Page 85 of 477

User account of the "HYDRA<n> Scheduler" service

Exchanging  data  by  specifying  a  path  for  a  Windows  -  Windows  connection  requires  that  the

"HYDRA<n> Scheduler" service is run as the user "hydadm".

MES Weaver

The  user  "hydadm"  on  the  HYDRA  server  must  be  able  to  access  the  shares  on  the  external

system, which requires that he has the relevant access rights.

FTP command needed for an FTP connection

"open", "login": USER, PASS

"binary": TYPE I

(only "ASCII" is possible on AS/400)

"rename": RNFR, RNTO

"Is": LIST

"delete": DELE

"put": STOR

"get": RETR

"cd": CWD

"close": QUIT

"r(emote)help": HELP

"quote time":

(AS/400: increase inactivity timeout)

SIS-MWV_30.docx

Version: 1.5.19608

Page 86 of 477

MES Weaver

FTP interfacing causes problems on various HP-UX systems if the clear text name of the PPS

server is being used. At this time, the problem can only be avoided by using the IP address .

The FTP server version 1.7.212.1 on HP-UX 10.20.x is faulty and therefore cannot be used.

The currently available and tested version for this platform is 1.7.212.5.

SIS-MWV_30.docx

Version: 1.5.19608

Page 87 of 477

Data exchange process - external system  HYDRA

MES Weaver

SIS-MWV_30.docx

Version: 1.5.19608

Page 88 of 477

Data exchange process - HYDRA  external system

MES Weaver

Available program parameters

Parameter

Use/ possible entries

r
o
f
y
l
n
o

P
T
F

l
a
n
o
i
t
p
O

P
T
F
r
o
f

l
a
n
o
i
t
p
O

SIS-MWV_30.docx

Version: 1.5.19608

Page 89 of 477

Parameter

Use/ possible entries

MOD=PUT|GET

Defines the direction of communication

MES Weaver

r
o
f
y
l
n
o

P
T
F

l
a
n
o
i
t
p
O

P
T
F
r
o
f

l
a
n
o
i
t
p
O

PUT  HYDRA  external system

GET  External system  HYDRA

Host name of the external system

User name used to log on

User's password

X

X

X

HOST=

USER=

PWD=

REMOTE=

File name on the external system

REMOTEMASK=

Alternately, the remote system file that is defined

via  the  REMOTE  parameter  can  be  created  so

that

it

is

formatted  as  specified

in

the

REMOTEMASK parameter.

The

following  options  are  available

for

formatting.

LOCAL=

File name on the HYDRA system

LOCALMASK=

Alternately,  the  local  file  that  is  defined  via  the

LOCAL  parameter  can  be  created  so  that  it  is

formatted  as  specified

in

the  LOCALMASK

parameter.

The

following  options  are  available

for

formatting.

TMP=

File  name  of  the  temporary  file  (both  for  the

X

remote as well as for the local server)

If  the  external  system  runs  on  an  AS/400

operating  system,

this  parameter  must  be

specified.

SIS-MWV_30.docx

Version: 1.5.19608

Page 90 of 477

Parameter

Use/ possible entries

FTPMOD=B|A

FTP transfer mode

MES Weaver

r
o
f
y
l
n
o

P
T
F

l
a
n
o
i
t
p
O

P
T
F
r
o
f

l
a
n
o
i
t
p
O

X

B

A

Binary (default)

ASCII

If  the  external  system  runs  on  an  AS/400

operating system, "A" must be used.

CMD=

Shell script on the local server that starts

X

in "GET" mode after the file transfer

in "PUT" mode before the file transfer

.

If  the  CMD  specification  contains  spaces,  the

CMD must be enclosed within quotation marks!

Example: CMD="sh.exe hy6adrck.scr"

ALARM=

Time out

Communication  is  interrupted  after  the  defined

time (in seconds) (only in Windows) .

Configuration – Ext. System (Windows)  HYDRA (Windows) via UNC

Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as

an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=GET

SIS-MWV_30.docx

Version: 1.5.19608

Page 91 of 477

MES Weaver

Parameter name

Value

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"

Comment:

Interval

Data supply ERP  HYDRA

5

Configuration – Ext. System (UNIX)  HYDRA (Linux) via NFS

Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as

an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=GET

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"

Comment:

Interval

Data supply ERP  HYDRA

5

Configuration – Ext. System (UNIX)  HYDRA (Linux) via FTP

Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as

an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

SIS-MWV_30.docx

Version: 1.5.19608

Page 92 of 477

Parameter name

Value

Command (Windows):

sh.exe ./hyd_zhk.scr

MES Weaver

MOD=GET

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="/pfad/dateiname"

Data supply ERP  HYDRA

5

Comment:

Interval

Configuration – Ext. System (AS/400)  HYDRA (Windows) via FTP

Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as

an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=GET

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="/pfad/dateiname"

FTPMODE=A

TMP=tmp_hy72pps.dat

Data supply ERP  HYDRA

5

Comment:

Interval

SIS-MWV_30.docx

Version: 1.5.19608

Page 93 of 477

MES Weaver

The  temporary  intermediate  file  must  not  have  the  extension  .tmp,  otherwise  the  datasets  will

be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during

deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration – Ext. System (Linux)  HYDRA (Windows) via FTP

Edit entries for the HYDRA inbound processing in HYDRA Scheduler (using the EIS-ERP interface as an

example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=GET

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="/pfad/dateiname"

Data supply ERP  HYDRA

5

Comment:

Interval

Configuration – Ext. System (AS/400)  HYDRA (Linux) via FTP

Edit entries for the HYDRA input batch processing in HYDRA Scheduler (using the EIS-ERP interface as

an example):

Parameter name

Value

Product key

SIS-MWV

SIS-MWV_30.docx

Version: 1.5.19608

Page 94 of 477

MES Weaver

Parameter name

Value

License key

SIS-MWV

Command (Windows):

Comment:

Interval

./hyd_zhk.scr

MOD=GET

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72PPS.dat

REMOTE="/pfad/dateiname"

FTPMODE=A

TMP=tmp_hy72pps.dat

Data supply ERP  HYDRA

5

The  temporary  intermediate  file  must  not  have  the  extension  .tmp,  otherwise  the  datasets  will

be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during

deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration – HYDRA (Windows)  Ext. System (Windows) via UNC

Edit entries for the HYDRA output batch  processing  in  HYDRA  Scheduler (using the  EIS-ERP interface

as an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=PUT

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

SIS-MWV_30.docx

Version: 1.5.19608

Page 95 of 477

MES Weaver

Parameter name

Value

REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"

Comment:

Interval

Data supply HYDRA  ERP

5

Configuration –HYDRA (Linux)  Ext. System (UNIX) via NFS

Edit entries for the HYDRA output batch  processing  in  HYDRA  Scheduler (using the  EIS-ERP interface

as an example):

Parameter name

Value

Product key

License key

Command (Windows):

SIS-MWV

SIS-MWV

./hyd_zhk.scr

MOD=PUT

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

REMOTE="\\\\\\\\server\\\\freigabe\\\\pfad/dateiname"

Comment:

Interval

Data supply HYDRA  ERP

5

Configuration –HYDRA (Linux)  Ext. System (UNIX) via FTP

Edit entries for the HYDRA output batch  processing  in  HYDRA  Scheduler (using the  EIS-ERP interface

as an example):

Parameter name

Value

Product key

License key

Command (Windows):

SIS-MWV

SIS-MWV

./hyd_zhk.scr

MOD=PUT

SIS-MWV_30.docx

Version: 1.5.19608

Page 96 of 477

Parameter name

Value

MES Weaver

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

REMOTE="/pfad/dateiname"

Comment:

Interval

Data supply HYDRA  ERP

5

Configuration –HYDRA (Windows)  Ext. System (AS/400) via FTP

Edit entries for the HYDRA output batch  processing  in  HYDRA  Scheduler (using the  EIS-ERP interface

as an example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=PUT

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

REMOTE="/pfad/dateiname"

FTPMODE=A

TMP=tmp_HY72ADRCK_TT.dat

Data supply HYDRA  ERP

5

Comment:

Interval

SIS-MWV_30.docx

Version: 1.5.19608

Page 97 of 477

MES Weaver

The  temporary  intermediate  file  must  not  have  the  extension  .tmp,  otherwise  the  datasets  will

be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during

deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Configuration –HYDRA (Windows)  Ext. System (Linux) via FTP

Edit  entries  for  HYDRA  outbound  processing  in  HYDRA  Scheduler  (using  the  EIS-ERP  interface  as  an

example):

Parameter name

Value

Product key

License key

SIS-MWV

SIS-MWV

Command (Windows):

sh.exe ./hyd_zhk.scr

MOD=PUT

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

REMOTE="/pfad/dateiname"

Comment:

Interval

Data supply HYDRA  ERP

5

Configuration – HYDRA (Linux)  Ext. System (AS/400) via FTP

Edit entries for the HYDRA output batch  processing  in  HYDRA  Scheduler (using the  EIS-ERP interface

as an example):

Parameter name

Value

Product key

SIS-MWV

SIS-MWV_30.docx

Version: 1.5.19608

Page 98 of 477

MES Weaver

Parameter name

Value

License key

SIS-MWV

Command (Windows):

Comment:

Interval

./hyd_zhk.scr

MOD=PUT

HOST=<server>

USER=<ftpuser>

PWD=<ftppasswd>

LOCAL=./inf_int/interf/HY72ADRCK_TT.dat

REMOTE="/pfad/dateiname"

FTPMODE=A

TMP=tmp_HY72ADRCK_TT.dat

Data supply HYDRA  ERP

5

The  temporary  intermediate  file  must  not  have  the  extension  .tmp,  otherwise  the  datasets  will

be abbreviated!

If AS/400 is configured to use periods in file names, only "members" of a file are deleted during

deletions via FTP, not the entire file. For this reason, in order for a process flow to run correctly,

you will need to coordinate additional file handling measures with MPDV.

Options for REMOTEMASK/ LOCALMASK

Format Code
%a
%A
%b
%B
%c
%d
%H
%I
%j
%m
%M
%p
%S

Meaning
Abbreviated weekday name
Full weekday name
Abbreviated name of a month
Full name of a month
Date and time display matching local settings
Day of the month as a decimal number (01 - 31)
Hour in a 24-hour format (00 - 23)
Hour in a 12-hour format (01 - 12)
Day of the year as a decimal number (001 - 366)
Month as a decimal number (01 - 12)
Minute as a decimal number (00 - 59)
Display of A.M. or P.M. for the 12-hour format
Second as a decimal number (00 - 59)

SIS-MWV_30.docx

Version: 1.5.19608

Page 99 of 477

MES Weaver

Format Code
%U

%w
%W

%x
%X
%y
%Y
%z, %Z
%%

Meaning
Week of the year as a decimal number, whereas Sunday is the first day of the week (00
- 53)
Weekday as a decimal no. (0 - 6; Sunday is 0)
Week of the year as a decimal number, whereas Monday is the first day of the week (00
- 53)
Date display for local settings
Time display for local settings
Year not including century as a decimal number (00 - 99)
Year including century as a decimal number
Time zone name or abbreviation; no output if time zone is unknown
Percentage

The # flag may prefix any  formatting code. In that case, the  meaning of the format code is changed as

follows.

The # flag may prefix any  formatting code. In that case, the meaning of the format code is changed as

follows.

Format Code
%#a,  %#A,  %#b,  %#B,  %#p,  %#X,

Meaning
# flag is ignored.

%#z, %#Z, %#%

%#c

%#x

Long  date  and  time  display  matching  local  settings  For

example: "Tuesday, March 14, 1995, 12.41: 29".

Long  date  display  matching  local  settings  For  example:

"Tuesday, March 14, 1995".

%#d,  %#H,  %#I,  %#j,  %#m,  %#M,

Remove leading zeros (if any).

%#S, %#U, %#w, %#W, %#y, %#Y

SIS-MWV_30.docx

Version: 1.5.19608

Page 100 of 477

MES Weaver

7  MLE Communication

Usage

You  use  the  MES  Link  Enabling  (MLE)  communication  to  exchange  data  between  MES  and  other

systems,  e.g.  ERP  or  warehouse  management  systems.  MES  Link  Enabling  provides  a  framework  that

can be used by the applications (application interfaces).

Integration

The MLE framework is used by many application interfaces.

Basics

HYDRA  provides  the  MES  Link  Enabling  communication,  in  the  following  referred  to  as  MLE,  for  the

communication with PPS systems in general and SAP R/3 or ECC in particular.

MLE is a program environment enabling the data transfer with external systems. For this purpose,



file servers and file clients for the data exchange on file level and

  RFC servers and RFC clients for the data exchange with SAP

are used. The MLE inbound dispatcher for HYDRA inbound processing is used in any case, irrespective

of the external system with which data are exchanged.

IDoc (Intermediate Document)

IDocs  (intermediate  documents)  are  used  to  exchange  data  within  a  PPS  system  as  well  as  between

several PPS systems or between PPS systems and third-party systems.

IDocs are containers for the data exchange between systems. IDocs may be flat or can also have multi-

level  hierarchies.  Data  is  summarized  to  logical  units  or  “clusters”,  the  so-called  IDOCs,  within  one  file.

These IDOCs act like a “bracket” around data contents of the same nature and structure and therefore,

several of these “clusters” can be transferred within one file. Although each IDoc corresponds to a defined

data type/structure, the format does not depend on the content or the type of content.

In general, IDocs include a control record, several data segments and a status record. The control record

exists exactly once per IDoc. It contains all pieces of information that are necessary to send and process

the IDoc. The message type, the IDoc type as well as the dispatching and receiving (logical) system, for

example, belong to this kind of information. The control record can be compared with an envelope where

address information is written.

SIS-MWV_30.docx

Version: 1.5.19608

Page 101 of 477

MES Weaver

The  data  segments  of  the  IDoc  include  actual  data.  Each  segment  consists  of  preliminary  information

specifying  the  data  structure.  The  user  data  itself  are  filed  in  a  uniform  field  without  structure.  The

segments can also be built up hierarchically.

Different processing steps are executed while an IDoc is being processed. Another status record is added

for each step. These records help keep track of the processing steps and their result.

RFC technology

The Remote Function Call (RFC) constitutes the basis for the data exchange between SAP R/3 or ECC

and subsystems. This remote function call renders it possible to call SAP functions from external systems

virtually  via  remote  control.  The  Transactional  Remote  Function  Call  (tRFC)  is  an  enhancement  of  this

technology.

The transactional RFC provides for an independence of other systems to a great extent. The basis for this

procedure is the dispatching system's obligation (RFC client) to call the receiving system over and over

again, provided that the communication could not be built up or in case of an interruption. However, this

happens only as long as the transaction has once been transferred successfully.

A  worldwide  unique  transaction  number  (TID)  is  allocated  for  each  transaction  in  order  to  guarantee

consistent data retention even in case communication is interrupted.

MLE RFC server

An RFC server logs on to an SAP gateway and waits for data. If these data arrive they are accepted and

filed in a database or a file. Then the server waits for data again.

There are different modes to log an RFC server on to an SAP gateway. The “Registering Mode” is used

within the mySAP communication, in doing so the RFC server registers its functions at the SAP gateway

and thus these functions can be called transparently within the SAP environment.

Different older communication models use other modes which, however, are not relevant within HYDRA.

The MLE-ALE server (hyalesrv.exe) takes over the  RFC server functions, when it comes to the HYDRA

MLE communication.

MLE RFC client

An RFC client  transfers data from HYDRA to  SAP  R/3 or  ECC. To do so, the RFC client  logs  on to an

SAP system and calls a specific function module. This can be a synchronous or asynchronous call.

The  MLE-RFC  client  takes  over  the  outbound  communication  with  R/3.  The  data  segments  created  in

HYDRA are transferred to the respective target system according to distribution specifications.

SIS-MWV_30.docx

Version: 1.5.19608

Page 102 of 477

MES Weaver

An upload to R/3 can be triggered in two ways.

  Triggered by an upload request from R/3

In this case, the RFC client has  to  be  entered  as processing program for the upload request in the

distribution model. The segment names of the upload IDoc have to be transferred as parameters.

  Cyclical upload

Provided  that  the  upload  is  to  be  triggered  actively  by  HYDRA,  the  HYDRA  Scheduler  can  assume

this task.

MLE File server

Besides the data exchange via remote function call, data can also be exchanged using file transfer. In this

case, the file server monitors a specific directory with respect to new files and transfers them to HYDRA.

The  file  client,  in  turn,  converts  HYDRA  uploads  into  files  and  archives  them  in  a  likewise  specified

directory.

The  files  have  to  be  named  like  the  message  types  defined  in  the  HYDRA  MLE  distribution  model.

HYDRA  inbound  processing  may  be  controlled  by  the  file  extension.  The  following  file  extensions  are

possible:



"APP“

Creating/modifying data



"UPD“

Replacing the dataset existing in HYDRA by the newly transferred data (initial download).



"DEL“

Deleting data



"DAT“

The extension is used for all other files. The message function “DAT“ is not transferred to

the IDoc control record.

If files assigned to the names from the distribution model and the above-mentioned extensions are found

these files are copied to the work directory, which is also defined in the configuration of the HYDRA MLE

file server, and the data records existing there are then transferred to the inbound tables of the HYDRA

MLE interface.

SIS-MWV_30.docx

Version: 1.5.19608

Page 103 of 477

MES Weaver

MLE File client

HYDRA  provides  data  (e.g.  confirmations/uploads  of  operations)  in  the  interface.  According  to  the

respective segment type, data are filed as such segments.

These  data  are  no  longer  interpreted  for  the  actual  communication  layer.  Through  corresponding

configuration of outbound processing, the segments are summarized in IDOCs, provided with respective

connection  details  and  a  file  client  makes  them  available  in  a  specified  directory  where  it  can  be

processed by the PPS system.

The HYDRA MLE file client assumes outbound processing on the basis of ASCII files. If a logical system

created  as  file  interface  is  assigned  to  a  message  type  the  data  are  archived  in  a  file  of  the  directory

defined in the configuration of the HYDRA MLE file client.

The upload or writing of the files in the specified directory is controlled cyclically by HYDRA.

MLE inbound dispatcher

The HYDRA MLE Dispatcher organizes inbound processing in HYDRA. It monitors inbound transactions

and determines and starts the respective processing routine (program) for transferring data to HYDRA for

new messages by means of the message type (from the MLE distribution model). Inbound transactions

are processed according to the sequence specified by the PPS system. Consequently, a transaction can

only be processed, once the previous transaction has been processed completely.

SIS-MWV_30.docx

Version: 1.5.19608

Page 104 of 477

 File server HYDRA Database Table HYSAP_INBOUND_DATA Table HYSAP_INBOUND_CTRL Ctrl record Data record IDoc File  including several  IDOCs Table HYSAP_DIST_MOD

The  following  diagram  shows  the  processing  steps  of  the  Dispatcher  when  processing  inbound

transactions:

MES Weaver

Log files and error files are created for the data transferred by HYDRA.

Logical systems

Each  system  landscape  consisting  of  test  and  production  system(s)  is  represented  as  logical  system  in

HYDRA. In HYDRA the configuration for inbound and outbound processing is defined with respect to this

logical system.

Special feature SAP R/3  or ECC

Third-party systems must be configured as logical system with a unique name within R/3 or ECC in order

for SAP R/3 or ECC to be able to communicate with them. This name is used as “address” when sending

IDocs. Moreover, the R/3 or ECC system is also configured as logical system.

Procedure for transferring data to HYDRA

A PPS interface program generates data with defined data structures and puts them in a transfer file in

order for them to be transferred to HYDRA.

These transfer files are to be provided in the HYDRA subdirectory ./inf_int/interf (standard system). This

directory is filed in the HYDRA directory or in case of a multiple system environment in the directory of the

instance.

Handshake  logic  for  transferring  the  files  needs  to  be  implemented  between  the  PPS  and  HYDRA  in

order to avoid any "overwriting" of transfer files and thus data loss.

In order to ensure reliable processing, the following steps need to be implemented:

SIS-MWV_30.docx

Version: 1.5.19608

Page 105 of 477

CheckingthereceiptofIDocsDetermineappropriateprogramin distributionmodelStart programUpload byprogramUpdate statusofthedatarecordMLEDispatcher

MES Weaver

The file to be provided by the PPS system must not exist under the documented name until it has been

released by HYDRA for being transferred and thus processed.

When  transferring  the  transfer  file  from  the  source  system  to  the  HYDRA  server,  the  file  has  to  be

transferred under a different name (a name other than the documented name) and it has to be renamed

to the defined file name, once it has been transferred. With Windows systems the file can be renamed by

the  REN  command  and  with  UNIX/LINUX  by  the  mv  command.  The  file  extensions  ".APP",  ".UPD",

".DEL" and ".DAT" are reserved for HYDRA. The ".TRF" extension is recommended.

In case a file is already included in the transfer directory, the system has to wait until HYDRA has taken

over this file before transferring a new file.

If the PPS system creates the file directly on the HYDRA server, it has to be ensured that the file does not

exist  under  the  documented  name  when  it  is  created,  written  or  appended.  However,  MPDV  does  not

recommend this procedure in general.

To prevent the file size from growing endlessly, the PPS system should interrupt the write process at 50

Mbyte and wait for the file server to collect the data. A new file may be written, once the file server has

removed the file. This is especially important for the initial download.

The file port is processing the data included in the interface directory as follows:

When  starting  the  service  /  process  (hyalesrv.exe/out)  the  message  types  to  be  recognized  are

determined and sorted according to the defined priority.

The  priority  is  digital  ("0"  =  No  priority  /  "1"  high  priority)  and  can  be  defined  in  the  HYDRA  distribution

model.

Within one message type the files are searched as follows in the interface directory:

1.  DEL / del

2.  APP / app

3.  UPD / upd

4.  DAT / dat

Procedure for transferring data from HYDRA

Within the PPS environment, an interface program assumes the task of preparing  the data structures of

the files transferred by HYDRA.

SIS-MWV_30.docx

Version: 1.5.19608

Page 106 of 477

MES Weaver

Handshake  logic  for  transferring  the  files  needs  to  be  implemented  between  the  PPS  and  HYDRA  in

order to avoid any "overwriting" of transfer files and thus data loss.

These transfer files are to be provided in the HYDRA subdirectory ./inf_int/interf (standard system). This

directory is filed in the HYDRA directory or in case of a multiple system environment in the directory of the

instance.

In order to ensure reliable processing, the following steps need to be implemented:

  Renaming of the upload file as another file, using the REN command with NT and the mv command

with UNIX.

  Transferring the renamed upload file into the PPS environment.

Please note

-  No copy command may be used in this step.

-  The file does not exist under the name as documented as long as it is being processed by HYDRA.

This  ensures  that  the  higher-level  system  cannot  access  the  file  before  HYDRA  has  finished

accessing it (secure handshake).

-  The file extensions ".APP, ".UPD", ".DEL" and ".DAT" are reserved for HYDRA. The ".TRF" extension

is recommended.

Automated interfacing

MPDV  recommends  using  a  gateway  including  corresponding  control  software  to  allow  for  the  HYDRA

server and the customer's server to be connected automatically. This gateway controls the data exchange

between  both  systems  and  both  directions.  As  an  alternative,  any  other  procedure  that  has  been

designed  for  a  secure  file  transfer  may  be  used,  especially  the  connection  of  both  systems  using  a

network file system.

Notes on the file format/codepage

The following conventions apply as regards codepage/character set:

MES-Weaver 3.0

Each  data  record  included  in  the  file  has  to  be  completed  by  'CR'  (0D  Hex)  and  'LF'  (0A  Hex)  in

Windows and 'LF' (0A Hex) with Unix.

HYDRA expects the file to be in the UTF-8 format and HYDRA also uses this format for uploads. On

request, the file transfer may also be performed in the file format that was used until MW 2.0.

SIS-MWV_30.docx

Version: 1.5.19608

Page 107 of 477

MES Weaver

8  Logical Systems

Overview

Menu

System Administration  MES Link Enabling (MLE)  Logical Systems

Transaction code

logsys.*

Function authorization

logsys.*

Usage

Logical systems are used to create external systems that MES has to exchange data with and to define

the  communication  type  and  method.  Various  settings  must  be  defined  for  the  input  and  output

communication, depending on the communication type.

A logical system is defined for each connected (ERP) system. A logical system corresponds to an ERP

system  that  is  communicated  with.  Each  of  the  logical  systems  has  three  connection  configurations

(roles),  one  of  which  is  active  at  any  given  time.    We  can  distinguish  between  a  test,  integration  and

production system. A configuration can be switched to another system at any point in time by flipping a

switch. This ensures a simple switch over to the production system when the system goes live.

The logical system for an RFC connection to SAP R/3 is called "SAP" by default.

The logical system for a file interface (HY72PPS) is called "FP" by default and is created when

HYDRA is installed initially.

Multiple logical systems can be defined if communication to more than one system is required.

Please note that the corresponding MLE servers need to be started. These have to be set up as

a service or process.

Integration

The Distribution model maintenance is used to assign input and output messages to the logical systems

that have been created.

Maintenance functions

Insert / Edit / Delete

These maintenance functions operate on the logical system.

The communication mode can be defined when creating a new logical system.

SIS-MWV_30.docx

Version: 1.5.19608

Page 108 of 477

MES Weaver

Logical system maintenance can be used to modify the active role or deactivate the logical system.

Inbound / Outbound Configuration

The  settings  for  the  program  type  (input/output  processing)  and  the  actual  role  can  be  activated

through the inbound/outbound configuration. These settings depend on the communication mode.

Test Connection

A connection of type RFC can be used to test the base data and to establish the test connection. In

this case no user data are transmitted.

Field descriptions

Logical System

This field is used to store a unique designation of the partner system.

Description

This field is used to store a description of the partner system.

Active Role

For  each  logical  system,  three  records  can  be  defined  for  the  technical  connection  parameters.

These are called roles (test, integration and production). Each logical system can be active in one of

these three roles.

This ensures a simple switch over when the system goes live.

Communication Mode

The communication mode determines whether the connection to the partner system is established

via  RFC  (RFC  connection)  or  whether  the  data  are  transferred  using  file  transfer  (File  interface).

Customer  specific  variants  can  be  managed  through  the  specialized  communication  modes  PDM

connection and USER connection.

Procedure

Various  parameters  must  be  maintained,  depending  on  the  selected  communication  mode  and  the

program type. The procedure is described in the following documents:

Communication Mode

Document

RFC Connection

File Interface

PDM Connection

USER Connection

RFC Connection Configuration

File Interface Configuration

PDM Connection Configuration

USER Connection Configuration

SIS-MWV_30.docx

Version: 1.5.19608

Page 109 of 477

9  Distribution Model

Menu

System administration  MES Link Enabling (MLE)  Distribution model

MES Weaver

Transaction code

dispmod

Function authorization

dispmod.*

Purpose

You use the distribution model as follows:

  You specify the processing of data-in in the system

  You specify the (logical) system that is used to upload data-out.

Integration

The message type is the key field for the INBOUND. For each message type, the responsible process is

specified in the distribution model. On receipt of an IDoc, the processing is identified using the message

type. The dispatcher then calls this processing.

For the OUTBOUND, the  segment name is the key field. In case  of an  upload,  the  data segments of a

configured  segment  name  are  bundled  to  an  IDoc.  The  enriched  communication  attributes  are  then

passed to the PPS system.

Requirements

You have edited the logical systems that you use to exchange data.

Field descriptions

Message type

Inbound:

The  message  type  is  used  to  identify  the  data  passed  in  the  data  package.  The  message  type

therefore controls the inbound processing in HYDRA.

Outbound:

The message type is not a key field for the outbound processing.

However,  the  message  type  is  required  for  inbound  processing  in  SAP  R/3.  It  identifies  the

processing  type  of  incoming  data.  Information  on  the  message  type  can  be  found  in  the  SAP

distribution model (SAP transaction BD64), the SAP partner profile (SAP transaction WE20) or the

respective SAP documentation (e.g. for HR-PDC or PP-PDC).

SIS-MWV_30.docx

Version: 1.5.19608

Page 110 of 477

MES Weaver

If a system of type file interface is defined as logical system (file port), the message type is used for

the file name of the file generated by the file client. The file extension is stored in the configuration

of the logical system.

Message code

The message code is used to further specify the message type. The information if such a message

code is used can be found e.g. in the SAP partner profile (SAP transaction WE20).

For systems of type file interface (file port): not relevant.

Message function

Just like the message code, the message function specifies the message type. The information if a

message function is required can be found in the SAP partner profile (SAP transaction WE20).

For systems of type file interface (file port): not relevant.

IDoc type

The IDoc type is used to define the structure of the IDoc data record, i.e. it specifies the segment

types that are included in the IDoc. Details on the IDoc type can be found in the SAP distribution

model  (SAP  transaction  BD64),  the  SAP  partner  profile  (SAP  transaction  WE20)  or  in  the

respective SAP documentation (e.g. HR-PDC or PP-PDC).

For systems of type file interface (file port): the IDoc type is equal to the message type.

Priority

The priority specifies if message types take priority in the processing. You can use the option fields

to prioritize the current message type.

Command

In this line, enter the command (program name) that integrates data in the MLE data model.

Command parameter

If parameters must be passed to the requested program, define these parameters here.

Description

This field includes a plaintext description of the current configuration.

Log. target system

Inbound:

The entry in this field identifies the partner system that passes the data.

Outbound:

The entry in this field identifies the PPS system the data is passed to.

Retention period (in days)

The retention period specifies how long data is saved. After the specified time, the data is deleted.

The time is specified in days.

SIS-MWV_30.docx

Version: 1.5.19608

Page 111 of 477

MES Weaver

The data is internally moved to an archive table at an earlier point in time. The data is still available.

You can access this data, if you enable the parameter "Consider long-term data" in the applications

"Inbound transactions“ and "Outbound transactions".

For details on the MLE archiving, refer to the documentation of the MLE Archiving.

Segment name 1

The  segment  name  1  is  the  actual  key  field.  Based  on  this  entry,  data  is  selected  from  the

OUTBOUND  structure  and  bundled  to  an  IDoc.  If  an  IDoc  includes  several  segments,  these

segments are structured hierarchically.

Segment name 2

With  logical  systems,  you  can  use  segment  name  2  for  the  communication  type  "file".  Segment

name 2 specifies the file name of the file created in the outbound (including file extension).

The file name specified here is integrated in the MLE outbound processing as follows:

  Work directoy

<file  name  entered  including  extension>.<extension  according  to  configuration  of  the  logical

system>



Interf directory

<file name entered including extension>

Segment name 3 - 10

Currently not used.

Toolbar

Inbound configuration – Insert/Copy/Edit

The  dialog  provides  the  required  input  fields  to  create  or  edit  a  data  record  for  an  inbound

configuration.

Outbound configuration – Insert/Copy/Edit

The  dialog  provides  the  required  input  fields  to  create  or  edit  a  data  record  for  an  outbound

configuration.

The activation of the buttons Copy and Edit depends on the value in field Data flow:

-

I (Inbound)  Copy / Edit of inbound configurations is activated

-  O (Outbound)  Copy / Edit of outbound configurations is activated

SIS-MWV_30.docx

Version: 1.5.19608

Page 112 of 477

MES Weaver

10  Status Monitor MLE Communication

Summary

Menu

System Administration  MES Link Enabling (MLE)   Status Monitor MLE
Communication

Transaction code

stamo

Function authorization

stamo

Utilization

You  use  the  status  monitor  to  get  an  overview  over  the  processes/programs  that  run  constantly  or

cyclically as a part of MES Link Enabling (MLE). The application  enables fast diagnoses on the process

status and the protocols of these processes can be accessed easily.

Integration

The status monitor represents the statuses and further information on the involved processes. The type of

implementation specifies whether or not the process is included in the list.

Field Description

Status

Status of the process. The following statuses are possible:

RUN

The process has been closed successfully Der.

IDL

The process is currently running.

STOP

Application

Technical designation of the application

Logical system

Reference to the logical system for which the process was/is executed.

Role

Active role of the logical system with which the process was started the last time.

Designation

Designation of the application

SIS-MWV_30.docx

Version: 1.5.19608

Page 113 of 477

Program

Technical name of the process/program (without file extension)

MES Weaver

Program version

Program version

Program date

Date when the program was created

Last run

Last execution of the process

Log file and log file size / Error file and error file size / Data file and data file size

File name and file size in the categories “protocol”, “error” and “data”

Number of data records

Number of data records included in the transaction of the last run

Number of edited data records

Number of data records included in the transaction that have been processed successfully the last

time

Number erroneous data records

Number of erroneous data records included in the transaction the last time

Number of unknown data records

Number of data records included in the transaction that were unknown during processing of the last

run

Message

Text output of the process

Segment

Processed segment

This table is to be used for the documentation of notes (template).

SIS-MWV_30.docx

Version: 1.5.19608

Page 114 of 477

This table is to be used for the documentation of warnings (template).

MES Weaver

Toolbar

  Log

Shows the protocol generated by the respective application.

  Error file

Shows the error log generated by the respective application.

  Data file

Shows the data file that is generated optionally by the respective application.

SIS-MWV_30.docx

Version: 1.5.19608

Page 115 of 477

MES Weaver

11  Inbound Transactions

Summary

Menu

System administration  MES Link Enabling (MLE)  Inbound Transactions

Transaction code

intr

Function authorization

intr

intr.reset (reset transactions)

Utilization

Inbound transactions provide an overview of the data provided form other systems as well as the result of

the  inbound  processing  that  follows.  The  application  allows  for  detailed  data  to  be  displayed  or  new

posting processes to be triggered.

Integration

The function allows for data transferred from other systems to be accessed. Other system might be:

  PPS/ERP systems

  Warehouse/material management systems

  Quality management systems

Field Descriptions

Field Descriptions – Inbound Transactions

Transaction number

Unique number that is generated while communicating with the external system.

Status

The  status  represents  the  result  of  the  last  processing  step.  The  used  status  are  visualized  as

follows:

Description in the application  Color

Meaning / usage

NEW

Yellow

The  record  has  been  provided

initially.  Further  processing  still

have to take place.

TODO

Yellow

It  has  been  tried  already,  to

SIS-MWV_30.docx

Version: 1.5.19608

Page 116 of 477

Description in the application  Color

Meaning / usage

MES Weaver

REACTIVATED

Orange

IN PROCESS

UNKNOWN

DONE ERROR

Grey

Blue

Red

post  the  record.  This  attempt

has  not  been  successful  (for  a

certain  reason)  –  the  record  is

available

to

new

posting

attempt.

A  record  posted  already  has

been  marked  for  an  additional

posting attempt.

The record is posted currently.

There

is  no  valid  posting

routine for the record.

The record could not be posted

successfully.

DONE

Green

The  record  could  be  posted

successfully.

IDoc type

IDoc type of the transaction (whether or not the field is filled out, depends on the communication type).

No. of data records

Number of data records included in the transaction

No. of edited DR (data records)

Number of successfully processed data records included in the transaction

No. of unknown data records

Number of unknown data records included in the transaction

No. of erroneous data records

Number of faulty data records included in the transaction (wrong processing)

Time of reception

Date and time when the system received the transaction

Editing time

Date and time when the transaction was edited in the system

SIS-MWV_30.docx

Version: 1.5.19608

Page 117 of 477

IDoc number

IDoc number of transactions (whether or not the field is filled out depends on the communication type).

MES Weaver

Message type

Message type of the transaction

Message function

Message function of the transaction

SAP sending port

SAP sending port – only relevant if the communication with SAP is performed via IDoc

SAP sending partner type

SAP sending partner type – only relevant if the communication with SAP is performed via IDocs

SAP sending partner number

SAP sending partner number – only relevant if the communication with SAP is performed via IDocs

Receiver port

Receiver port – only relevant if the communication with SAP is performed via IDocs

Receiver partner type

Receiver partner type – only relevant if the communication with SAP is performed via IDocs

Receiver partner number

Receiver partner number – only relevant if the communication with SAP is performed via IDocs

Reference

Unique database key

Duration

Duration of system processing

Number of attempts

Number of processing attempts

Field Descriptions – Log Table

Application

Application involved in the processing and editing of the transaction

Log. System

Logical system

SIS-MWV_30.docx

Version: 1.5.19608

Page 118 of 477

MES Weaver

Role

Role of the logical system

Designation

Designation of the application

Transaction number

Transaction number that has been processed

Status

Status of processing

Reference

Unique database key

Program

Technical name of the application

Program version

Program version of the application

Program date

Program date of the application

Log file name / log file size

Name and size of the log file

Error file name/error file size

Name and size of the error file

Data file name/data file size

Name and size of the data file

No. of data records

Number of data records included in the transaction

No. of edited data records

Number of successfully processed data records included in the transaction

No. of unknown data records

Number of unknown data records included in the transaction

No. of faulty data records

Number of faulty data records included in the transaction (wrong processing)

SIS-MWV_30.docx

Version: 1.5.19608

Page 119 of 477

MES Weaver

Text number

Currently not used

Posting

Currently not used

Created on

Point in time when the entry was created

Toolbar

Reset transaction

The “reset transaction” button allows for a transaction that has already been processed to be processed

again. But this is only possible if the transaction has not yet been archived.

  Data segments

Data segments may be displayed for a transaction. The system tries to display included application data

in relation to individual fields within the data record.

Log

Displays the log generated by the respective application.

  Error file

Displays the error log generated by the respective application.

  Data file

Displays the data file that is optionally generated by the respective application.

SIS-MWV_30.docx

Version: 1.5.19608

Page 120 of 477

MES Weaver

12  Outbound Transactions

Overview

Menu

System Administration  MES Link Enabling (MLE)  Outbound Transactions

Transaction code

outtr

Function authorization

outtr

Purpose

Outbound transactions provide an overview of the data provided to other systems as well as the result of

the  outbound  processing  that  follows.  The  application  allows  for  detailed  data  to  be  displayed  or  new

posting processes to be triggered.

Integration

The function allows for data transferred to other systems to be accessed. Other system might be:

  PPS/ERP systems

  Warehouse/material management systems

  Quality management systems

Field Descriptions

Field Descriptions – Outbound Transactions

Transaction number

Unique number that is generated while communicating with the external system.

Status

The  status  represents  the  result  of  the  last  processing  step.  The  used  status  are  visualized  as

follows:

Description in the application  Color

Meaning / usage

NEW

Yellow

TODO

Yellow

The  record  has  been  provided

initially.  Further  processing  still

have to take place.

It  has  been  tried  already,  to

post  the  record.  This  attempt

SIS-MWV_30.docx

Version: 1.5.19608

Page 121 of 477

Description in the application  Color

Meaning / usage

MES Weaver

REACTIVATED

Orange

IN PROCESS

UNKNOWN

DONE ERROR

Grey

Blue

Red

has  not  been  successful  (for  a

certain  reason)  –  the  record  is

available

to

new

posting

attempt.

A  record  posted  already  has

been  marked  for  an  additional

posting attempt.

The record is posted currently.

There

is  no  valid  posting

routine for the record.

The record could not be posted

successfully.

DONE

Green

The  record  could  be  posted

successfully.

IDoc type

IDoc type of the transactions (whether or not the field is filled out, depends on the communication type).

No. of data records

Number of data records included in the transaction

No. of edited DR (data records)

Number of successfully processed data records included in the transaction

No. of unknown data records

Number of unknown data records included in the transaction

No. of erroneous data records

Number of faulty data records included in the transaction (wrong processing)

Time of reception

Date and time when the system received the transaction

Editing time

Date and time when the transaction was edited in the system

SIS-MWV_30.docx

Version: 1.5.19608

Page 122 of 477

IDoc number

IDoc number of transactions (whether or not the field is filled out depends on the communication type).

MES Weaver

Message type

Message type of the transaction

Message function

Message function of the transaction

SAP sending port

SAP sending port – only relevant if the communication with SAP is performed via IDoc

SAP sending partner type

SAP sending partner type – only relevant if the communication with SAP is performed via IDocs

SAP sending partner number

SAP sending partner number – only relevant if the communication with SAP is performed via IDocs

Receiver port

Receiver port – only relevant if the communication with SAP is performed via IDocs

Receiver partner type

Receiver partner type – only relevant if the communication with SAP is performed via IDocs

Receiver partner number

Receiver partner number – only relevant if the communication with SAP is performed via IDocs

Reference

Unique database key

Duration

Duration of system processing

Number of attempts

Number of processing attempts

Field Descriptions – Log Table

Application

Application involved in the processing and editing of the transaction

Log. System

Logical system

SIS-MWV_30.docx

Version: 1.5.19608

Page 123 of 477

MES Weaver

Role

Role of the logical system

Designation

Designation of the application

Transaction number

Transaction number that has been processed

Status

Status of processing

Reference

Unique database key

Program

Technical name of the application

Program version

Program version of the application

Program date

Program date of the application

Log file name / log file size

Name and size of the log file

Error file name/error file size

Name and size of the error file

Data file name/data file size

Name and size of the data file

No. of data records

Number of data records included in the transaction

No. of edited data records

Number of successfully processed data records included in the transaction

No. of unknown data records

Number of unknown data records included in the transaction

No. of faulty data records

Number of faulty data records included in the transaction (wrong processing)

SIS-MWV_30.docx

Version: 1.5.19608

Page 124 of 477

MES Weaver

Text number

Currently not used

Posting

Currently not used

Created on

Point in time when the entry was created

Toolbar

 Reset transaction

Use the “reset transaction” button to process a transaction that has already been processed. This is only

possible if the transaction has not yet been archived.

During  reactivation,  the  control  record  of  the  transaction  is  set  to  the  status  REACTIVATED.  The  data

records included in the transaction are set to status TODO. Once the data records are transferred and are

then  included  in  another  transaction,  there  is  no  connection  between  the  control  record  of  the  original

transaction  and  these  data  records  –  you  cannot  show  data  records  for  the  original  control  record  any

more.

  Data segments

Data segments may be displayed for a transaction. The system tries to display  included application data

in relation to individual fields within the data record.

  Log

Displays the log generated by the respective application.

  Error file

Displays the error log generated by the respective application.

  Data file

Displays the data file that is optionally generated by the respective application.

SIS-MWV_30.docx

Version: 1.5.19608

Page 125 of 477

13 MLE Archiving

Overview

MES Weaver

MLE archiving is divided into two essential steps:



In the first step data is transferred from online tables to archive tables. The affected time range

can be configured by a program parameter.



In  the  second  step  data  is  deleted  from  archive  tables. The  affected  time  range  can  directly  be

specified via the application.

Moving data to archive tables

Moving data from online tables to archive tables is controlled via the program parameter of the archiving

program hysaparc.exe/out. If no parameter is specified as supplied with the standard system, all data will

be moved from MLE inbound and outbound transactions to archive tables. But the following must apply:

The editing data is less than or equal to the current date minus the program parameter set for archiving.

Proceed as described below to change the default setting (2 days):



If Windows is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.exe /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

SIS-MWV_30.docx

Version: 1.5.19608

Page 126 of 477

MES Weaver



If Linux is used:

MLE  tables  are  archived  by  starting  the  script  hyarc.scr  in  the  HYDRA  directory  (HYDRADIR).

This script controls various archiving processes. By default, the script includes the following entry:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60

Add the below-mentioned program parameter including the required value to this entry. Using this

example, data is transferred to archive tables after 14 days:

hysaparc.out /TL=TRL_ALL /KEEPDAYS_UNKNOWN=60 /ARC_DAYS=14

Deleting data from archive tables

The retention period defined for each message type in the MLE distribution model specifies when archive

tables are cleared.

The stated retention period starts with the point in time of editing a transaction.

If the period for moving data from online tables to archive tables is increased to  14 days (see

example), the retention period should also be 14 days at least. Otherwise, data will immediately

be deleted from archive tables.

SIS-MWV_30.docx

Version: 1.5.19608

Page 127 of 477

MES Weaver

14 Logbook

Overview

Menu

System administration  Logging  Log book

Transaction code

lbook

Function authorization

For master entries:
logbook.hdins
logbook.hdupd
logbook.hddel
For detail entries:
logbook.dtins
logbook.dtupd

logbook.dtdel

Usage

This application allows for changes to the system to be maintained and managed in a log book integrated

in the system.

The  application  provides  master  entries  that  may  include  specific  administration  data.  As  many  detail

entries  as  required  can  be  assigned  to  a  master  entry.  For  each  master  entry  the  system  assigns  an

ascending, distinct number. But it is not mandatory for this number to be consecutive1.

In  addition  to  administrative  data,  a  long  text  may  be  stored  to  each  detail  entry.  The  application  also

provides a search function to search for these long texts. Each detail entry is aware of the reference to

the  corresponding  master  entry.  For  each  detail  entry  the  system  attributes  an  ascending  and  distinct

number across all generated detail entries.

Selection criteria / field descriptions – master entries

The following selection criteria referring to a master entry are available:

Master – entry created from / until

Date of creating the master entry

Reason

Reason for the modification / activity

1  The  reference  of  the  HYINFO  database  table  is  used  as distinct  number.  As  this  database table is  also used  for

other data, numbering of master entries of the log book might be incomplete.

SIS-MWV_30.docx

Version: 1.5.19608

Page 128 of 477

MES Weaver

Process owner

Person responsible for the process and/or ordering party (customer, internal, ...)

Reference

Reference to purchase orders / minutes / support cases, etc.

Person responsible

Who made the changes?

Master reference

Distinct identification of a master entry assigned by the system.

Title / short text

Title / short text

Selection criteria / field descriptions - detail entries

The following selection criteria referring to a detail entry are available:

Detail - entry created from / until

Date of creating the detail entry

Reference to log

Reference to purchase orders / minutes / support cases, etc.

Product (e.g. BDE, MPL, ...)

In which products have the settings been changed?

Object (e.g. machine, ...)

Which objects have been changed?

Search string

Recorded notes can be browsed by entering a search term.

An additional check has been implemented in the search service making sure the search function

stays  efficient.  The  number  of  resulting  data  records  is  checked  taking  the  transferred  selection

parameters into account. If they exceed 5,000 the search is rejected issuing an error message.

Please  note  that  the  search  is  not  case-sensitive.  This  means  it  does  not  differentiate  between

upper and lower case. The character "*" (asterisk - U+002A) can be used as placeholder/wildcard

character.

SIS-MWV_30.docx

Version: 1.5.19608

Page 129 of 477

The  search  result  shows  all  detail  entries  matching  the  search  term  and  the  master  entries

corresponding to these detail entries.

MES Weaver

SIS-MWV_30.docx

Version: 1.5.19608

Page 130 of 477

MES Weaver

15 Inspection for Business Parameter Containers (BSCs)

Overview

Inspection of the number of administered personnel master data

The  Business  Parameter  Container  "BSC-NCE"  presets  the  number  of  administered  personnel  master

data.

The  system  checks  how  many  people  are  active  at  the  current  point  in  time.    A  person  is  considered

active if the following requirements are fulfilled:

-  The current date is within the beginning of validity date up to the end of validity date.

-  The person has started on the current date and has not left.

-  The person has not been blocked for PZE.

Inspection is carried out for all maintenance activities where an active and current version of HR master

data is accrued:

-  When creating new, active HR master data versions

-  When changing HR master data version valid today if it changes from inactive to active.

The inspection is carried out for manual maintenance, i.e. in the MOC and during an interface run of all

HR master data interfaces.

SIS-MWV_30.docx

Version: 1.5.19608

Page 131 of 477

MES Weaver

Theoretically, too many prospective HR master data versions can take place as the inspection

is only carried out for today's valid HR master data versions. No new versions can be created if

the point in time is reached where all HR master data versions are valid. If the HR master data

interface DNPERSO from SAP-HCM is used, then the surplus HR master data is deactivated.

If  the  HR  master  data  interface  DNPERSO  from  SAP-HCM  is  used,  the  following  special

features must be adhered to:

It may occur that in an identical run of an interface a number of people is added and a number

of "old" ones is deleted or deactivated. Therefore, for the duration of the interface run "new" and

"old"  people  is  activated,  as  the  people  who  should  be  deleted  or  deactivated  can  only  be

identified at the end of the interface run. Thus, a  violation of the  limit for maximum number of

licensed people can occur in the short-term and some of the "new" people can be rejected. The

"new"  people  are  then  transferred  regularly  during  the  next  run  if  all  "old"  ones  have  been

deactivated.

Inspection of the number of administered employees in production

The  Business  Parameter  Container  "BSC-NPE"  presets  the  number  of  administered  personnel  master

data.

The  system  checks  how  many  people  are  active  at  the  current  point  in  time.    A  person  is  considered

active if the following requirements are fulfilled:

-  The current date is within the beginning of validity date up to the end of validity date.

-  The person has started on the current date and has not left.

-  The person has not been blocked for PZE.

-  The person is marked as production employee

Inspection is carried out for all maintenance activities where an active and current version of HR master

data is accrued:

-  When creating new, active HR master data versions

-  When changing HR master data version valid today if it changes from inactive to active.

The inspection is carried out for manual maintenance, i.e. in the MOC.

SIS-MWV_30.docx

Version: 1.5.19608

Page 132 of 477

MES Weaver

Inspection of the number of administered machines, aggregates or

workstations

The  Business  Parameter  Container  "BSC-NMW"  presets  the  the  number  of  administered  machines,

aggregates or workstations.

When identifying the current number in the system, all unblocked machines are taken into account.

Inspection of the number of machines with a DNC connection (Distributed

Numerical Control)

The Business Parameter Container "BSC-NDM" presets the maximum number of machines with a DNC

connection (Distributed Numerical Control).

The inspection is carried out during creation and copying of "Assignment DNC family to machine".

When identifying the current number in the system, the total number of all unblocked machines with an

assignment "DNC family to machine" is located.

Inspection of number of logical channels to record process values (tags)

The  Business  Parameter  Container  "BSC-NPT"  presets  the  maximum  number  of  logical  channels  to

record process values (tags).

When identifying the current number in the system, all logical channels are taken into account.

SIS-MWV_30.docx

Version: 1.5.19608

Page 133 of 477

MES Weaver

16 Errorcodes and Returncodes

16.1  Overview

The following section describes the meaning of error messages appearing at the terminal or the MOC due

to  certain  user  actions.  Error  messages  can  have  complex  causes  that  are  considered  in  detail  in  the

following.  Possible  solutions  for  the  respective  problems  are  indicated  for  each  error.  The  customer-

specific error messages ranging from 5000 to 6999 are described in the customer documentation

16.1.1  Errorcode 10: Order not available

Shortform:

Order not available

Description:

Order not available

Problem:

An operation that does not exist within the HYDRA dataset. is attempted to be logged on.

solution:

Please check whethter the entered number is correct. At the MOC within the order overview it can

be checked whether an operation is available within HYDRA or not.

16.1.2  Errorcode 11: Order number ■■.. not allowed

Shortform:

Ord. no. not allowed

Description:

The order number is not allowed.

Problem:

Certain order numbers such as "GK.." or "GKM..." are reserved for the waiting time processing and

must not be logged on manually. The system processes this order automatically.

Depending on the customer, the order number "PG..." might be reserved for bundle operations.

solution:

Please use order numbers from another number range.

16.1.3  Errorcode 20: Order is already running

Shortform:

Order runs

SIS-MWV_30.docx

Version: 1.5.19608

Page 134 of 477

MES Weaver

Description:

Order is already running

Problem:

An operation that is already active is attempted to be logged on.

solution:

An operation can only be logged on once to a workplace. Via the sequencing list within the dialog

"Log OP on" all operations, which are within the pool for this workplace, can be selected. Here the

user can choose another operation.

If an operation that is alreaday running is supposed to be logged on to another workplace at the

same time this can be enabled by setting the multiple flag within the stock data of the operation.

16.1.4  Errorcode 30: Order has been finished

Shortform:

Order is finished

Description:

Order has been finished

Problem:

An opertion, which has already been finished, is attempted to be logged on.

solution:

Operations that have already been finished cannot be logged on anymore. Via the client function

"reactivate" an operation, which has already been finished, can be reactivated in order that it is

possible to log the operation on again.

Before using the "reactivate" function please check possible consequences within the guiding PPS

system:

16.1.5  Errorcode 31: Order has been interrupted

Shortform:

Order is interrupted

Description:

Order has been interrupted

Problem:

An operation, which has already been interrupted, is attempted to be logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 135 of 477

MES Weaver

solution:

Within the dialog "interrupt OP" the operation running at the machine can be selected via the

selection list of the operation.

The current status of machine and operation can be checked in different dialogs such as order

overview order progress or operation report at the MOC (see manual of MOC)

16.1.6  Errorcode 32: Invalid OP status change

Shortform:

Invalid OP status

Description:

The change of the OP status is not valid

Problem:

The change of the OP status is not valid

solution:

Please choose a valid OP status

16.1.7  Errorcode 40: 1 order can only be logged on to mach.

Shortform:

Only 1 ord. possible

Description:

One order can only be logged on to this machine.

Problem:

A second operation is attempted to be logged on to the workplace although, according to

configuration, only one operation is allowed.

solution:

1. Finish/interrupt the currently running operation before logging on another operation.

2. Check the configuration of the workplace (menu ADE: master data > machine/workplace

configuration > machines/workplaces). The setting "several orders allowed" can be activated there.

16.1.8  Errorcode 41: 1 order can only be logged on to stat.

Shortform:

Only 1 ord. possible

Description:

One order can only be logged on to this station.

SIS-MWV_30.docx

Version: 1.5.19608

Page 136 of 477

MES Weaver

Problem:

One operation may only be logged on to this station.

solution:

When it comes to station-related postings only one operation may be logged on to the station.

Please interrupt/finish the active operation at first in order to be able to log the new operation on.

16.1.9  Errorcode 42: Opt. finish oper. when target qua. reach

Shortform:

Opt.target qty. 1 op

Description:

One order can only be logged on to this machine (Option "Terminate OP when reaching target

quantity")

Problem:

On this machine is the option 'Terminate OP when reaching target quantity' active. It is only allowed

to log on one operation.

solution:

1. Finish/interrupt the currently running operation before logging on another operation.

2. Check the configuration of the workplace / processing codes / order types

16.1.10  Errorcode 50: Order status is not available

Shortform:

Order status error

Description:

Order status is not available

Problem:

The order or operation cannot be created as no initial status is defined for the order type under

which it is supposed to be created.

solution:

Please contact MPDV Support.

16.1.11  Errorcode 51: Old order - logon not possible

Shortform:

Old ord-not possible

Description:

Old order - logon impossible.

SIS-MWV_30.docx

Version: 1.5.19608

Page 137 of 477

MES Weaver

Problem:

OP cannot be logged on due to deviation from the planned deadline

solution:

OP can only be logged on between earliest and latest start

16.1.12  Errorcode 52: Order header status not available

Shortform:

O. head. stat. error

Description:

Order header status is not available.

16.1.13  Errorcode 60: OP cannot be logged on several times

Shortform:

OP alr. logged on

Description:

Operation cannot be logged on several times.

Problem:

The operation has already been logged on and may only be logged on to one machine.

solution:

If the operation is to be logged on to several machines the multiple flag has to be set for this

operation. This can be made within the menu item "edit operations" at the MOC. If the operation

must not be logged on several times the operation has to be interrupted at first before a new logon

can be carried out.

16.1.14  Errorcode 70: Order is already running on this mach.

Shortform:

Ord. runs on machine

Description:

Order is already running at this machine

Problem:

An operation, which has already been logged on to this machine, was attempted to be logged on.

solution:

Please choose another operation or another function depending on the required functionality.

SIS-MWV_30.docx

Version: 1.5.19608

Page 138 of 477

16.1.15  Errorcode 73: The operation is still blocked by MLE

MES Weaver

Shortform:

OP is blocked by MLE

Description:

The operation is still blocked by MLE Interface

Problem:

A blocked OP was attempted to be logged on.

solution:

The MLE interface locks the OP that is currently being changed in the current transaction. The

operation can be logged on as soon as the current transaction has been completed.

16.1.16  Errorcode 74: OP is deleted logically

Shortform:

OP is deleted

Description:

The OP has been deleted logically.

Problem:

see error code 78

solution:

see error code 78

16.1.17  Errorcode 75: Order cannot be recorded

Shortform:

Order cannot be rec.

Description:

Order cannot be recorded

Problem:

see error code 78

solution:

see error code 78

16.1.18  Errorcode 76: Order is blocked

Shortform:

Order blocked

SIS-MWV_30.docx

Version: 1.5.19608

Page 139 of 477

MES Weaver

Description:

Order has been blocked

Problem:

see error code 78

solution:

see error code 78

16.1.19  Errorcode 77: Order cannot be logged on

Shortform:

O. cant be logged on

Description:

Order cannot be logged on.

Problem:

see error code 78

solution:

see error code 78

16.1.20  Errorcode 78: OP cannot be logged on

Shortform:

OP cant be logged on

Description:

OP cannot be logged on

SIS-MWV_30.docx

Version: 1.5.19608

Page 140 of 477

Problem:

The problem that an operation cannot be logged on might have different reasons. In particular, this

MES Weaver

can also depend on a customer-specific configuration.

Possible causes are:

1. It is a capacity order (order type "capacity order")

2. It is a waiting period order (order type "GKP" or "GKM")

3. The order or operation has already been finished.

4. The "recordable" flag has not been set at the operation.

5. The operation has been blocked. To check this, go to the order information to the

"administration" tab of the operation. Has the "blocked" flag been set to "J"?

6. The order type has been configured as "not enterable".

7. The processing code defined on the operation has been configured as "not enterable" .

8. The status of the order or the operation has been configured as "cannot be logged on".

9. The operation has a status that has not yet been "prepared". Then the status of the predecessor

operation can be the reason that the operation cannot be logged on. 10. The order or operation is

logical deleted.

solution:

Please check at first whether the "recordable" flag has been set at the operation. The indicator can

be found within the operation tab "processing".

Please check afterwards whether the "blocked" flag has been set in the "administration" tab. If this

is the case, you can unlock this via the respective function (button) in the order overview or order

information.

Check (e.g. via the order information) whether one of the above-mentioned order types have been

assigned to the order.

Please check the current status of the order as well as the status of the operation.

16.1.21  Errorcode 79: Invalid order status

Shortform:

Invalid order status

Description:

Invalid order status

Problem:

The logon carried out is not allowed for the current status of the order.

solution:

Choose an operation of a valid operation that can be logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 141 of 477

MES Weaver

16.1.22  Errorcode 80: Invalid OP status

Shortform:

Invalid OP status

Description:

OP status not defined

Problem:

The logon carried out is not allowed for the current status of the OP.

solution:

Please choose a logon that is allowed for the current status of the OP, e.g. logging an OP on is

allowed for prepared or interrupted OPS but not for OPs that are already running or that have

already been finished.

16.1.23  Errorcode 81: The status cannot be assigned manually

Shortform:

Status only autmat.

Description:

The status cannot be assigned manually.

Problem:

The assigned status is only intended for automatic assignments within the system.

solution:

Please choose a machine status that might be assigned manually or set the option "manual

assignment" for this machine status at the MOC within the menu item status assignment.(of

machines/workplace)

16.1.24  Errorcode 82: Status change not allowed

Shortform:

Stat. chan. n. allow

Description:

It is not allowed to change the status.

Problem:

At the moment it is not allowed to change the machine status.

solution:

When an operation is logged on the status must not be changed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 142 of 477

16.1.25  Errorcode 83: Status not allowed for this order type

MES Weaver

Shortform:

Stat. inv. for type

Description:

Status is not allowed for this order type.

Problem:

An operation, whose order type (e.g. PPS OP or overhead cost OP) does not allow the selected

machine status, is active at the machine.

solution:

When defining the machine status it can be determined for which order type this status is allowed.

Select an admissible status for the operations that are currently logged on to the machine.

16.1.26  Errorcode 84: Invalid machine status

Shortform:

Invalid status

Description:

Invalid machine status

Problem:

A status that does not exist within the list of disturbances was attempted to be assigned to the

machine.

solution:

Please select a status that has been defined for the machine. All machine statuses are defined

separately for each machine within the menu item status assignment (of machines/workplace) at

MOC

16.1.27  Errorcode 85: The operation is still blocked

Shortform:

OP is blocked

Description:

The operation is still blocked

Problem:

A blocked OP was attempted to be logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 143 of 477

MES Weaver

solution:

Blocked OPs have at first to be released via a HYDRA planning function. Then a logon can be

carried out.

16.1.28  Errorcode 86: Target quantity change not allowed

Shortform:

Change not allowed

Description:

It is not allowed to change the target quantity.

Problem:

The reporting person is not authorized to change the target quantity.

solution:

Please check the authorization within the HR master data.

16.1.29  Errorcode 87: The OP is prepared

Shortform:

OP is prepared

Description:

Operation has been prepared.

Problem:

Function not possible for this OP, because the OP is prepared

16.1.30  Errorcode 89: The OP is not active

Shortform:

OP is not active

Description:

The registered operation is contained in an inactive order sequence

Problem:

The registered operation is contained in an inactive order sequence.

solution:

Log an operation of an active sequence on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 144 of 477

16.1.31  Errorcode 90: Machine ■■■■■■■■ not available

MES Weaver

Shortform:

No machine label

Description:

Machine is not available

Problem:

During this action it was detected that the assignment to the machine is missing.

solution:

Please check whether the registered machine is available in HYDRA. When logging an operation

on without entering a machine it has to be checked whether a valid machine number has been

entered for this operation.

16.1.32  Errorcode 91: Machine is no machining center

Shortform:

No machining center

Description:

Machine is no machining center

Problem:

Activating/resetting an operation at a machine is only possible at a machining center.

solution:

Please check at the MOC configuration of machines/WP whether this machine is a processing

center.

16.1.33  Errorcode 94: Machine group ■■■■■■■■ not available

Shortform:

No machine group

Description:

Machine group is not available.

Problem:

The entered machine group is not known as a capacity group within the system

solution:

Check the entered machine group and create it, if necessary as a capacity group Check the

HYDRA basic settings if the settings are set correctly to identify the HYDRA machine group for the

transfer from SAP.

SIS-MWV_30.docx

Version: 1.5.19608

Page 145 of 477

16.1.34  Errorcode 95: Posting outside synchronization!

MES Weaver

Shortform:

Post. outside sync.

Description:

The time of the posting differs too much from the current posting status of the machine!

Problem:

The time of the posting differs too much from the current posting status of the machine!

solution:

Wait until the machine has synchronized its messages and try again later. If the message at a later

time is not possible again, please contact the administrator of the Hydra.

16.1.35  Errorcode 100: It's not possible to logon to this mach.

Shortform:

Not possible

Description:

Logon to this machine impossible.

Problem:

This operation must not be logged on to this workplace as the operation has not been planned for

this workplace.

solution:

If the plausibility check "check of specification in backlog of orders" is activated for the order type of

the machine/workplace an operation may only be logged on to the planned workplace.

Please check at the MOC whether the operation has been planned for the registered workplace.

16.1.36  Errorcode 101: No data available!

Shortform:

No data!

Description:

No data available!

Problem:

General error message appearing when the selected data (tables or files) are not available.

solution:

Depending on the action, different reasons are possible.

Please contact MPDV-Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 146 of 477

16.1.37  Errorcode 102: Unknown dialog ■■■■■■■■■■■■■■■

MES Weaver

■■■■■

Shortform:

Unknown dialog

Description:

Kernel does not support the used BAPI.

Problem:

A dialog that is not known within the system tries to send data to the server, which is rejected.

solution:

Please contact MPDV-Support.

16.1.38  Errorcode 103: Unknown event ■■■■■ ■■■■■■■■■■■■■■■

Shortform:

unknown event

Description:

Kernel does not know the event.

Problem:

An invalid posting appeared when processing the dialog data and their dissolution in single events.

solution:

Internal error, please contact MPDV-Support.

16.1.39  Errorcode 104: Unknown command

Shortform:

Unknown command

Problem:

Unknown command when transferring data from the terminal to the server.

solution:

Internal error, please contact MPDV-Support.

16.1.40  Errorcode 105: Parameters are missing

Shortform:

Parameters missing

SIS-MWV_30.docx

Version: 1.5.19608

Page 147 of 477

MES Weaver

Description:

Relevant parameters are missing

Problem:

When transferring dialog data it was detected that parameters are missing.

solution:

Please contact MPDV-Support..

16.1.41  Errorcode 106: Invalid date ■■■■■■■■■■

Shortform:

Invalid date

Description:

An invalid date has been stated.

Problem:

When checking dialog data for plausibility it is detected that the date stamp is too old or invalid.

solution:

Please contact MPDV-Support.

16.1.42  Errorcode 107: Incorrect order type

Shortform:

Incorrect type

Description:

Inadmissible order type.

Problem:

It is detected that the order type of the respective operation is not allowed.

solution:

Please check the order type at the MOC in the menu item "edit orders"

16.1.43  Errorcode 108: Material staging!

Shortform:

Material!

Description:

Material staging!

SIS-MWV_30.docx

Version: 1.5.19608

Page 148 of 477

MES Weaver

Problem:

The first operation of a line production is used for material staging and therefore it must not be

finished without produced yield.

solution:

Register the produced yield since the operation may only be logged on when the yield is greater

than 0.

16.1.44  Errorcode 109: Logon/off of OP has alr. been confirmed

Shortform:

OP confirmed

Description:

The logon of the operation has already been uploaded.

Problem:

When recording a correction it was detected that the data record has already been uploaded.

solution:

A correction within HYDRA is not possible anymore. Please correct the data within the guiding

system.

16.1.45  Errorcode 110: Invalid time stamp ■■■■■■■

Shortform:

Invalid time stamp

Description:

Invalid time

Problem:

When checking the posting for plausibility it is detected that the time stamp is invalid.

solution:

Please contact MPDV-Support.

16.1.46  Errorcode 111: Area functions are not active

Shortform:

Area funct. inactive

Description:

Area functions are not active.

Problem:

The user posts onto a machine that is not assigned to the terminal.

SIS-MWV_30.docx

Version: 1.5.19608

Page 149 of 477

MES Weaver

solution:

The area function of the terminals enable postings to machines that are not assigned to a terminal.

Via a button within the terminal configuration this function can be activated or switched off.

16.1.47  Errorcode 112: Logon not intended at this workplace.

Shortform:

Not possible

Description:

A logon to this workplace is not intended.

Problem:

This operation must not be logged on to this machine as the operation has not been planned for

this machine or machine group.

solution:

If the plausibility check for machine groups has been activated within the order type an operation

may only be logged on to its planned machine or an alternative machine of the respective machine

group.

Please check at the MOC whether the order has been planned for the registered machine or

machine group.

16.1.48  Errorcode 113: Logon n. possible at this mach./category

Shortform:

Not possible

Description:

Logon to this machine/category impossible.

Problem:

This operation must not be logged on to the machine as the operation has not been planned for this

machine or machine category.

solution:

If the plausibility check for machine categories is actve within the order type an operation may only

be logged on to its planned machine or to an alternative machine of the respective machine

category.

Please check at the MOC whether the order has been planned for the registered machine or

machine category.

SIS-MWV_30.docx

Version: 1.5.19608

Page 150 of 477

16.1.49  Errorcode 114: No premium group assigned

MES Weaver

Shortform:

Prem. grp. not def.

Description:

No premium group assigned.

Problem:

This machine has been set for group piecework within the HYDRA-LLE configuration. In this case,

the machine has to be assigned to an existing premium group within HYDRA-LLE or the operator

has to indicate a valid premium group when logging the order on. The assignment of premium

groups is missing and/or the worker did not enter a premium group.

solution:

Correct the machine configuration within HYDRA-ADE/MDE or the assignment of premium groups

within HYDRA-LLE in order that the operators state correct premium groups at the terminal.

16.1.50  Errorcode 115: Invalid premium group

Shortform:

Prem. grp. invalid

Description:

Invalid premium group

Problem:

This machine has been set for group piecework within the HYDRA-LLE configuration. In this case,

the machine has to be assigned to an existing premium group within HYDRA-LLE or the operator

has to indicate a valid premium group when logging the order on. The premium group assigned or

entered by the worker does not exist.

solution:

Correct the assignment of premium groups within HYDRA-LLE or make sure that the operators

enter the correct premium groups at the terminal.

16.1.51  Errorcode 116: Another premium group already assigned

Shortform:

Pr.grp.alr. assigned

Description:

Another premium group has already been assigned.

SIS-MWV_30.docx

Version: 1.5.19608

Page 151 of 477

MES Weaver

Problem:

An order, which has already been logged on to another premium group, is attempted to be logged

on to a workplace for group piecework.

solution:

At a workplace an order can only run for one single premium group at the same time as otherwise a

unique assignment to the personal processing is not possible. Process the order at two different

workplaces or for the same premium group.

16.1.52  Errorcode 117: Status production is not available

Shortform:

St. product.n.avail.

Description:

The production status is not available for this machine.

Problem:

No operation can be logged on to this machine as the production status is missing.

solution:

Please configure the produciton status for this machine at the MOC

16.1.53  Errorcode 118: The machine is blocked

Shortform:

Machine blocked

Description:

The machine has been blocked.

Problem:

Persons or operations cannot be logged on to this machine as the machine has been blocked.

solution:

Reset the blocking indicator of the machine within the machine configuration at the MOC or log on

to a released machine.

16.1.54  Errorcode 119: Overlap quantity exceeded

Shortform:

Overlap quantity!

Description:

Overlap quantity has been exceeded.

SIS-MWV_30.docx

Version: 1.5.19608

Page 152 of 477

MES Weaver

Problem:

The quantity registered for the operation (sum of yield and scrap) exceeds the yield that has so far

been registered for the predecessor operation.

solution:

Check the registered quantity and the quantity that has already been produced for the operation

compared to the yield of the predecessor operation.

16.1.55  Errorcode 130: Invalid serial number ■■■■■■■■■■■■■■■■

Shortform:

Invalid serial no.

Description:

Invalid serial number

Problem:

The entered serial number is invalid

solution:

Please enter a valid serial number

16.1.56  Errorcode 131: Serial number ■■■■■■■■■■■■■■■■

assigned

Shortform:

Serial no. assigned

Description:

Serial number has been assigned.

Problem:

The entered serial number has already been assigned

solution:

Please enter a free serial number

16.1.57  Errorcode 132: Predecessor send-ahead qty. n.y. reached

Shortform:

Send-ahead quantity!

Description:

The predecessor send-ahead quatity has not yet been reached.

SIS-MWV_30.docx

Version: 1.5.19608

Page 153 of 477

MES Weaver

Problem:

The OP may only be logged on when the preceding OP has reached its send-ahead quantity.

solution:

Please check actual quantity and send-ahead quantity of preceding OP.

16.1.58  Errorcode 134: Too many lines; therefore only one item.

Shortform:

List canceled!

Description:

List cancelled!

Problem:

The DNC ressource list has to much entries

Lösung:

16.1.59  Errorcode 144: No data have been changed!

Shortform:

No data change

Description:

No data have been changed.

Problem:

Data have not been changed during data maintenance.

solution:

It is only possible to recalculate if data have been changed.

16.1.60  Errorcode 145: Process offline

Shortform:

Process offline

Description:

No Connection to Hydra process(es)

Problem:

The connection to processes of the Hydra server is lost

SIS-MWV_30.docx

Version: 1.5.19608

Page 154 of 477

MES Weaver

solution:

Possible causes are:

- Missing or temporarily disturbed network connection

- The Hydra server is shut down for service purposes

16.1.61  Errorcode 146: Communication with client not possible.

Shortform:

Client comm. n. poss

Description:

Communication with client impossible.

Problem:

The connection to processes of the Hydra server is lost

solution:

Possible causes are:

- temporarily disturbed network connection

- the client ist off

- the client is not connected to the network

16.1.62  Errorcode 150: No valid INI configuration

Shortform:

INI config not valid

Description:

The declared INI configuration is not valid

16.1.63  Errorcode 400: Same user no. as

■■■■■■■■■■■■■■■■■■■■

Shortform:

Double user no.

Description:

It is impossible to log on to the HYDRA host computer. Your console number <KONS.KONS> is

already being used by the active console <KONS.IPNAME> with the address <KONS.IP>.

Problem:

Two Clients use the same user number

solution:

Please contact the administrator of Hydra

SIS-MWV_30.docx

Version: 1.5.19608

Page 155 of 477

16.1.64  Errorcode 410: Error when opening/writing the file.

MES Weaver

Shortform:

File name invalid

Description:

Error when opening/writing the file.

Problem:

Error when opening/writing the file.

solution:

State a valid file

16.1.65  Errorcode 411: Status text is not available

Shortform:

Status text n. avail

Description:

Status text is not available

Problem:

Status text is not available.

solution:

Use a valid status text or insert a new one

16.1.66  Errorcode 412: Can only be set man.if prod_kenn empty

Shortform:

Man. set. n. allowed

Description:

Can only be set manually if prod_kenn is empty

16.1.67  Errorcode 413: Production characteristic not distinct

Shortform:

Prod_Kenn n.distinct

Description:

Production indicator not unique.

Problem:

Production indicator must be unique per order type.

SIS-MWV_30.docx

Version: 1.5.19608

Page 156 of 477

solution:

Use an other production indicator.

16.1.68  Errorcode 414: Indicated group does not exist

MES Weaver

Shortform:

Group not available.

Description:

Indicated group does not exist

Problem:

Indicated group does not exist.

solution:

Use an exisiting group or insert a new one.

16.1.69  Errorcode 415: RESTYP does not fit in single type grp.

Shortform:

Grp. is single type

Description:

RESTYP does not fit in single type group.

Problem:

The stated RESTYP does not fit in the exisiting single type group.

solution:

Use an RESTYP which fit in single type group or define the group as not single typed.

16.1.70  Errorcode 416: Function group is not available

Shortform:

Fct. group. n. avail

Description:

Function group is not available

Problem:

Function group is not available.

solution:

Use an existing function group or insert a new .

SIS-MWV_30.docx

Version: 1.5.19608

Page 157 of 477

16.1.71  Errorcode 417: Event that is not defined

MES Weaver

Shortform:

Event n. available

Description:

Undefined event

16.1.72  Errorcode 418: Please enter message

Shortform:

Enter message

Description:

Please enter message.

Problem:

There was no message entered

solution:

You must enter a message in the corresponding field

16.1.73  Errorcode 419: Please read message at first

Shortform:

Read message first

Description:

Only messages that have been read can be closed or forwarded.

16.1.74  Errorcode 420: Wrong or missing recipient type

Shortform:

Recipient type wrong

Description:

Wrong or missing recipient type

Problem:

There was no or wrong recipient type entered

solution:

Enter a existing recipient type

SIS-MWV_30.docx

Version: 1.5.19608

Page 158 of 477

16.1.75  Errorcode 421: Please enter solution

MES Weaver

Shortform:

Enter solution

Description:

Please enter a solution

Problem:

There was no solution notivce entered

solution:

You must enter a solution notice in the corresponding field

16.1.76  Errorcode 422: Communication error with escalation

man.

Shortform:

Communication error

Description:

A communication error with escalation manager has occurred.

solution:

Please contact MPDV Support.

16.1.77  Errorcode 424: Error in User-Bapi (see protocol)

Shortform:

Error in Bapi

Description:

<ERR.TXT>

Problem:

An Error has occured in a custom specific extension or in an extension build with Hydra

Applications.

solution:

For more information, please look in customer documentation or ask your Hydra Applications

Developers

16.1.78  Errorcode 425: Responsibility profile not available

Shortform:

Resp. prof. n. avail

SIS-MWV_30.docx

Version: 1.5.19608

Page 159 of 477

MES Weaver

Description:

The responsibility profile is not available.

Problem:

The choosen responsibility profile is not available.

solution:

Select an existing responsibility profile or create a new one

16.1.79  Errorcode 426: Group still in use (group assignment)

Shortform:

Group still in use

Description:

Group is still being used.

Problem:

The group can not be deleted, because it is used in the group assignment

solution:

Delete the corresponding entry in group assignment before you delete the group

16.1.80  Errorcode 427: Function profile is not available

Shortform:

Fct.profile n.avail.

Description:

The function profile is not available.

16.1.81  Errorcode 428: Message is already closed

Shortform:

Message closed

Description:

The message is already closed

Problem:

The message could not be closed because it is already closed

solution:

It's not necessary to close this message

SIS-MWV_30.docx

Version: 1.5.19608

Page 160 of 477

16.1.82  Errorcode 429: Circular reference detected

MES Weaver

Shortform:

Circular reference

Description:

A circular reference has been detected.

Problem:

A circular reference has been detected.

solution:

Resolve configuration in a way that avoids circular references.

16.1.83  Errorcode 430: Function requires development license

Shortform:

DEF/0 missing dev.lic

Description:

The desired function requires a development license.

Problem:

To execute the desired function, you need a development license.

solution:

A development license is required for the required action, or the change must be requested as

Customizing.

16.1.84  Errorcode 431: DEF/0: Requires development license

Shortform:

DEF/0 missing dev.lic

Description:

Default dialogs for user 0 may only be edited with developer license.

Problem:

Default dialogs for user 0 may only be edited with developer license.

solution:

A development license is required for the required action, or the change must be requested as

Customizing.

SIS-MWV_30.docx

Version: 1.5.19608

Page 161 of 477

16.1.85  Errorcode 432: Data requires development license

MES Weaver

Shortform:

Data requ. dev.lic

Description:

The entered data requires a development license.

Problem:

In order to save the entered data, you need a development license.

solution:

The entered data requires a development license. For example, when copying a dynamic dialog, it

is not possible to change the dialog itself and create new dialogs without a development license.

However, you can copy existing dialogs to other terminals or terminal groups.

16.1.86  Errorcode 500: Order is not logged on

Shortform:

Not logged on

Description:

The order is not logged on

Problem:

When logging off/confirming/interrupting the operation it is detected that the registered operation

does not run at this machine. Therefore, it is impossible to partially confirm/interrupt/finish the OP or

to change the output batch for this operation at this machine.

If the container management option is active this error message shows that it is only possible to

create containers if the first operation of the order is running.

solution:

Please check the entered operation and machine number. The order overview function of the MOC

provides an overview of operations that are logged on to machines.

When it comes to the container management the first operation of the order has to be logged on to

be able to create new containers.

16.1.87  Errorcode 501: The container does not belong to order

Shortform:

Wrong container OP

Description:

The container does not belong to the order

SIS-MWV_30.docx

Version: 1.5.19608

Page 162 of 477

MES Weaver

Problem:

In case of transport postings the container may only be logged on within one order and not to other

orders.

solution:

Please check, e.g. in the container list at the terminal which operation the container is currently

logged on to. The container can only be transferred to the subsequent operation.

16.1.88  Errorcode 502: Wrong sequence of containers

Shortform:

Wrong sequence

Description:

Wrong sequence of containers

Problem:

The container may only be transferred to the subsequent operation within the production order.

solution:

See error code 501

16.1.89  Errorcode 503: Log container on only to 1st OP

Shortform:

Only to 1st OP

Description:

Container may only be created at the first operation.

Problem:

With a transport posting it is attempted to create a container, although the first operation of the

production order is inactive.

solution:

Please log the first operation on before entering new containers.

16.1.90  Errorcode 504: Container still active on preceding OP

Shortform:

N. y. all containers

Description:

The container is still active at predecessor operation.

SIS-MWV_30.docx

Version: 1.5.19608

Page 163 of 477

MES Weaver

Problem:

For the container management an operation may only be finished when all containers are

transferred to the subsequent operation.

solution:

Transfer all containers to the next operation in order to be able to finish the operation. An overview

of all containers and their current position can be requested via the container list at the terminal.

16.1.91  Errorcode 505: The 1st OP has not yet been finished

Shortform:

1st OP still active

Description:

The first operation has not yet been finished.

Problem:

In the container management an operation may only be finished when the first operation of the

production order has already been finished.

solution:

At first finish the first operation of the production order before finishing the subsequent operations.

16.1.92  Errorcode 510: Person is not authorized!

Shortform:

Not authorized

Description:

Person is not authorized!

Problem:

Person is not authorized to do this action.

solution:

Please check the person's authorizations at the MOC

16.1.93  Errorcode 520: Creating not allowed

Shortform:

Creating not allowed

Description:

Creating is not allowed.

Problem:

A bundle OP may only be logged on to especially configured machines.

SIS-MWV_30.docx

Version: 1.5.19608

Page 164 of 477

solution:

Please check the machine configuration whether the option "order bundling" is active.

16.1.94  Errorcode 522: Station-related logons/offs not allowed

MES Weaver

Shortform:

Stations not allowed

Description:

Station-related postings are not allowed.

Problem:

Station-related postings may only be carried out at especially configured machines.

solution:

Check the machine configuration whether the option "station-related messages" is active.

16.1.95  Errorcode 523: Station is already occupied

Shortform:

Station occupied

Description:

Station has already been occupied.

Problem:

There was an attempt to log more than one operation on to a station.

solution:

One operation may only be logged on to the station. Interrupt the active operation at first in order to

be able to log the new operation on.

16.1.96  Errorcode 524: OP must not be deleted

Shortform:

Deleting not allowed

Description:

Operation must not be deleted.

Problem:

It is attempted to cancel a production operation, which is not allowed in this situation.

solution:

Production operations (that are not labeled with "Z") must not be canceled.

SIS-MWV_30.docx

Version: 1.5.19608

Page 165 of 477

16.1.97  Errorcode 526: Order has not been confirmed

MES Weaver

Shortform:

OP is not confirmed

Description:

Operation has not yet been confirmed!

16.1.98  Errorcode 600: Invalid mode ■■ of plausibility check

Shortform:

Invalid mode

Description:

Invalid mode of the plausibility check

Problem:

Internal error

solution:

Please contact MPDV-Support.

16.1.99  Errorcode 601: There are no events for the plaus. check

Description:

There are no events for the plausibility check.

Problem:

Internal error

solution:

Please contact MPDV-Support.

16.1.100  Errorcode 602: Invalid date/time [■■■■■■■■■■■■■■■■]

in event [■■■■■■■■■■]

Description:

Invalid date and/or time within the event

Problem:

Within the data maintained by you an invalid date or invalid time was found.

solution:

Please double-check the altered data.

SIS-MWV_30.docx

Version: 1.5.19608

Page 166 of 477

16.1.101  Errorcode 603: Unknown event [■■■■■■■■■■] in plaus.

MES Weaver

check

Description:

Unknown event in the plausibility check

Problem:

Internal error

solution:

Please contact MPDV-Support.

16.1.102  Errorcode 604: Database error when creating a

temporary table

Description:

Database error when creating a temporary table

Problem:

Internal error

solution:

Please contact MPDV-Support.

16.1.103  Errorcode 605: The logoff of person ■■■■■■■■■■ is

missing at machine ■■■■■■■■■■

Description:

A person has not been logged off at a machine.

Problem:

When recalculating the maintained data it came out that this person has not been logged off.

solution:

HYDRA is only able to recalculate consistent data. Every time a person is logged on they also have

to be logged off. Please check the data altered by you accordingly.

16.1.104  Errorcode 606: The logoff of OP ■■■■■■■■■■■■■■■■ is

missing at machine ■■■■■■■■■■

Description:

The logoff of an operation is missing at a machine

SIS-MWV_30.docx

Version: 1.5.19608

Page 167 of 477

MES Weaver

Problem:

When recalculating the maintained data it came out that this operation has not been

interrupted/logged off.

solution:

HYDRA is only able to recalculate consistent data. Every time an operation is logged on it has also

to be interrupted/logged off. Please check the data altered by you accordingly.

16.1.105  Errorcode 607: The logoff of batch ■■■■■■■■■■■■■■■■

is missing at machine ■■■■■■■■■■

Description:

The logoff of a batch is missing at a machine

Problem:

When recalculating the maintained data it came out that this batch has not been logged off.

solution:

HYDRA is only able to recalculate consistent data. Every time a batch is logged on it has also to be

logged off. Please check the data altered by you accordingly.

16.1.106  Errorcode 608: The logoff of input batch

■■■■■■■■■■■■■■■■ is missing at machine ■■■■■■■■■■

Description:

The logoff of an input batch is missing at a machine.

Problem:

When recalculating the maintained data it came out that this input batch has not been logged off.

solution:

HYDRA is only able to recalculate consistent data. Every time an input batch is logged on it has

also to be logged off. Please check the data altered by you accordingly.

16.1.107  Errorcode 609: The logoff of output batch

■■■■■■■■■■■■■■■■ is missing at machine ■■■■■■■■■■

Description:

The logoff of an output batch is missing at a machine.

Problem:

When recalculating the maintained data it came out that this output batch has not been logged off.

SIS-MWV_30.docx

Version: 1.5.19608

Page 168 of 477

MES Weaver

solution:

HYDRA is only able to recalculate consistent data. Every time an output batch is logged on it has

also to be logged off. Please check the data altered by you accordingly.

16.1.108  Errorcode 610: Invalid event [■■■■■■■■■■] in the data

maintenance

Description:

Invalid event in data maintenance

Problem:

Internal error

solution:

Please contact MPDV-Support.

16.1.109  Errorcode 611: Confirmations active-recalculation

blocked at the moment!

Description:

The recalculation is blocked at the moment because the confirmations are active

Problem:

The recalculation is blocked at the moment because the confirmations are active

solution:

Please redo the recalculation at a later point in time.

16.1.110  Errorcode 612: Cost center is invalid

Description:

The cost center is invalid

Problem:

The cost center is invalid

solution:

Please enter a valid cost center

16.1.111  Errorcode 613: Cost center is blocked

Description:

The cost center is blocked

SIS-MWV_30.docx

Version: 1.5.19608

Page 169 of 477

MES Weaver

Problem:

The cost center is blocked

solution:

Please enter a valid cost center

16.1.112  Errorcode 619: Pallet not available.

Shortform:

Pallet not available

Description:

Pallet not available.

Problem:

The pallet is not avaiable (dialog=PAL_WIEG)

solution:

enter the correct pallet number

16.1.113  Errorcode 629: 20 OPs can only be logged on simultan.

Shortform:

Too many par. OPs

Description:

20 OPs can only be logged on at the same time.

Problem:

You try to run more than 20 OPs at the same time

solution:

Log off one OP before starting a new one.

16.1.114  Errorcode 630: A negative consumption is not allowed.

Shortform:

Negative consumption

Description:

A negative consumption is inadmissible.

Problem:

the quantity of the batch is less than the sum of splitting quantity

solution:

-

SIS-MWV_30.docx

Version: 1.5.19608

Page 170 of 477

16.1.115  Errorcode 700: Day model is not available

MES Weaver

Shortform:

Model not available

Description:

The day model is not available.

Problem:

The day model is not available. Only existing models may be assigned.

solution:

Please enter a valid day model.

16.1.116  Errorcode 701: Day model already exists

Shortform:

Model alr. exists

Description:

The day type already exists.

Problem:

The day type already exists

solution:

Please enter a free day model

16.1.117  Errorcode 702: Day model is used within year model

Shortform:

Model is used

Description:

The day type is used within a year model

Problem:

The day model cannot be deleted as it is assigned to a year model.

solution:

Please remove the day model from the year model. The day model can then be deleted.

16.1.118  Errorcode 703: Day model is used today

Shortform:

Model is used

SIS-MWV_30.docx

Version: 1.5.19608

Page 171 of 477

MES Weaver

Description:

The day model is used today.

Problem:

The day model cannot be deleted as it is being used today.

solution:

Please check the assignment of the day model to year models. A model can only be deleted if it is

no longer in use.

16.1.119  Errorcode 704: Status is available in MDE protocol

Shortform:

Status is used

Description:

The status is available within the machine data collection log.

Problem:

The status is available within the machine data collection log, e.g. in HYDRA-MDE. They cannot be

displayed correctly anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the machine's log data for this status are

completely deleted from the system. Normally, this is done by the automatic deletion of data after a

set term. This term has to be awaited.

16.1.120  Errorcode 705: Status is available in ADE protocol

Shortform:

Status is used

Description:

The status is available within the order data collection log

Problem:

The status is available within the order data collection log, e.g. in HYDRA-ADE. They cannot be

displayed correctly anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the order log data with this status are completely

deleted from the system. Normally, this is done by the automatic deletion of data after a set term.

This term has to be awaited.

SIS-MWV_30.docx

Version: 1.5.19608

Page 172 of 477

16.1.121  Errorcode 706: Status is active at the machine

MES Weaver

Shortform:

Status is active

Description:

The status is active at the machine.

Problem:

The machine status cannot be deleted as it is currently used by a machine.

solution:

An active machine status cannot be deleted. Please contact MPDV Support for further assistance.

16.1.122  Errorcode 707: Machine has not been indicated

Shortform:

Machine is missing

Description:

Machine has not been stated.

Problem:

The machine has not been stated.

solution:

Please check your input

16.1.123  Errorcode 708: Machine status has not been indicated

Shortform:

Status is missing

Description:

Machine status has not been stated.

Problem:

The machine status has not been stated.

solution:

Please check your input

16.1.124  Errorcode 709: Target machine has not been indicated

Shortform:

Targ.machine missing

SIS-MWV_30.docx

Version: 1.5.19608

Page 173 of 477

MES Weaver

Description:

Target machine has not been stated.

Problem:

The target machine has not been stated.

solution:

Please check your input

16.1.125  Errorcode 710: Target status has not been stated

Shortform:

Target stat. missing

Description:

Target status has not been indicated.

Problem:

The target status has not been stated.

solution:

Please check your input

16.1.126  Errorcode 711: Processing mode has not been stated

Shortform:

Mode is missing

Description:

Processing mode has not been indicated.

Problem:

The processing mode has not been indicated..

solution:

Please check your input

16.1.127  Errorcode 712: Processing mode is invalid

Shortform:

Invalid mode

Description:

Processing mode is invalid.

Problem:

The processing mode is invalid.

SIS-MWV_30.docx

Version: 1.5.19608

Page 174 of 477

solution:

Please check your input

16.1.128  Errorcode 713: Machine status is not available

MES Weaver

Shortform:

Status not available

Description:

Machine status is not available.

Problem:

The selected machine status is not available.

solution:

Please select an available machine status

16.1.129  Errorcode 714: Machine status is already available

Shortform:

Status alr.available

Description:

Machine status is already available.

Problem:

The machine status is already available.

solution:

Please enter a machine status that is not yet available.

16.1.130  Errorcode 715: Production characteristic is missing

Shortform:

P. char. is missing

Description:

Production characteristic is missing.

Problem:

The production characteristic is missing.

solution:

Please select a production characteristic.

SIS-MWV_30.docx

Version: 1.5.19608

Page 175 of 477

16.1.131  Errorcode 716: Product. character. already assigned

MES Weaver

Shortform:

P. char. alr. avail.

Description:

Production characteristic has already been assigned.

Problem:

The production characteristic has already been assigned.

solution:

Please select another production characteristic.

16.1.132  Errorcode 717: RPA is not available

Shortform:

RPA not available

Description:

RPA is not available.

Problem:

RPA is not available.

solution:

Please select a RPA.

16.1.133  Errorcode 718: Status text is not available

Shortform:

Text not available

Description:

Status text is not available

Problem:

The status text is not available. It has to be created within the configuration of status texts.

solution:

Please create the status text at first or choose a status text that is already available.

16.1.134  Errorcode 719: Disturbance class is not available

Shortform:

Dist. class n. avail

SIS-MWV_30.docx

Version: 1.5.19608

Page 176 of 477

MES Weaver

Description:

Disturbance class is not available.

Problem:

The disturbance class is not available. It has to be created within the configuration of disturbance

classes.

solution:

Please create the disturbance class at first or choose a disturbance class that is already available.

16.1.135  Errorcode 720: Machine is no line

Shortform:

That is no line

Description:

Machine is no line.

Problem:

The "status transfer to aggregates" option is only allowed for machines of the "line" type.

solution:

Please check the configuration of the machine

16.1.136  Errorcode 721: Year model is assigned to a machine

Shortform:

Model is used

Description:

Year model has been assigned to a machine.

Problem:

The year model cannot be deleted as it is still assigned to a machine.

solution:

Please remove the year model at first from the machine configuration.

16.1.137  Errorcode 722: Year model is assigned to a person

Shortform:

Model is used

Description:

Year model has been assigned to a person.

SIS-MWV_30.docx

Version: 1.5.19608

Page 177 of 477

MES Weaver

Problem:

The year model cannot be deleted as it is still assigned to a person

solution:

Please remove the HYDRA-BDE year model at first from the HR master data.

16.1.138  Errorcode 723: Year model has not been indicated

Shortform:

Year model missing

Description:

Year model has not been stated.

Problem:

The year model has not been stated.

solution:

Please enter a valid year model

16.1.139  Errorcode 724: Year has not been stated

Shortform:

Year is missing

Description:

The year has not been indicated.

Problem:

The year has not been indicated.

solution:

Please enter a valid year.

16.1.140  Errorcode 725: Target year model has not been stated

Shortform:

Year model missing

Description:

Target year model has not been stated.

Problem:

The target year model has not been stated.

solution:

Please enter a target year model.

SIS-MWV_30.docx

Version: 1.5.19608

Page 178 of 477

16.1.141  Errorcode 726: Target year has not been stated

MES Weaver

Shortform:

Target year missing

Description:

Target year has not been stated.

Problem:

The target year has not been stated.

solution:

Please enter a target year.

16.1.142  Errorcode 727: Year model is not available

Shortform:

Model n. available

Description:

Year model is not available.

Problem:

The year model profile is not available.

solution:

Select an existing year model or create a new one

16.1.143  Errorcode 728: Year model already exists

Shortform:

Model alr. available

Description:

Year model already exists.

Problem:

This year model already exists.

solution:

Please enter a free day model

16.1.144  Errorcode 729: Reference has not been stated

Shortform:

Reference is missing

SIS-MWV_30.docx

Version: 1.5.19608

Page 179 of 477

MES Weaver

Description:

The reference has not been indicated.

Problem:

The reference has not been indicated.

solution:

Internal error, please contact MPDV-Support.

16.1.145  Errorcode 730: Date has not been stated

Shortform:

Date is missing

Description:

Date has not been stated.

Problem:

The date has not been stated.

solution:

Internal error, please contact MPDV-Support.

16.1.146  Errorcode 731: Holiday is not available

Shortform:

Holiday n. available

Description:

Public holiday is not available.

Problem:

The public holiday is not available.

solution:

Select an existing public holiday or create a new one

16.1.147  Errorcode 732: Holiday already exists

Shortform:

Holiday alr. avail.

Description:

Public holiday already exists.

Problem:

The public holiday already exists.

SIS-MWV_30.docx

Version: 1.5.19608

Page 180 of 477

solution:

Please enter a free public holiday or ceate an new one

16.1.148  Errorcode 733: Status text is assigned to a machine

MES Weaver

Shortform:

Text is used

Description:

Status text has been assigned to a machine.

Problem:

The status text cannot be deleted as it is assigned to a machine.

solution:

Please remove the status text at first from all machine statuses. The status text may then be

deleted.

16.1.149  Errorcode 734: Status text no. has not been stated

Shortform:

Text no. is missing

Description:

Status text number has not been indicated.

Problem:

The status text number has not been indicated.

solution:

Please enter a valid status text number

16.1.150  Errorcode 735: Status text is not available

Shortform:

Text not available

Description:

Status text is not available.

Problem:

The status text is not available.

solution:

Select an existing status text

SIS-MWV_30.docx

Version: 1.5.19608

Page 181 of 477

16.1.151  Errorcode 736: Status text already exists

MES Weaver

Shortform:

Text alr. available

Description:

Status text already exists.

Problem:

The status text already exists.

solution:

Please enter a free status text

16.1.152  Errorcode 737: Machine is available in MDE protocol

Shortform:

Machine is used

Description:

Machine is available within the machine data collection log.

Problem:

There are still log data for the machine, e.g. in HYDRA-MDE. They cannot be displayed correctly

anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the machine log data are completely deleted from

the system. Normally, this is done by the automatic deletion of data after a set term. This term has

to be awaited.

16.1.153  Errorcode 738: Machine is available in ADE protocol

Shortform:

Machine is used

Description:

Machine is available within the order data collection log.

Problem:

There are still log data for the machine, e.g. in HYDRA-ADE. They cannot be displayed correctly

anymore, provided that the required action is carried out.

SIS-MWV_30.docx

Version: 1.5.19608

Page 182 of 477

MES Weaver

solution:

The required action can only be carried out when the machine log data are completely deleted from

the system. Normally, this is done by the automatic deletion of data after a set term. This term has

to be awaited.

16.1.154  Errorcode 739: Machine is available in LZV protocol

Shortform:

Machine is used

Description:

Machine is available within the LZV log

Problem:

There are still log data for the machine, e.g. in HYDRA-MDE. They cannot be displayed correctly

anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the machine log data are completely deleted from

the system. Normally, this is done by the automatic deletion of data after a set term. This term has

to be awaited.

16.1.155  Errorcode 740: An OP is still logged on to machine

Shortform:

Machine is active

Description:

An OP is still being logged on to the machine.

Problem:

An OP is still being logged on to the machine.

solution:

Please finish all active logons to the machine.

16.1.156  Errorcode 741: Person is still logged on to machine

Shortform:

Machine is active

Description:

A person is still being logged on to the machine.

Problem:

A person is still being logged on to the machine.

SIS-MWV_30.docx

Version: 1.5.19608

Page 183 of 477

solution:

Please finish all active logons to the machine.

16.1.157  Errorcode 742: Batch is still logged on to machine

MES Weaver

Shortform:

Machine is active

Description:

A batch is still being logged on to the machine.

Problem:

An batch is still being logged on to the machine.

solution:

Please finish all active logons to the machine.

16.1.158  Errorcode 743: The machine is assigned to a line

Shortform:

Machine is active

Description:

The machine has been assigned to a line.

Problem:

The machine has been assigned to a line.

solution:

Please remove the machine from the line assignment.

16.1.159  Errorcode 744: Machine is assigned to a terminal

Shortform:

Machine is active

Description:

The machine has been assigned to a terminal.

Problem:

The machine has been assigned to a terminal.

solution:

Please remove the machine from the terminal assignment.

SIS-MWV_30.docx

Version: 1.5.19608

Page 184 of 477

16.1.160  Errorcode 745: Machine already exists

MES Weaver

Shortform:

Machine alr. avail.

Description:

Machine already exists.

Problem:

The machine already exists.

solution:

Please enter a free machine

16.1.161  Errorcode 746: Terminal no. has not been stated

Shortform:

Terminal no. missing

Description:

Terminal number has not been stated.

Problem:

The terminal number has not been stated.

solution:

Please select an existing terminal number

16.1.162  Errorcode 747: Position has not been stated

Shortform:

Position is missing

Description:

Position has not been stated.

Problem:

The position has not been stated.

solution:

Please enter a valid position

16.1.163  Errorcode 748: Disturbance class no. already exists

Shortform:

Dist. cl. alr. avail

SIS-MWV_30.docx

Version: 1.5.19608

Page 185 of 477

MES Weaver

Description:

Disturbance class number already exists.

Problem:

The disturbance class number already exists.

solution:

Please enter a free disturbance class number

16.1.164  Errorcode 749: Disturbance class abbrev. alr. exists

Shortform:

Dist. cl. alr. avail

Description:

Disturbance class abbreviation already exists.

Problem:

The disturbance class abbreviation already exists.

solution:

Please enter a free disturbance class abbreviation

16.1.165  Errorcode 750: Disturb. class is assigned to a status

Shortform:

Disturb. cl. is used

Description:

Status class has been assigned to a status.

Problem:

The status class cannot be deleted as it is still assigned to a machine status.

solution:

Please remove the status class from the machine status.

16.1.166  Errorcode 751: Wage/premium indicator not available

Shortform:

Indicator not avail.

Description:

Wage/premium indicator not available.

Problem:

The stated wage/premium indicator is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 186 of 477

solution:

Please state an existing wage/premium indicator.

16.1.167  Errorcode 752: Wage/premium indicator alr. available

MES Weaver

Shortform:

Indicator alr. avail

Description:

Wage/premium indicator already exists.

Problem:

A wage/premium indicator that already exists is attempted to be logged on.

solution:

Please state a new wage/premium indicator.

16.1.168  Errorcode 753: Wage/premium indicat. has been

recorded

Shortform:

Indicator is used

Description:

Wage/premium indicator has been recorded.

Problem:

A wage/premium indicator that has already been used in bookings or postings is attempted to be

edited. This one cannot be edited.

solution:

Please wait with the editing until the bookings and postings concerned are out-dated and will be

deleted from or archived in the HYDRA system.

16.1.169  Errorcode 754: Operator position not available

Shortform:

Operat. pos.n.avail.

Description:

Operator position not available.

Problem:

The indicated operater position is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 187 of 477

solution:

Choose a valid operator position.

16.1.170  Errorcode 755: Operator position already available

MES Weaver

Shortform:

Oper. pos.alr.avail.

Description:

Operator position already exists.

Problem:

The operator position is already available.

solution:

Please choose a new operator position.

16.1.171  Errorcode 756: Operator position has been recorded

Shortform:

Oper. pos. is used

Description:

Operator position has been recorded.

Problem:

An operator position that has already been used in bookings and postings is attempted to be

edited. This one cannot be edited.

solution:

Please wait with the editing till the bookings and postings concerned are out-dated and will be

deleted from or archived in the HYDRA system.

16.1.172  Errorcode 757: Deviation reason not available

Shortform:

Dev. reas. n. avail.

Description:

Deviation reason not available.

Problem:

The deviation reason not available.

solution:

Please select an existing deviation reason or create a new one

SIS-MWV_30.docx

Version: 1.5.19608

Page 188 of 477

16.1.173  Errorcode 758: Deviation reason already available

MES Weaver

Shortform:

Dev. reas.alr.avail.

Description:

Deviation reason already exists

Problem:

The deviation reason already exists

solution:

Please enter a free deviation reason

16.1.174  Errorcode 759: Deviation reason has been recorded

Shortform:

Dev. reason is used

Description:

Deviation reason has been recorded.

Problem:

There are still log data for the deviation reason, e.g. in HYDRA-ADE. They cannot be displayed

correctly anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the log data are completely deleted from the

system. Normally, this is done by the automatic deletion of data after a set term. This term has to

be awaited.

16.1.175  Errorcode 760: Process parameter not available

Shortform:

Process par.n.avail.

Description:

Process parameter is not available.

Problem:

The process parameter is not available.

solution:

Select an existing process parameter or create a new one

SIS-MWV_30.docx

Version: 1.5.19608

Page 189 of 477

16.1.176  Errorcode 761: Process parameter alreday available

MES Weaver

Shortform:

Process p.alr.avail.

Description:

Process parameter already exist.

Problem:

The process parameter already exist.

solution:

Please enter a free process parameter

16.1.177  Errorcode 762: Scrap reason not available

Shortform:

Scrap reas. n.avail.

Description:

Scrap reason not available.

Problem:

The scrap reason not available.

solution:

Please select an existing scrap reason or create a new one

16.1.178  Errorcode 763: Scrap reasons are already available

Shortform:

Scrap r. alr. avail.

Description:

Scrap reason already exists.

Problem:

The scrap reason already exists.

solution:

Please enter a free scrap reason

16.1.179  Errorcode 764: Terminal is already available

Shortform:

Terminal alr. avail.

SIS-MWV_30.docx

Version: 1.5.19608

Page 190 of 477

MES Weaver

Description:

Terminal already exists.

Problem:

The terminal already exists.

solution:

Please enter a free terminal number

16.1.180  Errorcode 765: Maintenance instruction not available

Shortform:

Maintenance n.avail.

Description:

Maintenance instruction not available

16.1.181  Errorcode 766: Maintenance instruct. is alr. available

Shortform:

Mainten. alr. avail.

Description:

Maintenance instruction already exists.

16.1.182  Errorcode 767: Order no. has not been indicated

Shortform:

Order no. is missing

Description:

Order number has not been stated.

16.1.183  Errorcode 768: Tool family has not been indicated

Shortform:

Tool fam. is missing

Description:

Tool family has not been stated.

Problem:

Tool family has not been stated.

solution:

Please enter a valid tool family

SIS-MWV_30.docx

Version: 1.5.19608

Page 191 of 477

16.1.184  Errorcode 769: Tool family is not available

MES Weaver

Shortform:

Tool fam. n. avail.

Description:

Tool family not available.

Problem:

Tool family is not available.

solution:

Please enter a valid tool family

16.1.185  Errorcode 770: Tool family is already available

Shortform:

Tool fam. alr.avail.

Description:

Tool family already available.

Problem:

Tool family already available.

solution:

Please enter a not existing tool family

16.1.186  Errorcode 771: Target tool family has not been stated

Shortform:

Targ.tool fam. miss.

Description:

Target tool family has not been stated.

Problem:

Target tool family has not been stated in copy function

solution:

Please enter a target tool family

16.1.187  Errorcode 772: Tool reason no. has not been stated

Shortform:

Tool reas. missing

SIS-MWV_30.docx

Version: 1.5.19608

Page 192 of 477

MES Weaver

Description:

Tool reason number has not been stated.

Problem:

Tool reason number has not been stated.

solution:

Please enter a tool reason number

16.1.188  Errorcode 773: Tool reason no. is not available

Shortform:

Tool reas. n. avail.

Description:

Tool reason number is not available.

Problem:

Tool reason number is not available.

solution:

Please enter an existing tool reason number

16.1.189  Errorcode 774: Tool reason no. is already available

Shortform:

Tool r. alr. avail.

Description:

Tool reason number already available.

Problem:

Tool reason number already available.

solution:

Please enter a not existing tool reason number

16.1.190  Errorcode 775: Target tool reason no. not indicated

Shortform:

Targ. tool r.missing

Description:

Target tool reason no. not been stated.

Problem:

Target tool reason no. not been stated.

SIS-MWV_30.docx

Version: 1.5.19608

Page 193 of 477

solution:

Please enter a target tool reason

16.1.191  Errorcode 776: Tool no. has not been indicated

MES Weaver

Shortform:

Tool no. is missing

Description:

Tool number has not been stated.

Problem:

Tool number has not been stated.

solution:

Please enter a tool number

16.1.192  Errorcode 777: Target tool no. has not been indicated

Shortform:

T. tool no. missing

Description:

Target tool number has not been stated.

Problem:

Target tool number has not been stated.

solution:

Please enter a target tool number

16.1.193  Errorcode 778: Tool number is already available

Shortform:

Tool alr. available

Description:

Tool number already available.

Problem:

Tool number already available.

solution:

Please enter a not existing tool number

SIS-MWV_30.docx

Version: 1.5.19608

Page 194 of 477

16.1.194  Errorcode 779: Tool number is not available

MES Weaver

Shortform:

Tool not available

Description:

Tool number not available.

Problem:

Tool number not available.

solution:

Please enter an existing tool number

16.1.195  Errorcode 780: Blocking reason/measure not available

Shortform:

Block.r/meas.n.avail

Description:

Blocking reason/measure not available.

Problem:

Blocking reason/measure not available.

solution:

Please enter a valid blocking reason/measure

16.1.196  Errorcode 783: Invalid status change

Shortform:

Inv. status change

Description:

Invalid status change. The process has been cancelled.

16.1.197  Errorcode 784: Day model is used within year model

Shortform:

Model is used

Description:

Day model is used within year model.

SIS-MWV_30.docx

Version: 1.5.19608

Page 195 of 477

16.1.198  Errorcode 785: Year model is assigned to a machine

MES Weaver

Shortform:

Model is used

Description:

Year model has been assigned to a machine.

16.1.199  Errorcode 786: Order no.corresponds to result.order

no.

Shortform:

Ord.no.=resul.ord.no

Description:

The order corresponds to the target order.

16.1.200  Errorcode 787: Max. no. of chainings reached

Shortform:

Max. no. of chain.

Description:

Maximum number of concatenations reached.

16.1.201  Errorcode 788: All orders have been commissioned

Shortform:

All ANR commissioned

Description:

All orders have been picked.

16.1.202  Errorcode 789: Invalid material

Shortform:

Invalid material

Description:

Invalid material.

SIS-MWV_30.docx

Version: 1.5.19608

Page 196 of 477

16.1.203  Errorcode 790: Chaining qty. greater than OP targ. qty.

MES Weaver

Shortform:

Chain. qty.too large

Description:

Chaining quantity greater than target quantity of OP

16.1.204  Errorcode 791: A running batch must not be changed

Shortform:

Batch is running

Description:

A running batch must not be changed or deleted.

Problem:

A running batch must not be changed or deleted.

solution:

Please log the batch off first, before you change or delete it.

16.1.205  Errorcode 792: Event maintenance is blocked

Shortform:

Event maint. blocked

Description:

Data are currently being blocked by user <USER>.

Problem:

Data are currently being blocked by user <USER> and can not be changed at the moment

solution:

Please wait until the user <USER> has finished his work or delete the lock entry in locked Datasets

if the user is not active

16.1.206  Errorcode 793: Event maint. blocked due to recalculat.

Shortform:

Ev. maint. rec. bl.

Description:

Data are currently being blocked by the recaluclation (batchjob) by the current user.

Problem:

Data are currently being blocked by the recaluclation (batchjob) by the current user.

SIS-MWV_30.docx

Version: 1.5.19608

Page 197 of 477

solution:

Please wait until the recalcultion is finished

16.1.207  Errorcode 794: Invalid machine for this action

MES Weaver

Shortform:

Invalid machine

Description:

Invalid machine for this action.

Problem:

It is an invalid machine for this action.

solution:

Please use a valid machine.

16.1.208  Errorcode 795: Short-time dist. alr. assigned f. mach.

Shortform:

ST dist. alr. avail.

Description:

Short-time disturbance for machine has already been assigned.

16.1.209  Errorcode 796: Status is available in MDE protocol-LT

Shortform:

Status is used

Description:

Status is available within the long-term machine data collection log.

Problem:

The status is available within the long-term machine data collection log.

solution:

The status can only be deleted when it is no longer available within the long-term machine data

collection log.

16.1.210  Errorcode 797: Confirmations are active at the moment

Shortform:

Confirmations active

SIS-MWV_30.docx

Version: 1.5.19608

Page 198 of 477

MES Weaver

Description:

Uploads are currently active, changes impossible.

Problem:

Uploads are currently active, changes of bookings are not possible.

solution:

Please wait until upload is completed

16.1.211  Errorcode 798: Posted time too small for reposting

Shortform:

Posted t. too small

Description:

The posted time is too little for the transfer posting.

Problem:

Please enter a greater duration for the transfer posting.

16.1.212  Errorcode 799: Month-end closing has alr. been done

Shortform:

Month-end cl. done

Description:

The month-end closing has already been done.

Problem:

The data record to be edited lies within a month which a month-end closing has already been done

for. Therefore, it cannot be edited anymore.

solution:

Possibly another HYDRA user is authorized to edit months that have already been completed.

Please contact your supervisor. If you cannot achieve anything please contact MPDV-Support.

16.1.213  Errorcode 800: Order technically completed in SAP

Shortform:

Techn. completed SAP

Description:

The order has already been completed technically within SAP.

solution:

The order cannot be edited.

SIS-MWV_30.docx

Version: 1.5.19608

Page 199 of 477

16.1.214  Errorcode 801: Storage could not be requested

MES Weaver

Shortform:

No free storage

Description:

Sufficient storage could not be requested for this operation.

solution:

Please contact MPDV Support.

16.1.215  Errorcode 802: Status alr. assigned when shift free

Shortform:

Status alr. assigned

Description:

Status has already been assigned when there is no shift.

solution:

Please decide another status when there is no shift.

16.1.216  Errorcode 803: Reposting leads to problem when

compar.

Shortform:

Problem repost. comp

Description:

Transfer posting leads to problem at next PZE-ADE comparison.

solution:

Please decide on whether the reposting is anyway to be carried out.

16.1.217  Errorcode 806: No appropriate U or E record available

Shortform:

No U or E record

Description:

No valid U- or E-booking found for this dataset.

SIS-MWV_30.docx

Version: 1.5.19608

Page 200 of 477

16.1.218  Errorcode 808: MDE event not alterable as OP is

MES Weaver

running

Shortform:

Ev. maint. cur. scen

Description:

Machine status must not be changed/deleted as the corresponding order still runs.

Problem:

Machine status must not be changed/deleted as the corresponding order

which is affected by the machine status still runs.

solution:

Please wait untill end of shift to change data,

because for MDE machines the operation will be shortly interuped at end of shift

or interupt the operation manually

16.1.219  Errorcode 809: Invalid superior status1 ID man. at TNR

Shortform:

Invalid super. MST1

Description:

Invalid superior machine status - the indicator <hierarchy level> is not set within the superior status!

Problem:

Invalid superior machine status - the indicator <hierarchy level> is not set within the superior status!

solution:

Set the indicator for <hierarchy level> in the superior status.

16.1.220  Errorcode 810: Inv.super.stat.2-m.stat.n.avail.f.m.no.

Shortform:

Inv.super.mach.stat.

Description:

Invalid superior machine status - the status is not available for the selected machine!

Problem:

Invalid superior machine status - the status is not available for the selected machine!

solution:

Please select an existing status.

SIS-MWV_30.docx

Version: 1.5.19608

Page 201 of 477

16.1.221  Errorcode 811: Invalid superior status3-MST = ueb MST

MES Weaver

Shortform:

Invalid super. MST3

Description:

Invalid superior machine status - superior status = inferior status

Problem:

Invalid superior machine status - superior status = inferior status

solution:

Please choose a status that is superior to this status.

16.1.222  Errorcode 812: Invalid superior satus4-reference chain

Shortform:

Invalid super. MST4

Description:

Invalid superior machine status - superior status refers to inferior status at the end of the hierarchy!

Problem:

Invalid superior machine status - superior status refers to inferior status at the end of the hierarchy!

solution:

Choose a status that is superior to this status.

16.1.223  Errorcode 813: Ev. maint. blocked as lock deleted

Shortform:

Event maint. no lock

Description:

Data are not locked anymore.

Problem:

Lock was deleted by an HYDRA adminstrator and changing / recalulating of the actually shown

data is not possible

solution:

Please select the data again, so the lock will be created newly

16.1.224  Errorcode 814: Either yield or scrap

Shortform:

Yield or scrap

SIS-MWV_30.docx

Version: 1.5.19608

Page 202 of 477

MES Weaver

Description:

Scrap or yield can be maintained!

solution:

Please change the always batched dataset.

16.1.225  Errorcode 815: Logoff date/time already exists

Shortform:

Logoff date exists

Description:

Logoff date/time has already been assigned.

solution:

Please change the always batched dataset(Logoff date/time).

16.1.226  Errorcode 816: Terminal has machines assigned

Shortform:

Terminal has mach.

Description:

The terminal has still machines assigned

Problem:

The terminal has still machines assigned

solution:

Please delete the machine assignements first

16.1.227  Errorcode 900: Unit is not available

Shortform:

Unit not available

Description:

Unit is not available

Problem:

Unit is not available.

solution:

Enter a valid unit or define a new one.

SIS-MWV_30.docx

Version: 1.5.19608

Page 203 of 477

16.1.228  Errorcode 901: Formula is not available

MES Weaver

Shortform:

Formula not avail.

Description:

Formula is not available.

Problem:

Formula is not available.

solution:

Enter a valid formula or define a new one.

16.1.229  Errorcode 902: Formula still in tab. USRFFIELDELEM

Shortform:

Formula still in use

Description:

Formula is still being used within the user fields.

Problem:

Formula is still being used within the user fields.

solution:

Delete the dependencies to this formula in the user fields first.

16.1.230  Errorcode 903: Formula still in tab. LSTCODES

Shortform:

Formula still in use

Description:

Formula is still being used within the service codes

Problem:

Formula is still being used within the service codes.

solution:

Delete the dependencies to this formula in the service codes first.

16.1.231  Errorcode 904: Formula still in tab. EINHUMR

Shortform:

Formula still in use

SIS-MWV_30.docx

Version: 1.5.19608

Page 204 of 477

MES Weaver

Description:

Formula is still being used in the unit conversion

Problem:

Formula is still being used in the unit conversion

solution:

Delete the dependencies to this formula in the unit conversion first.

16.1.232  Errorcode 905: There is alr. standard sequence f.order

Shortform:

Stand.seq. alr.avail

Description:

There is already a standard sequence for this order.

Problem:

There is already a standard sequence for this order.

solution:

Only one standard sequence per order is allowede. Insert a parallel or an alternative sequence

insted.

16.1.233  Errorcode 906: Standard sequence must not be delted

Shortform:

St.seq. n. deletable

Description:

Standard sequence must not be deleted.

Problem:

Standard sequence must not be deleted.

solution:

Standard sequence must not be deleted.

16.1.234  Errorcode 907: Act.can't be effect.after this seq.type

Shortform:

Inv. seq.type f.act.

Description:

Action cannot be carried out after this sequence category.

SIS-MWV_30.docx

Version: 1.5.19608

Page 205 of 477

MES Weaver

Problem:

The stated sequence category is not be supported.

solution:

Choose a supported sequence category.

16.1.235  Errorcode 908: Waiting period charac. already assigned

Shortform:

Wait.per.ch.assigned

Description:

Waiting period characteristic has already been assigned.

16.1.236  Errorcode 909: Initial stat. has not been assigned yet

Shortform:

Init. stat. n. ass.

Description:

Initial status has still not been assigned.

Problem:

Initial status has still not been assigned for this order type.

solution:

Define a initial status for this order type..

16.1.237  Errorcode 910: Category not correct

Shortform:

Category n. correct

Description:

Order Category incorrect.

16.1.238  Errorcode 911: Processing code not available

Shortform:

Proc. code n. avail.

Description:

Processing code not available.

Problem:

Processing code not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 206 of 477

solution:

Please select an existing processing code

16.1.239  Errorcode 912: Seq. change n. poss. due to ord. stat.

MES Weaver

Shortform:

Seq. change n. poss.

Description:

Sequence change impossible due to order status.

16.1.240  Errorcode 913: Seq. change only possible for alt. seq.

Shortform:

Seq. change n. poss.

Description:

Sequence change only possible for alternative sequences.

Problem:

Sequence change only possible for alternative sequences

(the selected sequence is not an alternative sequences)

solution:

-

16.1.241  Errorcode 914: An OP of the sequnce is alr. running

Shortform:

Seq. change n. poss.

Description:

One OP of the sequence already runs.

Problem:

Sequence change only possible if no operation of the sequence is started.

All operations of the sequence must be in the state V,S or Y

solution:

-

16.1.242  Errorcode 915: Branch OP is invalid

Shortform:

Invalid branch OP

SIS-MWV_30.docx

Version: 1.5.19608

Page 207 of 477

MES Weaver

Description:

Branch OP is invalid.

16.1.243  Errorcode 916: Return address is invalid

Shortform:

Invalid return OP

Description:

Return address is invalid.

16.1.244  Errorcode 917: Location group from/to is invalid

Shortform:

Locat. grp. invalid

Description:

Location group from/to is invalid.

Problem:

You have entered an invalid location group.

solution:

Choose a valid location group or create the required location group in the group configuration

16.1.245  Errorcode 918: Group is no capacity group

Shortform:

No capacity group

Description:

Group is not a capacity group.

Problem:

A resource of type MGRP has to be a capacity group

16.1.246  Errorcode 919: Sel. field type does not go with DB type

Shortform:

Incompatible DB type

Description:

The field <USRFLDELEM.KENN> cannot be created for the index <USRFLDELEM.IDX> as this

one is of the database type <USRFLDELEM.DBTYP>.

SIS-MWV_30.docx

Version: 1.5.19608

Page 208 of 477

MES Weaver

Problem:

The user field does not support the selected fieldtype

solution:

Choose a different user field to save data in the chosen field type

16.1.247  Errorcode 920: Error while init. planning component

Shortform:

Error init. plan. c.

Description:

The planning component cannot be initialized

solution:

Please contact MPDV Support.

16.1.248  Errorcode 921: ID is not in table USERFIELDDEF

Shortform:

ID not defined

Description:

The ID USERFIELDDEF is not available in the table.

Problem:

The field type of the specified field identifier is not configured

solution:

Choose a suitable field identifier or create a new field type in the field type definition

16.1.249  Errorcode 922: Year model is still in transp. matrix

Shortform:

Year model in use

Description:

Year model is still available within transport matrix.

Problem:

The year model can not be deleted, because it is still used in the transport matrix

solution:

Delete the entry in the transport matrix before you delete the year model

SIS-MWV_30.docx

Version: 1.5.19608

Page 209 of 477

16.1.250  Errorcode 923: Cost center group <> cost center

MES Weaver

machine

Shortform:

Grp.CCR <> Mnr.CCR

Description:

The cost center of the machine has to correspond to the cost center of the group.

Problem:

A cost center,which does not correspond to the cost center of the group, is assigned to the

machine.

solution:

The cost center of the machine has to correspond to the cost center of the group MDE -> master

data -> machine/workplace configuration -> group.

16.1.251  Errorcode 924: Only one SI unit can be defined per type

Shortform:

SI unit assigned

Description:

One SI unit can be defined per type only.

16.1.252  Errorcode 925: Sequence not available

Shortform:

Seq. not available

Description:

Sequence not available.

Problem:

Sequence not available.

solution:

Please enter a valid sequence

16.1.253  Errorcode 926: Sequence is still used by orders

Shortform:

Seq. still in use

Description:

Sequence is still being used by orders.

SIS-MWV_30.docx

Version: 1.5.19608

Page 210 of 477

MES Weaver

Problem:

Sequence can not be deleted because there are operations existing in this sequence

solution:

Delete all operations of the sequence before deleting the sequence.

16.1.254  Errorcode 927: Machine is in production

Shortform:

Mach. in production

Description:

Machine is in production.

Problem:

The machine is in production. Therefore, it is impossible to switch to the production lock.

solution:

Changing to the production lock is only possible in case of a malfunction.

16.1.255  Errorcode 928: Machine is in production lock

Shortform:

Mach. in prod. lock

Description:

Machine is in production lock.

Problem:

The machine is within production lock.

Therefore, it is impossible to switch to the production status.

solution:

At the shop floor data collection terminal the production lock at the machine can be deactivated via

the button "production lock" or by setting a status without production lock.

16.1.256  Errorcode 929: An alternative sequence is alr. active

Shortform:

Alt. seq. alr.active

Description:

An alternative sequence is already active.

SIS-MWV_30.docx

Version: 1.5.19608

Page 211 of 477

MES Weaver

Problem:

Only one alternative sequence can be active for an order.

Activating of the sequence can be failed

because in the sequence already a 2. alternative sequence is active

solution:

-

16.1.257  Errorcode 930: maximum number of counter is

exceeded

Shortform:

max. num. of counters

16.1.258  Errorcode 931: allocation with same type not possible

Shortform:

allocation n. possib

Description:

Allocation with same type is not possible

16.1.259  Errorcode 932: Unknown list command

Shortform:

Unknown list command

Description:

Unknown list command

16.1.260  Errorcode 933: status text cannot be deleted

Shortform:

statustext not delet

Description:

status text cannot be deleted

16.1.261  Errorcode 934: hierarchical status cannot be assigned

Shortform:

hiera.stat. no assig

SIS-MWV_30.docx

Version: 1.5.19608

Page 212 of 477

MES Weaver

Description:

A hierarchical status cannot be assigned

Problem:

You try to assign a hierarchical status. This is not allowed.

solution:

Choose a other status

16.1.262  Errorcode 935: counter configuration not supported

Shortform:

ctr conf not support

Description:

counter configuration is not supported

Problem:

The full counter configuration is only supported for terminals CT-8xx and CT-76x.

solution:

See the specific counter configuration documentation

16.1.263  Errorcode 936: Overlapping shifts

Shortform:

Overlapping shifts

Description:

Overlapping shifts

Problem:

A shift begins earlier than previous shift ends.

solution:

Please change the shift starting and/or end point

16.1.264  Errorcode 937: Overlapping breaks

Shortform:

Overlapping breaks

Description:

Overlapping breaks

Problem:

A break within a shift begins earlier than previous break ends.

SIS-MWV_30.docx

Version: 1.5.19608

Page 213 of 477

solution:

Please change the break starting and/or end point

16.1.265  Errorcode 938: Status must be config. -OP logged on-

MES Weaver

Shortform:

Status not possible

Description:

Choosen status must be configured in the statusconfiguration as "Operation must be logged on"

Problem:

Choosen status which should be configured as allowed with ordertyp must be configured in the

statusconfiguration as "Operation must be logged on"

solution:

Please change the statusconfiguration for the chossen status to "Operation must be logged on"

16.1.266  Errorcode 939: MDE event for Shiftend not alterable

Shortform:

Ev. maint. shift end

Description:

Machine status for end of shift must not be changed/deleted.

Problem:

Machine status must not be changed/deleted if it is an shift end event

solution:

Please change event if nessesary in the Event Maintanance table

16.1.267  Errorcode 940: User name for single sign-on missing

Shortform:

User name missing

Description:

The user name for single sign-on must be specified if single sign is enabled on for this user.

Problem:

Single sign-on was enabled for the user, but a username for single sign-on was not specified

solution:

Specify the user name for single sign-on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 214 of 477

16.1.268  Errorcode 941: Status is not valid (RESTYP/RES)

MES Weaver

Shortform:

Status is not valid

Description:

Status is not valid (RESTYP/RES)

Problem:

The stated status is not available and a resource-specified status exists.

solution:

Send the correct status or configure the status

16.1.269  Errorcode 942: Status is not valid (RESTYP/RESFAM)

Shortform:

Status is not valid

Description:

Status is not valid (RESTYP/RESFAM)

Problem:

The stated status is not available and a resource-family-specified status exists.

solution:

Send the correct status or configure the status

16.1.270  Errorcode 943: Status is not available (RESTYP)

Shortform:

Status not available

Description:

Status is not available

Problem:

The stated status is not available.

solution:

Send the correct status or configure the status

16.1.271  Errorcode 944: Status is not active

Shortform:

Status is not active

SIS-MWV_30.docx

Version: 1.5.19608

Page 215 of 477

MES Weaver

Description:

Status is not active

Problem:

The stated Status is not active.

solution:

Send the correct status

16.1.272  Errorcode 945: Status is already active

Shortform:

Status is active

Description:

Status is already active

Problem:

The stated Status is already active.

solution:

Send the correct status

16.1.273  Errorcode 946: counter configuration not available

Shortform:

ctr conf not availab

Description:

Counter configuration is not available

Problem:

There is no configuration for the specified counter.

solution:

Change the counter configuration.

16.1.274  Errorcode 947: Machine/line group assignment exists

Shortform:

line group assignm.

Description:

Machine/line group assignment exists

Problem:

Machine/line group assignment already available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 216 of 477

solution:

The assignment of the machine to a line group already exists.

16.1.275  Errorcode 948: Copy mach/line grp. ass. MOD=Z not

MES Weaver

allow

Shortform:

Cpy ma/linegrp MOD=Z

Description:

Copy Machine/line group assignment with mode Z

Problem:

It is not allowed to copy a machine/line group including its assignments because a machine could

not assigned to more than one line group

solution:

Check the machine/line group assignment.

16.1.276  Errorcode 949: Error in Configuration: PZE controls

BDE

Shortform:

Error in Config.

Description:

Error in Configuration: PZE controls BDE

Problem:

The configuration 'PZE controls BDE' is set to option 'K' (waiting period) or 'A' (auto log on) gesetzt.

This assumnes, that the option 'waiting period processing' ist also set.

solution:

Check the stated settings.

16.1.277  Errorcode 950: Dissolving of campaign not possible

Shortform:

No campaign dissolv.

Description:

Dissolving of campaign not possible

Problem:

The current campaign cannot be dissolved.

SIS-MWV_30.docx

Version: 1.5.19608

Page 217 of 477

solution:

Check the operations status.

16.1.278  Errorcode 1000: Person must not log on operation

MES Weaver

Shortform:

P.must not log on OP

Description:

Person is not allowed to log the operation on.

Problem:

The person is not authorized to log this operation on.

solution:

The person's ADE authorization level has to be higher than or equal as the authorization level of

the operation in order to be able to interrupt/log on/of or to partially confirm an operation. The

person's ADE authorization level is maintained at the client under HR master data, the authorization

level of the operation is specified by the PPS system and can be checked at the client via "edit

operations".

16.1.279  Errorcode 951: Machine/capacity group assignment

exists

Shortform:

capa group assignm.

Description:

Machine/capacity assignment exists

Problem:

Machine/capacity group assignment already available.

solution:

The assignment of the machine to a capacity group already exists.

16.1.280  Errorcode 1010: Person must not log off operation

Shortform:

P.must n. log off OP

Description:

Person is not allowed to log the operation off.

SIS-MWV_30.docx

Version: 1.5.19608

Page 218 of 477

MES Weaver

Problem:

The person is authorized to log this operation off.

solution:

See error code 1000

16.1.281  Errorcode 1019: P.must not log on sever.times in

advance

Shortform:

P.alr.logged i. adv.

Description:

Person is not allowed to log on in advance several times.

Problem:

A person tries to log on in advance although he/she has already logged on in advance to another

machine.

solution:

This person has to cancel the existing advance logon before he/shel will be able to log on again.

HYDRA also supports the multiple (advance) logon of a person. This option can be activated per

person at the client via HR master data.

16.1.282  Errorcode 1020: Person must not log on several times

Shortform:

P. alr. logged on

Description:

Person is not allowed to log on several times

Problem:

A person tries to log on, although he/she has already logged on to another machine.

solution:

This person has to log off at first, before he/she is allowed to log on again.

HYDRA also supports the multiple logon of a person. This option can be activated per person at the

client via HR master data

16.1.283  Errorcode 1021: Person may only log on to OP ■■■

Shortform:

P.alr.logged to OP

SIS-MWV_30.docx

Version: 1.5.19608

Page 219 of 477

MES Weaver

Description:

Person is only allowed to log on to a maximum number of OPs.

Problem:

A person tries to log on, although he/she has already reached the maximum admissible number of

logons.

solution:

This person has to log off at first before he/she will be able to log on again.

HYDRA supports a maximum number of logons when a person logs on several times. This number

can be configured for each person at the client HR master data

16.1.284  Errorcode 1022: Person must not report quantity to OP

Shortform:

P.must n. report qty

Description:

Person is not allowed to post the quantity onto the OP.

Problem:

A person tries to do a partial confirmation for a running OP although he/she is not authorized to do

this.

solution:

See error code 1000.

16.1.285  Errorcode 1023: Person must not interrupt OP

Shortform:

P.must n.interr. OP

Description:

Person is not allowed to interrupt the OP.

Problem:

The person is authorized to interrupt this operation.

solution:

See error code 1000

16.1.286  Errorcode 1030: Person not available

Shortform:

Person not available

SIS-MWV_30.docx

Version: 1.5.19608

Page 220 of 477

MES Weaver

Description:

Person is not available.

Problem:

The entered person does not exist within the HYDRA HR master data

solution:

At the client please check via HR master data whether there is a person with this personnel badge

number.

16.1.287  Errorcode 1031: Person has already left the company

Shortform:

Person has left

Description:

Person has already left the company.

Problem:

The indicated person is kept as "has already left the company" in the HR master data and thus has

no longer any authorizations.

solution:

Please check the person's leaving date at the PZE client under HR master data

16.1.288  Errorcode 1032: Person is blocked

Shortform:

Person blocked

Description:

Person has been blocked.

Problem:

The person has been blocked and therefore he/she must not post anything.

solution:

Please check the person's blocking indicator at the PZE client under HR master.data

16.1.289  Errorcode 1033: Person has not yet joined the

company

Shortform:

p. not joined comp.

SIS-MWV_30.docx

Version: 1.5.19608

Page 221 of 477

Description:

Person has not yet joined the company

16.1.290  Errorcode 1040: No order is running on machine

MES Weaver

Shortform:

Log on order

Description:

No order runs on the machine.

Problem:

A person tries to log on to a machine to which no operation has been logged on.

solution:

At first an operation has to be logged on to the machine not till then a person is able to log on.

16.1.291  Errorcode 1050: Person has already logged on

Shortform:

P. logged on already

Description:

Person has already logged on

Problem:

A person tries to log on, although he/she has already logged on to this machine.

solution:

A person can only log on once to a machine. Please check, whether the logon should be carried

out at another machine.

16.1.292  Errorcode 1060: Person is not logged on

Shortform:

P. not logged on

Description:

Person has not logged on

Problem:

A person tries to log off, although he/she has not logged on to this machine.

solution:

Please check, e.g. with the terminal function "a person's OPs" whether and where the person is

actually logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 222 of 477

16.1.293  Errorcode 1061: Nobody is logged on to machine

MES Weaver

Shortform:

Nobody logged on

Description:

Nobody is logged on to the machine.

Problem:

Customer-specific function: When logging an operation on it came out that nobody has logged on,

although it is required in this case.

solution:

A person has to log on at first.

16.1.294  Errorcode 1070: Changing not possible

Shortform:

Changing n. possible

Description:

Changing is impossible.

Problem:

A person tries to change target cycle or partitioning, although he/she is not authorized to do this.

solution:

Please check the authorization within the HR master data.

16.1.295  Errorcode 1090: Person must not change disturbance

Shortform:

P.must n.change dist

Description:

Person must not change disturbance.

Problem:

A person tries to change the status of the machine, although he/she is not authorized to do this.

solution:

Please check the MDE authorization within the HR master data. A person is only allowed to assign

the status if their authorization level is greater than or equal to the level of the assigned status. The

status authorizations are defined at the client within the menu item status assignment.(of

machines/workplace). If necessary, the person has to be logged on to change the status of the

machine. Please also check the authorization within the HR master data.

SIS-MWV_30.docx

Version: 1.5.19608

Page 223 of 477

16.1.296  Errorcode 1100: Person is already logged on to order

MES Weaver

Shortform:

P.alr.logged on OP

Description:

Person has already logged on to the order.

Problem:

A person tries to log on, although he/she has already logged on to this order.

solution:

A person can only log on once to an order. Please check, whether the logon should be carried out

at another order.

16.1.297  Errorcode 1101: Person is already logged on in

advance

Shortform:

P.alr.logged i.adv.

Description:

Person has already logged on in advance

Problem:

The person that tries to log on has already logged on to this machine in advance and therefore

must not log on again.

solution:

As of a configurable time prior to the beginning of the shift a person is not logged on to the current

shift but as advance logon to the next shift. This advance logon time can be configured per

terminal.

The personnel is automatically logged on at the beginning of the shift.

16.1.298  Errorcode 1102: It is not allowed logging off last pers.

Shortform:

Last person!

Description:

It is not allowed to log the last person off.

Problem:

It is not allowed to log the last person off.

SIS-MWV_30.docx

Version: 1.5.19608

Page 224 of 477

solution:

Another person has to log on first, before this person may log off.

16.1.299  Errorcode 1110: Person is not logged on to order

MES Weaver

Shortform:

P.n.logged on to OP

Description:

Person has not logged on to the order.

Problem:

The person could not carry out the posting as he/she is not logged on to the operation and

machine.

solution:

When it comes to postings onto group workplaces or overhead cost operations an operation may

only be confirmed partially/interrupted/logged off by the person who is logged on to the operation.

Via the info functions at the terminal or MOC it can be checked which person is logged on to the

operation. In addition to this processing it can be configured within the HYDRA HR master data that

the reporting person has always to be logged on.

16.1.300  Errorcode 1114: Person must not log off all persons

Shortform:

Logoff all p.n.poss.

Description:

The person is not allowed to log all people off.

Problem:

The person is not allowed to log all people off

solution:

You can permit the person to log all people off in the HR master data

16.1.301  Errorcode 1120: OP must not be finished

Shortform:

Finish. OP not poss.

Description:

An overhead cost order cannot be finished.

Problem:

It is attempted to log an operation off, although it is about an overhead cost order.

SIS-MWV_30.docx

Version: 1.5.19608

Page 225 of 477

solution:

Please check the setting of the order type at the MOC.

16.1.302  Errorcode 1122: Time stamp for logging on is invalid

MES Weaver

Shortform:

L.off n.pos.bef.L.on

Description:

The time stap for logging on is invalid.

Problem:

The logon time stamp is invalid as the logon has to be prior to the logoff.

solution:

Please correct the logon time stamp accordingly.

16.1.303  Errorcode 1123: Period has alr. been posted for person

Shortform:

Pers. alr. posted.

Description:

Period has already been posted for person.

Problem:

The period of time has already been posted for this person. Therefore, it cannot be entered once

more.

solution:

Please correct the period accordingly or enter the data for another person.

16.1.304  Errorcode 1124: Period has alr. been posted to for OP

Shortform:

OP already posted

Description:

Period has already been posted for OP.

Problem:

The period of time has already been posted for this OP. Therefore, it cannot be entered once more.

solution:

Please correct the period accordingly or enter the data for another OP.

SIS-MWV_30.docx

Version: 1.5.19608

Page 226 of 477

16.1.305  Errorcode 1154: Standard time ■■■■ not defined

MES Weaver

Shortform:

Standard time n.def.

Description:

Standard time has not been defined.

Problem:

Customer-specific check when interrupting/logging an operation off. It was detected that the default

time has not been defined.

solution:

Please check whether the standard times have been defined in the specified table for this machine.

16.1.306  Errorcode 1158: Target quantity not reached/exceeded

Shortform:

Inadmissible yield

Description:

Target quantity not reached.

Problem:

Customer-specific check when partially confirm/logging an operation off. It was detected that the

target quantity and the target quantity number do not correspond to the specifications of the

machines.

solution:

Please check the target quantity in the operation-related specifications.

16.1.307  Errorcode 1159: Inadmissible cost center

Shortform:

Inadm. cost center

Description:

Invalid cost center

Problem:

Customer-specific check when interrupting, partially confirming or logging an operation off. The

scrap-causing cost center does not exist as cost center of the machine.

solution:

Please check whether the entered cost center when logging on/off with the cost center of a

machine corresponds to the one within machines/WP.

SIS-MWV_30.docx

Version: 1.5.19608

Page 227 of 477

16.1.308  Errorcode 1160: Scrap quantity exceeds batch quantity

MES Weaver

Shortform:

Inadmiss. scrap qty.

Description:

Scrap quantity exceeds batch quantity

Problem:

The scrap quantity exceeds batch quantity

solution:

Please check your input

16.1.309  Errorcode 1163: Quantity not reached/exceeded

Shortform:

Inadmissible quant.

Description:

Quantity inadmissible.

Problem:

Check when posting the quantity (batch quantity, residual quantity) of a batch.

16.1.310  Errorcode 1230: Operations are still logged on

Shortform:

OP still logged on

Description:

Operations are still logged on

Problem:

Operations are still logged on

solution:

Please log of operations first

16.1.311  Errorcode 1240: Warning - overproduction OP!

Shortform:

Overproduction OP

Description:

Posting not allowed due to overproduction

SIS-MWV_30.docx

Version: 1.5.19608

Page 228 of 477

MES Weaver

Problem:

During the posting overproduction was detected for the operation according to the target quantity

check at the OP.

solution:

Verify the check defined at the operation for overdelivery.

Enter a quantity that lies within the limits defined for the order or contact your system administrator

and have the quantities or limits of the order adjusted.

16.1.312  Errorcode 1241: Logon not allowed overprod. of

packages

Shortform:

Overproduct.of pack.

Description:

Posting not allowed due to overproduction of packages

Problem:

When logging packages on it is defined customer-specifically that the amount of packages exceeds

the default target quantity.

solution:

The target quantity check can be activated/deactivated with respect to the personnel. The target

quantity of packages is transferred via the HYDRA Info interface (record type AD) from the guiding

system to HYDRA.

16.1.313  Errorcode 1242: Warning - overproduction machine!

Shortform:

Overprod. machine

Description:

Posting not allowed due to overproduction at machine

Problem:

During the posting overproduction was detected for the workplace/machine according to the target

quantity check at the machine.

solution:

Verify the check defined at the workplace for overdelivery. (customer-specific).

Enter a quantity that lies within the limits defined at the workplace or contact your administrator and

have the limits at the workplace adjusted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 229 of 477

16.1.314  Errorcode 1243: Warning - overproduction Person!

MES Weaver

Shortform:

Overproduct. person

Description:

Posting not allowed due to overproduction for person

Problem:

During the posting overproduction was detected for the person according to the target quantity

check at the person.

solution:

Verify the check defined at the HR master data for overdelivery.

Enter a quantity that lies within the limits defined for your person or contact your administrator and

have the limits of your HR master data adjusted.

16.1.315  Errorcode 1244: Posting not allowed: overproduction

OP

Shortform:

Overproduction OP

Description:

Posting not allowed due to overproduction

Problem:

During the posting overproduction was detected for the operation according to the target quantity

check at the OP.

solution:

Verify the check defined at the operation for overdelivery.

Enter a quantity that lies within the limits defined for the order or contact your system administrator

and have the quantities or limits of the order adjusted.

16.1.316  Errorcode 1245: Below target quantity

Shortform:

Below target qty.

Description:

The actual quantity does not reach the default target quantity.

SIS-MWV_30.docx

Version: 1.5.19608

Page 230 of 477

MES Weaver

Problem:

Customer-specifically, it is found out during posting that the actual quantity falls short of the default

target quantity.

solution:

Enter a quantity with which the target quantity is reached.

16.1.317  Errorcode 1246: Target quantity exceeded

Shortform:

Target qty. exceeded

Description:

The actual quantity exceeds the default target quantity.

Problem:

Customer-specifically, it is found out during posting that the actual quantity exceeds the default

target quantity.

solution:

Enter a quantity with which the target quantity is reached.

16.1.318  Errorcode 1247: Posting not allowed: underproduction

OP

Shortform:

Underproduction OP

Description:

Posting not allowed due to underproduction

Problem:

During posting it is detected that there is underproduction for the operation according to the target

quantity check at the OP.

solution:

Verify the check defined for the operation for underdelivery.

Enter a quantity that lies within the limits defined in the order or contact your administrator and have

the quantities or limits within the order adjusted.

16.1.319  Errorcode 1248: Warning - underproduction machine!

Shortform:

Underprod. machine

SIS-MWV_30.docx

Version: 1.5.19608

Page 231 of 477

MES Weaver

Description:

Posting not allowed due to underproduction at the machine

Problem:

During posting underproduction /underdelivery is detected for the workplace/ machine according to

the target quantity check at the machine.

solution:

Verify the check defined for the workplace for underproduction (customer-specific)

Enter a quantity that lies within the limits defined at the workplace or contact your administrator and

have the limits at the operation adjusted.

16.1.320  Errorcode 1249: Warning - underproduction person!

Shortform:

Underprod. person

Description:

Posting not allowed due to underproduction at person

Problem:

During posting underproductin is detected for the person according to the person's target quantity

check.

solution:

Verify the check defined in the HR master data for underdelivery.

Enter a quantity that lies within the limits defined for your person or contact your administrator and

have the limits at your HR master data adjusted.

16.1.321  Errorcode 1250: Warning - underproduction OP

Shortform:

Underproduction OP

Description:

Posting not allowed due to underproduction

Problem:

During posting it is detected that there is underproduction for the operation according to the target

quantity check at the OP.

solution:

Verify the check defined for the operation for underdelivery.

Enter a quantity that lies within the limits defined in the order or contact your administrator and have

the quantities or limits within the order adjusted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 232 of 477

16.1.322  Errorcode 1251: Logon not allowed underprod. of

MES Weaver

packages

Shortform:

Underprod. of pack.

Description:

Posting not allowed due to underproduction of packages.

Problem:

Customer-specifically it is detected when posting packages that the amount of packages does not

reach the default target quantity.

solution:

The target quantity check can be activated/deactivated with respect to the personnel. The target

quantity of packages is transferred via the HYDRA Info interface (record type AD) from the guiding

system to HYDRA.

16.1.323  Errorcode 1252: Target output not reached

Shortform:

Targ. outp. n.reach.

Description:

The target activity has not been reached.

Problem:

During posting it is detected that the target output has not been reached.

solution:

Check the target output defined at the operation and the indication in per cent on the underdelivery

at the activity code

Enter an output that lies within the limits defined within the activity code or contact your

administrator and have the target activity or the limits within the activity code or order adjusted.

16.1.324  Errorcode 1253: Target output exceeded

Shortform:

Target outp. exceed.

Description:

Target output has been exceeded.

Problem:

During posting it is detected that the target output has been exceeded.

SIS-MWV_30.docx

Version: 1.5.19608

Page 233 of 477

MES Weaver

solution:

Check the target output defined at the operation and the indication in per cent on the overdelivery

at the activity code.

Enter an output that lies within the limits defined in the activity code or contact your administrator

and have the target output or limits within the activity code or order adjusted.

16.1.325  Errorcode 1260: Orig.OP of a split OP can't be logged

on

Shortform:

Orig.OP cant be log.

Description:

The original operation of a split operation cannot be logged on.

Problem:

A master operation (original), which was split before and therefore cannot be logged on again, was

attempted to be logged on.

solution:

Instead of the master operation, the individual operations have to be logged on. If necessary the

split operation can be regrouped again.

16.1.326  Errorcode 1270: Ind.OP of collect.OP can't be logged

on

Shortform:

COP can't be log. on

Description:

An individual operation of a collective operation cannot be logged on.

Problem:

An operation, which is part of a collective operation and therefore can only be logged on via this

one, was attempted to be logged on.

solution:

Instead of the individual operation the collective operation has to be logged on. If necessary, the

collective operation can be cancelled again.

16.1.327  Errorcode 1280: Operation is already available

Shortform:

OP alr. available

SIS-MWV_30.docx

Version: 1.5.19608

Page 234 of 477

MES Weaver

Description:

Operation is already available.

Problem:

The operation is already available.

solution:

Enter a free operation number.

16.1.328  Errorcode 1290: OP cannot be created

Shortform:

Error creating OP

Description:

The operation cannot be created.

Problem:

The operation cannot be created as no operation number has been indicated or the indicated

operation number has already been assigned.

solution:

Enter a free operation number.

16.1.329  Errorcode 1295: EQPOOL/father object not available

Shortform:

EQPOOL-Obj. n. avail

Description:

EQPOOL/Father object not available.

16.1.330  Errorcode 1296: Object already exists

Shortform:

Obj. already exists

Description:

Object already available.

16.1.331  Errorcode 1297: Object not available

Shortform:

Object not available

SIS-MWV_30.docx

Version: 1.5.19608

Page 235 of 477

Description:

Object not available

16.1.332  Errorcode 1300: An individual OP is still logged on

MES Weaver

Shortform:

Ind.OP still log.on

Description:

An individual operation is still logged on

Problem:

It is impossible to log a collective operation on since an individual operation is still logged on.

solution:

Please finish the individual operation at first.

16.1.333  Errorcode 1310: A collective OP is still logged on

Shortform:

COP still logged on

Description:

A collective operation is still logged on.

Problem:

It is impossible to log a individual operation on since an collective operation is still logged on.

solution:

Please finish the collective operation at first.

16.1.334  Errorcode 1320: Max. number of persons is logged on

Shortform:

max.no.pers.loggd on

Description:

The maximum number of people is logged on

Problem:

A person tries to log on to an operation, although the planned maximum number of people has

already logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 236 of 477

MES Weaver

solution:

An operator ratio is specified per operation. If the number of registered persons reaches this value

a person has at first to log off before another person is able to log on again.

This plausibility check can be activated/deactivated for the entire HYDRA system. If this check is

not required please contact MPDV Support.

16.1.335  Errorcode 1330: Clocking-in of person is missing

Shortform:

P.clocks in is miss.

Description:

The person's clocking-in is missing.

Problem:

The reporting person has not yet clocked-in via HYDRA-PZE.

solution:

People are only allowed to post within HYDRA-BDE provided that they are present. Therefore, the

person has at first to clock-in.

This plausibility check can be activated/deactivated for the entire HYDRA system. If this check is

not required please contact MPDV Support.

16.1.336  Errorcode 1340: No collective OP has been logged on

Shortform:

No COP logged on

Description:

No collective operation has been logged on.

Problem:

The operator tried to post a collective operation with the functions interrupt COP or log COP off,

although no collective operation has been logged on.

solution:

By means of the info functions at the terminal or the MOC the operator can check whether he/she is

logged on and to which operation.

16.1.337  Errorcode 1350: COP cannot be interrupted as ind. OP

Shortform:

N. poss. for ind.OP

SIS-MWV_30.docx

Version: 1.5.19608

Page 237 of 477

MES Weaver

Description:

Collective operation cannot be interrupted as individual operation.

Problem:

The operator tried to post a collective operation with the functions interrupt OP or log OP off.

solution:

Collective operations have to be posted with the functions interrupt COP or log COP off. (please

also see the terminal manual, collective operations)

16.1.338  Errorcode 1360: Partial confirmat. not possible for COP

Shortform:

N. poss. for COP

Description:

Partial confirmations are not possible for collective operations.

Problem:

A partial confirmation is attempted to be carried out for a collective operation.

solution:

Partial confirmations are not allowed for COPs.

16.1.339  Errorcode 1370: OP has been logged on as COP

Shortform:

OP logged on as COP

Description:

The operation has been logged on as collective operation.

Problem:

The operator tries to log an operation on that has already been logged on as collective operation.

solution:

An operation that is part of a collective operation cannot be logged on several times.

Not until the collective operation has been interrupted the operation can be logged on again.

16.1.340  Errorcode 1380: Shop papers not printed

Shortform:

Shoppapers n.printed

Description:

Shop papers have not been printed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 238 of 477

MES Weaver

Problem:

An operation whose shop papers have not yet been printed is attempted to be logged on.

solution:

At first print the shop papers before you log the operation on. This plausibility check can be

activated/deactivated for the entire HYDRA system. If this check is not required please contact

MPDV support.

16.1.341  Errorcode 1390: Min. setup time has not been reached

Shortform:

Min.setup time

Description:

Minimum setup time has not been reached.

Problem:

The posting cannot be carried out as the minimum setup time has not yet been reached.

solution:

Please wait until the minimum setup time has been reached and redo the booking.

16.1.342  Errorcode 1400: Invalid scrap reason

Shortform:

Invalid reason

Description:

Invalid scrap reason

Problem:

An invalid scrap reason has been recorded during posting.

solution:

All scrap reasons have to be defined at the MOC.

16.1.343  Errorcode 1401: Invalid deviation reason

Shortform:

Invalid reason

Description:

Invalid reason for deviation

Problem:

An invalid reason for deviation has been recorded during posting.

SIS-MWV_30.docx

Version: 1.5.19608

Page 239 of 477

solution:

All reasons for deviation have to be defined at the MOC.

16.1.344  Errorcode 1410: Person may only log on COP to 1

MES Weaver

machine

Shortform:

COP only to 1 mach.

Description:

Person may only log collective operation on to one machine.

Problem:

Person may only log collective operation on to one machine.

solution:

The person has to complete the active collective operation first, before the person may log a new

collective operation on.

16.1.345  Errorcode 1420: OP has alr. been logged on as

Individ.OP

Shortform:

OP log. on as ind.OP

Description:

Operation has already been logged on as individual operation.

Problem:

The operator tries to log an operation on that has already been registered as collective operation.

solution:

An individual operation that has already been logged on cannot additionally be logged on as

collective operation.

Not until the individual operation has been interrupted this one can be logged on as part of a

collective operation.

16.1.346  Errorcode 1430: Person logged on to individual OP

Shortform:

P.loggd on to ind.OP

Description:

Person is logged on to individual operation.

SIS-MWV_30.docx

Version: 1.5.19608

Page 240 of 477

MES Weaver

Problem:

The operator tries to log off with COP functions, although he/she is logged on to an individual

operation.

solution:

By means of the info functions at the terminal or MOC the operators can check whether they are

logged on or not and to which operation.

By means of the function log person off the operators can log off, by using the interrupt/log

operation off function they can log off with the operation.

16.1.347  Errorcode 1440: Person logged on to collective OP

Shortform:

P. logged on to COP

Description:

Person is logged on to collective operation.

Problem:

The operator tries to log off with the log person off function, although he/she is logged on to a

collective operation.

solution:

A collective operation can only be interrupted/logged off by using the interrupt/log COP off

functions.

16.1.348  Errorcode 1450: Collective OP not allowed

Shortform:

COP not allowed

Description:

Collective operation is not allowed.

Problem:

A collective operation cannot be logged on to this machine.

solution:

Please check whether

- the function ADE-SAG is licensed

- the option "processing of collective operations at the terminal" has been activated within the

HYDRA basic settings.

- the collective operations parameter is active within the terminal configuration for BDE.

SIS-MWV_30.docx

Version: 1.5.19608

Page 241 of 477

16.1.349  Errorcode 1451: Collective OP not allowed without ref.

MES Weaver

Shortform:

COP not allowed

16.1.350  Errorcode 1460: Collective OP has already been logged

on

Shortform:

COP alr. logged on

Description:

Collective operation has already been logged on.

Problem:

The operator tries to log on. Since only COPs are active at the machine the person cannot be

logged on.

solution:

When it comes to the logon of COPs the registering person is automatically logged on along with

the COP and therefore, the person has not to log on separately (see operation of terminal manual).

16.1.351  Errorcode 1472: Collect. OP n.possible at machin.

center

Shortform:

COP n.allow.machcent

Description:

Collective operation is impossible at machining center.

Problem:

The collective operation cannot be logged on to this machine as it is a machining center.

solution:

COP functions cannot be used at the machining center.

16.1.352  Errorcode 1473: Collect. OP is logged on at other

machin

Shortform:

COP n.allow.machine

SIS-MWV_30.docx

Version: 1.5.19608

Page 242 of 477

MES Weaver

Problem:

The collective operation cannot be logged on to this machine as it is already logged on another

machine

solution:

Operations of a collective OP may only be logged on wihtin one machine.

16.1.353  Errorcode 1480: An indiv. OP has already been logged

on

Shortform:

Ind.OP alr.logged on

Description:

An individual operation has already been logged on.

Problem:

The operator tries to log an overhead cost operation on, although a production operation is still

active at this machine.

solution:

It is not allowed to log overhead cost operations and production operations on to a machine at the

same time. Interrupt the production operation at first to be able to log the overhead cost operation

on afterwards.

16.1.354  Errorcode 1490: An OC order has already been logged

on

Shortform:

OC OP alr. logged on

Description:

An overhead cost order has already been logged on.

Problem:

The operator tries to log a production operation on, although an overhead cost operation is still

active at this machine.

solution:

It is not allowed to log an overhead cost operation and a production operation on to a machine at

the same time. Interrupt the overhead cost operation at first in order to be able to log the production

operation on afterwards.

SIS-MWV_30.docx

Version: 1.5.19608

Page 243 of 477

16.1.355  Errorcode 1491: A collective OP has alr. been logged

MES Weaver

on

Shortform:

COP alr. logged on

Description:

A collective OP has already been logged on.

Problem:

The operation cannot be logged on to this machine as a machine-specific collective operation is

already active.

solution:

Only a machine-specific collective operation may be logged on to a machine.

16.1.356  Errorcode 1492: Not possible - OP has been logged on

Shortform:

n.poss.OP is running

Description:

Impossible - the OP has been logged on.

Problem:

A change in the waiting time processing "person" can not be made if a waiting period operation

"person" runs.

solution:

Change the settings, when no waiting period operations "person" logged on

16.1.357  Errorcode 1493: Not possible-OP does not have type

GKM

Shortform:

N.poss.OPtype n.GKM

Description:

Impossible - the OP is no overhead cost order for machines.

Problem:

The OP is not an overhead cost order for machines. Therefore, an assignment is not allowed.

solution:

Assign an OP of the GKM type.

SIS-MWV_30.docx

Version: 1.5.19608

Page 244 of 477

16.1.358  Errorcode 1494: Not possible-OP does not have type

MES Weaver

GKP

Shortform:

N.poss.OPtype n. GKP

Description:

Impossible - the OP is no overhead cost order for people.

Problem:

The OP is not an overhead cost order for people. Therefore, an asignment is not allowed.

solution:

Assign an OP of the type GKP.

16.1.359  Errorcode 1520: N.poss. to log pers. on/off to

GWP/OCOP

Shortform:

N.poss. log p.on/off

Description:

It is not possible to log persons on/off to group workplaces/overhead cost operations.

Problem:

The operator tries to log on/off to a group workplace or an overhead cost operation, although this is

not allowed.

solution:

Only combined registrations of operations and staff are supported at group workplaces or in case of

postings to overhead cost operations.

The logon can be made via the log OP on function and by using the interrupt OP or log OP off

function they can be interrupted or logged off.

16.1.360  Errorcode 1530: It's required to enter badge no. at GWP

Shortform:

N.poss.log on to WP

Description:

It is required to enter the badge number at group workplaces.

Problem:

A posting onto a group workplace has been performed without entering the personnel badge

number.

SIS-MWV_30.docx

Version: 1.5.19608

Page 245 of 477

MES Weaver

solution:

It is mandatory to enter the personnel badge number in the dialog when it comes to postings onto a

group workplace. Check the settings of the terminal concerning the dialog configuration.

16.1.361  Errorcode 1540: No status change possible at GWP

Shortform:

No stat. change poss

Description:

It is impossible to change the status at group workplaces.

Problem:

A status has been changed at a group workplace.

solution:

Statuses cannot be changed at group workplaces as only the status production is recorded here.

16.1.362  Errorcode 1541: Status not allowed for active OP

Shortform:

Stat. not possible

Description:

Status is not allowed in case of active OPs.

Problem:

A status was attempted to be logged on that may only be logged on when at this point in time NO

operation is logged on to the machine.

solution:

Another status has to be chosen as the status in use is assigned to "machine-related downtime

reason" in its configuration.

16.1.363  Errorcode 1542: Status only allowed for active OP

Shortform:

Stat. not possible

Description:

Status is only allowed in case of active OPs

Problem:

A status was attempted to be logged on that may only be logged on when at this point in time an

operation is logged on to the machine.

SIS-MWV_30.docx

Version: 1.5.19608

Page 246 of 477

MES Weaver

solution:

Another status has to be chosen as the status in use is assigned to "order-related downtime

reason" in its configuration.

16.1.364  Errorcode 1543: Status n. allowed for type of active OP

Shortform:

Stat. not possible

Description:

Status is not allowed for order type of running OP.

Problem:

A status was attempted to be logged on that is not configured for the order type of the actual

running operation (Configuration -machinestatus for ordertype-)

solution:

Another status has to be chosen as the status in use is not configured in the configuration -

machinestatus for ordertype-

16.1.365  Errorcode 1560: Logging off operation is not allowed

Shortform:

Log OP off n.allowed

Description:

It is not allowed to log the operation off.

Problem:

The operator tries to log an operation (e.g. overhead cost operation) off, whitch cannot be finished

solution:

Overhead cost operations cannot be finished. If necessary, use another order type (see

configuration management manual in operation-specific configuration).

16.1.366  Errorcode 1561: Interrupting OP not allowed

Shortform:

Interr.OP n. allowed

Description:

It is not allowed to interrupt the operation.

Problem:

The operator tries to interrupt an operation, whitch cannot be interrupted

SIS-MWV_30.docx

Version: 1.5.19608

Page 247 of 477

solution:

Please check the setting of the order type. If necessary, the operation may only be logged off.

16.1.367  Errorcode 1581: No person logged on with operator

MES Weaver

pos.1

Shortform:

Oper.pos1 n.loggd on

Description:

Nobody with operator position 1 is logged on.

Problem:

Nobody with operator position 1 is logged on.

solution:

A person with operator position 1 has to log on at first.

16.1.368  Errorcode 1582: Allow. no. of pers.reached f. oper.pos

Shortform:

No.pers.op.pos reach

Description:

No more persons than indicated may log on to one operator position.

Problem:

No more persons than indicated may log on to one operator position.

solution:

The person has to log on to another operator position or other persons have to log off from the

operator position.

16.1.369  Errorcode 1585: The event has already been logged on

Shortform:

Double logon

Description:

The event has already been logged on.

Problem:

The event has already been logged on.

solution:

Internal error, please contact MPDV-Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 248 of 477

16.1.370  Errorcode 1590: OP can't be logged on due to pred.

MES Weaver

stat.

Shortform:

Pred.stat.n.log on

Description:

Predecessor has a status that does not allow to log the successer on.

Problem:

The operator tries to log an operation on, although the predecessor operation has a status that

does not allow to log the successor on.

solution:

The specified production sequence has not been observed. The flag "successor can be logged on"

has to be set at the status of the previous operation of the order in order that the following operation

can be logged on.

This plausibility check can be defined within the configuration of the operation status of HYDRA. If

this check is not required please contact MPDV Support.

16.1.371  Errorcode 1591: OP can't be logged on due to

preced.stat.

Shortform:

Preced.stat.n.log on

Description:

The predecessor operation has not yet been finished.

Problem:

The operator tries to log an operation off, although the predecessor operation has a status that

does not allow to log the successor on.

solution:

The specified production sequence has not been observed. The flag "successor can be logged off"

has to be configured at the status of the previous operation of the order in order that the following

operation can be logged off.

This plausibility check can be defined within the configuration of the operation status in HYDRA. If

this check is not required please contact MPDV-Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 249 of 477

16.1.372  Errorcode 1592: Preced. OP is prepared in order

MES Weaver

network

Shortform:

Error preced. status

Description:

Predecessor operation within order network is prepared.

Problem:

The operator tries to log an operation on, although the predecessor operation is still prepared within

the order network.

solution:

The specified production sequence has not been observed. The status of all predecessor

operations has to be running, interrupted or finished within the order network in order that the

following operation can be logged on.

This plausibility check can be activated/deactivated for the entire HYDRA system. If this check is

not required please contact MPDV Support.

16.1.373  Errorcode 1593: Batch status not allowed

Shortform:

Batch.sta.n.allowed

Description:

Batch status not allowed to this operation

Problem:

When logging an input batch on it is detected that this batch is not free and thus must not be logged

on.

solution:

Check the batch and transport status at the MOC in the batch data maintenance. Only batches with

the status "free" may be logged on to the machine as input batches.

16.1.374  Errorcode 1594: The batch status is invalid

Shortform:

Batch status invalid

Description:

The batch status is invalid.

SIS-MWV_30.docx

Version: 1.5.19608

Page 250 of 477

MES Weaver

Problem:

The batch status is invalid.

solution:

Please book another batch with a valid status.

16.1.375  Errorcode 1596: Invalid transport unit

Shortform:

Invalid TPU

Description:

Invalid transport unit.

Problem:

The selected transport unit is invalid.

solution:

Please select a transport unit

16.1.376  Errorcode 1600: A capacity OP cannot be logged on

Shortform:

Cap.OP not possible

Description:

A capacity operation cannot be logged on.

Problem:

A capacity operation was tried to be logged on, although this is not allowed.

solution:

Capacity operations only serve as placeholders for planning and cannot be logged on. If necessary,

use another order type or log the correct operation on.

16.1.377  Errorcode 1601: Tool is active

Shortform:

Tool active

Description:

Tool is active.

Problem:

With an activated tool management a tool or an order with tool was tried to be logged on to the

machine, although the tool is already active.

SIS-MWV_30.docx

Version: 1.5.19608

Page 251 of 477

MES Weaver

solution:

Please contact MPDV Support.

16.1.378  Errorcode 1602: Tool is blocked

Shortform:

Tool blocked

Description:

Tool is blocked

Problem:

With an activated tool management a tool or an order with tool was tried to be logged on to the

machine, although the tool is blocked.

solution:

Please contact MPDV-Support.

16.1.379  Errorcode 1603: Tool is not available

Shortform:

Tool n. available

Description:

Tool is not available.

Problem:

With an activated tool management a tool or an order with tool was tried to be logged on to the

machine, although the tool is not available within the dataset.

solution:

Please contact MPDV Support.

16.1.380  Errorcode 1604: Setup acceptance not allowed

Shortform:

Setup accept.n.allow

Description:

Setup acceptance not allowed.

Problem:

A batch was attempted to be generated, although this one is already available.

solution:

Use a free batch number.

SIS-MWV_30.docx

Version: 1.5.19608

Page 252 of 477

16.1.381  Errorcode 1606: The customer batch is already

MES Weaver

available

Shortform:

Custom.bat.alr.avail

Description:

The customer batch is already available.

Problem:

During the customer-specific collection of customer batches it was detected that these batches

have already been recorded.

solution:

Record a customer batch that is not yet known in HYDRA.

16.1.382  Errorcode 1607: Missing license

■■■■■■■■■■■■■■■■■■■■■■■■

Shortform:

Missing license

Description:

A license that is required for this function is not available.

Problem:

A license that is required for this function is not available.

solution:

Please contact MPDV in order to purchase a license

16.1.383  Errorcode 1609: Invalid quantity unit

Shortform:

Invalid qty unit

Description:

Invalid quantity unit.

Problem:

Tthe selected quantity unit is invalid.

solution:

Please select a valid quantity unit.

SIS-MWV_30.docx

Version: 1.5.19608

Page 253 of 477

16.1.384  Errorcode 1611: General database error

MES Weaver

Shortform:

General DB error

Description:

General database error.

Problem:

General database error.

solution:

Internal error, please contact MPDV-Support.

16.1.385  Errorcode 1612: Batch/lot not available

Shortform:

Batch not available

Description:

Batch is not available.

Problem:

A batch was attempted to be logged on or off, although this one is not available wtihin the dataset.

solution:

Please check whether the batch number was entered correctly when logging on. Via a basic setting

of HYDRA the creation of unknown batches can be activated.

16.1.386  Errorcode 1613: Batch/lot has already been logged on

Shortform:

Batch alr. logged on

Description:

Batch has already been logged on.

Problem:

A batch change was attempted to be performed for a batch that has already been logged on.

solution:

Log a free batch on.

16.1.387  Errorcode 1614: Batch management not configured

Shortform:

Batch man.n.config.

SIS-MWV_30.docx

Version: 1.5.19608

Page 254 of 477

MES Weaver

Description:

Batch management has not been configured.

Problem:

Batch management has not been configured at the terminal.

solution:

Check the HYDRA basic settings and the terminal configuraiton regarding the settings of the batch

management.

16.1.388  Errorcode 1615: Person must not change batch

Shortform:

P.mustn't change bat

Description:

Person must not change the batch

Problem:

When changing the batches it is detected that the person is not sufficiently authorized.

solution:

Check the person's authorizations at the MOC

16.1.389  Errorcode 1617: No piece rate OP

Shortform:

No piece rate

Description:

No piecework operation.

Problem:

The stated order/operation is not a piecework operation.

solution:

Piecework operations may only be entered here. They can be recognized by the piecework wage

type.

16.1.390  Errorcode 1620: Batch has already been finished

Shortform:

Batch finished

Description:

Batch has already been finished.

SIS-MWV_30.docx

Version: 1.5.19608

Page 255 of 477

MES Weaver

Problem:

A batch is attempted to be logged on, although this one has already been finished.

solution:

Log a free batch on.

16.1.391  Errorcode 1622: Posting not possible

Shortform:

Posting n. possible

Description:

Posting impossible.

Problem:

The posting is impossible.

solution:

Internal error, please contact MPDV-Support.

16.1.392  Errorcode 1624: Quantities have not yet been posted

Shortform:

No quantity posted

Description:

Quantities have not yet been posted.

Problem:

It is impossible to change the batch as quantities have not yet been posted onto the batch to be

logged off.

solution:

A customer-specific plausibility check prevents an empty batch from being logged off. You should

produce the required quantity at first.

16.1.393  Errorcode 1625: Only one batch possible

Shortform:

Only 1 batch poss.

Description:

Only one batch possible.

Problem:

It is attempted to log more than one batch on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 256 of 477

MES Weaver

solution:

The current batch has at first to be logged off before a new batch can be logged on. Use the batch

change button for this purpose.

16.1.394  Errorcode 1626: Invalid indicator

Shortform:

Invalid indicator

Description:

Invalid indicator.

Problem:

The stated employee characteristic is invalid.

solution:

The employee characteristics "1", "2" and "3" are allowed. Only a person with a HYDRA-ADE

authorization > 1 may log on first.

16.1.395  Errorcode 1627: Invalid destination

Shortform:

Invalid destination

Description:

Invalid destination

Problem:

When logging the batch on or reposting it an invalid destination was entered.

solution:

Check the master data of the material buffers/destinations at the MOC

16.1.396  Errorcode 1628: Batch/lot has not been logged on

Shortform:

Batch not logged on

Description:

Batch has not been logged on.

Problem:

The operator tries to log a batch off, although this batch is not logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 257 of 477

solution:

Check the batch number entered. Via the batch data maintenance or the stock overview of the

MOC it can be checked, which batches are currently logged on or what status the indicated batches

do have.

MES Weaver

16.1.397  Errorcode 1629: The batch is

■■■■■■■■■■■■■■■■■■■■■■■■■■■

Shortform:

Batch not free

Description:

The batch does not have the required status.

Problem:

When logging a batch on or when reposting the batch it is detected that this batch is not free and

thus it must not be logged on.

solution:

Check the batch and transport status in the batch data maintenance of the client. Only batches with

the status "free" may be logged on to the machine.

16.1.398  Errorcode 1630: Not available yet

Shortform:

Not yet available

Description:

Not yet available.

Problem:

When logging a batch on or reposting it, it is detected that this batch is not yet available according

to availability date.

solution:

Check the availability date in the batch data maintenance.

16.1.399  Errorcode 1631: Expiry date has been reached

Shortform:

Expiry date reached

Description:

Expiry date has been reached.

SIS-MWV_30.docx

Version: 1.5.19608

Page 258 of 477

MES Weaver

Problem:

When logging a batch on or reposting it, it is detected that this batch has exceeded the expiry date.

solution:

Check the expiry date of the batch in the batch data maintenance.

16.1.400  Errorcode 1632: At least one input batch is missing

Shortform:

Input batch missing

Description:

At least one input batch is missing.

Problem:

When logging the operation on it is detected that at least one planned input material has not yet

been assigned to an input batch.

solution:

Log an input batch on for the input materials that have not yet been assigned. The list of planned

input materials can be displayed at the terminal.

16.1.401  Errorcode 1633: Material cannot be logged on

Shortform:

Mat.can't be log. on

Description:

Material cannot be logged on.

Problem:

A batch has already been logged on for an input material or the maximum number of batches that

can be logged on for the material has been reached.

solution:

Log the batch that is already active for the material off or check the configuration of the machine

with respect to multiple logon of batches.

16.1.402  Errorcode 1634: Material is not planned

Shortform:

Mat. n. planned

Description:

Material has not been planned.

SIS-MWV_30.docx

Version: 1.5.19608

Page 259 of 477

MES Weaver

Problem:

When logging a batch on it is detected that the material is not planned within the material list of the

operation.

solution:

Check the material list in your guiding system or log another batch on.

16.1.403  Errorcode 1635: The batch contains another material

Shortform:

Mat. not in batch

Description:

The batch contains another material.

Problem:

When logging a batch on it is detected that the batch does not contain the material for which it is

logged on.

solution:

Log another batch on or check the material of the batch in the batch data maintenance

16.1.404  Errorcode 1636: Output batch already available

Shortform:

Output batch avail.

Description:

Output batch already available.

Problem:

When logging a batch on it is detected that this output batch is already available.

solution:

If it is possible log another batch on. In case the batch number is generated automatically at the

terminal please contact MPDV Support.

16.1.405  Errorcode 1637: Operator position not defined

Shortform:

Operator pos.n.def.

Description:

The operator position has not been defined.

SIS-MWV_30.docx

Version: 1.5.19608

Page 260 of 477

MES Weaver

Problem:

When a person logs on it is detected that the respective operator position has not been defined for

the machine.

solution:

Check the operator position defined for this machine at the MOC.

16.1.406  Errorcode 1638: Output batch not logged on

Shortform:

Outp.batch n.log.on

Description:

Output batch has not been logged on.

Problem:

When logging a batch off it is detected that this output batch is not available within the dataset.

solution:

Please check via the batch data maintenance which output batch has been logged on for this

machine and operation.

16.1.407  Errorcode 1639: Output batch is missing

Shortform:

Output batch missing

Description:

Output batch is missing.

Problem:

When logging a batch on or when logging an operation on that is subject to batch management

requirement it is detected that the output batch is missing.

solution:

Check within the machine configuration whether the batch management option has been activated.

16.1.408  Errorcode 1641: This OP is not subj.to batch

management

Shortform:

CHV n. active f. OP

Description:

This operation is not subject to batch management requirement.

SIS-MWV_30.docx

Version: 1.5.19608

Page 261 of 477

MES Weaver

Problem:

The operation is not subject to batch management requirement.

solution:

Check operation.

16.1.409  Errorcode 1642: Wage grp./premium indicator not

defined

Shortform:

Wage grp/prem.n.def.

Description:

Wage group/premium indicator have not been defined.

Problem:

When a person logs on it is detected that the respective wage group/premium indicator has not

been defined for the machine.

solution:

Check the wage groups/premium indicators defined for this machine.

16.1.410  Errorcode 1643: The max. number of batches is

exceeded

Shortform:

Max. no. of batches

Description:

The maximum number of batches has been exceeded.

Problem:

The maximum number of batches running simultaneously has been exceeded. At most 30 batches,

which are active at the same time, may be logged on per order.

solution:

At most 30 batches, which are active at the same time, may be logged on per order.

16.1.411  Errorcode 1646: The run through batch is not free

Shortform:

Runthr. bat.n.free

Description:

The run-through batch is not free.

SIS-MWV_30.docx

Version: 1.5.19608

Page 262 of 477

MES Weaver

Problem:

The run-through batch that is logged on is not free.

solution:

Check the batch and transport status in the batch data maintenance at the client. Only batches with

the status "free" may be logged on to the machine.

16.1.412  Errorcode 1651: Valid batch alr.available f.r-thr.batch

Shortform:

Valid rthr.bat.avail

Description:

A valid batch is already available for the run-through batch.

Problem:

When logging batches on it is detected that this run-through batch is already available.

solution:

There may be only one valid batch for a run-through batch in HYDRA. Please contact MPDV

Support.

16.1.413  Errorcode 1652: This batch is no scrap batch

Shortform:

No scrap batch

Description:

This batch is not a scrap batch.

Problem:

When booking a scrap batch in it is detected that the batch has not been labeled as scrap batch.

solution:

Only scrap batches can be posted via this function. Scrap batches are identified by the batch class

"A" (see MPL manual, batch data maintenance).

16.1.414  Errorcode 1653: This r-thr.batch has not been logged

on

Shortform:

Rthr.bat.n.logged on

Description:

This run-through batch has not been logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 263 of 477

MES Weaver

Problem:

When logging a batch on it is detected that this batch does not exist within the dataset.

solution:

Please check via the batch data maintenance which batch is logged on for this machine and

operation.

16.1.415  Errorcode 1654: Rthr.batch has already been

processed

Shortform:

Rthr.bat.alr.process

Description:

The run-through batch has already been processed.

Problem:

The batch has already been logged on to another production step.

solution:

Please check via the batch data maintenance which batch is logged on for this machine and

operation.

16.1.416  Errorcode 1655: DLGFILE cannot be opened

Shortform:

Error in DLGFILE

Description:

Read error: DLGFILE cannot be opened.

Problem:

When dialog data were processed the respective files could not be opened.

solution:

Please contact MPDV Support.

16.1.417  Errorcode 1656: RETFILE cannot be written

Shortform:

Error in RETFILE

Description:

Write error: RETFILE cannot be written

SIS-MWV_30.docx

Version: 1.5.19608

Page 264 of 477

MES Weaver

Problem:

When dialog data were processed respective files could not be written.

solution:

Please contact MPDV Support.

16.1.418  Errorcode 1657: No cost center authorization

Shortform:

No cost center

Description:

No cost center authorization.

Problem:

You do not have a cost center authorization for this activity.

solution:

Check the users cost center authorizations.

16.1.419  Errorcode 1658: No cost center authorization for group

Shortform:

No cost cent.f.group

Description:

No cost center authorization for the group.

Problem:

You do not have a cost center authorization for the machine group.

solution:

Check the users cost center authorizations.

16.1.420  Errorcode 1659: Parameters are missing for changing

Shortform:

Para.missing change

Description:

Parameters are missing for changing.

Problem:

Not all necessary parameters are indicated for being able to change.

solution:

Check the transferred parameters for completeness.

SIS-MWV_30.docx

Version: 1.5.19608

Page 265 of 477

16.1.421  Errorcode 1660: Invalid user

MES Weaver

Shortform:

Invalid user

Description:

Invalid user.

Problem:

The stated user is invalid.

solution:

Use a valid user.

16.1.422  Errorcode 1661: Missing parameter

■■■■■■■■■■■■■■■■■■■■

Shortform:

Missing parameter

Description:

A value that is relevant for the processing is missing.

Problem:

When processing dialog data a missing parameter was detected.

solution:

Please contact MPDV Support.

16.1.423  Errorcode 1662: Invalid parameter

■■■■■■■■■■■■■■■■■■■■

Shortform:

Invalid parameter

Description:

A value that is relevant for processing is invalid.

Problem:

When processing dialog data an invalid parameter was detected.

solution:

Please contact MPDV Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 266 of 477

16.1.424  Errorcode 1663: Person avail.comp. ■■■■ CCR.

MES Weaver

■■■■■■■■■■

Shortform:

Person alr. avail.

Description:

Personnel number has already been assigned.

Problem:

It is attempted to create a person that already exists.

solution:

Enter a new personnel number. Via the details of the error message you are able to recognize

which company and cost center the person is assigned to.

16.1.425  Errorcode 1664: ID card alr.avail. for person ■■■■■■■■

Shortform:

ID card alr. avail.

Description:

The badge number has already been allocated.

Problem:

The indicated badge number has already been allocated.

solution:

Choose a new badge number.

16.1.426  Errorcode 1665: Editor or password invalid

Shortform:

Editor/passw.invalid

Description:

User and/or password are invalid.

Problem:

Entered login information is invalid

solution:

Login with valid login information or contact the Hydra administrator

SIS-MWV_30.docx

Version: 1.5.19608

Page 267 of 477

16.1.427  Errorcode 1666: Object has been blocked

MES Weaver

Shortform:

Object blocked

Description:

The data record is currently blocked by the user <BEARB>.

Problem:

This is a general error message. A data record, which is currently edited by another user, is

attempted to be edited.

solution:

Please wait till the other user has finished processing.

16.1.428  Errorcode 1667: No. of licenses exceeded:■■■■■■■■

Shortform:

License error (no.)

Description:

The number of licenses <LIC.PROKEY> is exceeded. All <LIC.MAXANZ> licenses are being used.

Not until the user is logged off the licenses are re-released. Please contact your HYDRA

administrator.

Problem:

The number of licenses is exceeded

solution:

Please contact MPDV in order to purchase further licenses

16.1.429  Errorcode 1668: Terminal is not available

Shortform:

Terminal n.available

Description:

Terminal is not available.

Problem:

A terminal with the specified terminal number does not exist

solution:

Check your input

SIS-MWV_30.docx

Version: 1.5.19608

Page 268 of 477

16.1.430  Errorcode 1669: Data are already available

MES Weaver

Shortform:

Data alr. available

Description:

Data are already available.

Problem:

Data with the same key fields are already available. You may not see the data due to lack of

permission.

solution:

Check your input

16.1.431  Errorcode 1670: Value too long/large for the field

Shortform:

Value is too large

Description:

Value too long/large in an input field.

Problem:

The transferred value is too long.

solution:

Please contact MPDV Support.

16.1.432  Errorcode 1671: Error in license data

Shortform:

Error in licen.data

Description:

Error within the license data.

Problem:

The license data are faulty or do not fit to your system

solution:

Please contact MPDV Support.

16.1.433  Errorcode 1672: Assignment already available

Shortform:

Assignm.alr.avail.

SIS-MWV_30.docx

Version: 1.5.19608

Page 269 of 477

MES Weaver

Description:

Assignment already available.

Problem:

The assignment of the machine to a terminal or a line already exists.

16.1.434  Errorcode 1673: Aggr. can't be assigned to terminals

Shortform:

Aggr.n.be assigned

Description:

Aggregates cannot be assigned to terminals. Aggregates are assigned automatically

Problem:

Aggregates cannot be assigned to terminals. Aggregates of a line are assigned automatically, when

the line is assigned to the terminal.

16.1.435  Errorcode 1674: GWPs can't be assigned to terminals

Shortform:

GWP n.be assinged

Description:

Group workplaces cannot be assigned to MDE terminals.

16.1.436  Errorcode 1675: Max. ■■ lines c.be ass.to this terminal

Shortform:

Line n.be assigned

Description:

The maximum number of lines that can be assigned to this terminal has been reached.

16.1.437  Errorcode 1676: Max. ■■ M/WP c.be.assign. to this

term.

Shortform:

Mach/WP n.be assig.

Description:

The maximum number of machines/workplaces that can be assigned to this terminal has been

reached.

SIS-MWV_30.docx

Version: 1.5.19608

Page 270 of 477

16.1.438  Errorcode 1677: Only agg.,ma.,res.can be assigned to

MES Weaver

li.

Shortform:

Only aggr.c.b.assig.

Description:

Only aggregates can be assigned to lines.

Problem:

A machine can only be assigned to a line, if this machine is configured as type "aggregate" in the

machine configuration

solution:

Configure, if necessary, the machine as an aggregate

16.1.439  Errorcode 1678: Max. ■■ aggr.c.be assigned to this line

Shortform:

Aggr.n.be assigned

Description:

The maximum number of aggregates that can be assigned to this line has been reached.

16.1.440  Errorcode 1679: Assign.of aggr.to term.not deletable

Shortform:

Aggr.not deletable

Description:

The assignments of aggregates to a terminal cannot be deleted.

Problem:

The assignments of aggregates to a terminal cannot be deleted. The assignments of aggregates to

a line are deleted automatically, when the assignment of the line will be deleted

16.1.441  Errorcode 1680: Invalid terminal number

Shortform:

Invalid terminal no.

Description:

Invalid terminal number has been entered.

Problem:

You have enterd an invalid terminal number

SIS-MWV_30.docx

Version: 1.5.19608

Page 271 of 477

solution:

Enter a valid terminal number greater than 0

16.1.442  Errorcode 1681: Only mach. with year model c.be

MES Weaver

assigned

Shortform:

Mach.w/o ymod.n.ass.

Description:

Only machines with year model can be assigned to a terminal.

16.1.443  Errorcode 1682: Assignment not available

Shortform:

Assignm.n.available

Description:

Assignment is not available.

Problem:

The assignment, which you wish to maintain, is not available

solution:

Choose a vaild assignment

16.1.444  Errorcode 1683: Term.type can't be assigned to term.

no.

Shortform:

Terminal type inval.

Description:

The indicated terminal number is not valid for the stated terminal type.

16.1.445  Errorcode 1684: Machine is assigned to MDE terminal

■■■

Shortform:

Assign.alr.avail.MDE

Description:

The terminal <TNR> has already been configured as MDE terminal for the machine <MNR>.

SIS-MWV_30.docx

Version: 1.5.19608

Page 272 of 477

MES Weaver

Problem:

The machine is already assigned to a MDE terminal

solution:

Delete the existing assignment, if you want to assign the machine to another MDE terminal

16.1.446  Errorcode 1685: Assignment cannot be deleted

Shortform:

Assignm.n.deletable

Description:

Assignment cannot be deleted.

Problem:

At the terminal, only temporary assignments of a machine to a terminal can be deleted. At the

MOC, only permanent assignments of a machine to a terminal can be deleted.

16.1.447  Errorcode 1686: Terminal group is not available

Shortform:

Term. grp. n.avail.

Description:

The terminal group is not available.

16.1.448  Errorcode 1687: Access profile is not available

Shortform:

Access prof.n.avail.

Description:

The access profile is not available.

16.1.449  Errorcode 1688: ID card is not available

Shortform:

ID card n.available

Description:

The badge is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 273 of 477

16.1.450  Errorcode 1689: Remuneration day type is not available

MES Weaver

Shortform:

Remunerat. n.avail.

Description:

The remuneration day type is not available.

16.1.451  Errorcode 1690: Material buffer is not available

Shortform:

Mat.buffer n.avail.

Description:

The material buffer is not available.

Problem:

The material buffer of the machine is not available.

solution:

Check material buffer of the machine.

16.1.452  Errorcode 1692: Fct. not possible, no HYD-ALS license

Shortform:

No HYD-ALS license

Description:

Function can only be executed with the HYD-ALS license for "interfacing Arburg Leitsystem".

Problem:

Function can only be executed with the HYD-ALS license, which is needed for the interface to

Arburg Leitsystem.

solution:

Please contact MPDV in order to purchase a license

16.1.453  Errorcode 1694: Mach.is assign.to input server ■■■

Shortform:

Assignm.alr.avail.

Description:

Machine has already been assigned to a shop floor server.

Problem:

The machine has already been assigned to a shop floor server.

SIS-MWV_30.docx

Version: 1.5.19608

Page 274 of 477

solution:

The machine cannot be assigned to a second shop floor server.

16.1.454  Errorcode 1695: Remuneration model is not available

MES Weaver

Shortform:

Remunerat.not avail.

Description:

The remuneration model is not available.

Problem:

The remuneration model is not available.

solution:

Create the renumeration model or choose an existing model number

16.1.455  Errorcode 1696: Working time model is not available

Shortform:

Work.t. mod.n.avail.

Description:

The working time model is not available.

Problem:

The working time model is not available.

solution:

Create the working time model or choose an existing model number

16.1.456  Errorcode 1697: Shift rythm model is not available

Shortform:

Shift rythm n.avail.

Description:

The shift rythm model is not available.

Problem:

The shift rythm model is not available.

solution:

Create the shift rythm model or choose an existing model number

SIS-MWV_30.docx

Version: 1.5.19608

Page 275 of 477

16.1.457  Errorcode 1698: No. of licenses exceeded:■■■■■■■■

MES Weaver

Shortform:

License error (no.)

Description:

The number of licenses <LIC.PROKEY> is exceeded. All <LIC.MAXANZ> licenses are being used.

Please contact your HYDRA administrator.

16.1.458  Errorcode 1700: Personnel number not indicated

Shortform:

Person n. indicated

Description:

No personnel number entered.

Problem:

No personnel number entered.

solution:

Enter personnel number.

16.1.459  Errorcode 1701: Company number not indicated

Shortform:

Company n. indicated

Description:

No company entered.

Problem:

No company entered.

solution:

Company entered.

16.1.460  Errorcode 1702: Area not indicated

Shortform:

Area not indicated

Description:

No area entered.

Problem:

No area entered.

SIS-MWV_30.docx

Version: 1.5.19608

Page 276 of 477

MES Weaver

solution:

Area entered.

16.1.461  Errorcode 1703: Invalid badge number

■■■■■■■■■■■■■■■■

Shortform:

Invalid badge no.

Description:

Indicated badge number is invalid.

Problem:

The indicated badge number is invalid or not available.

solution:

Please enter a valid badge number.

16.1.462  Errorcode 1704: Invalid personnel number

■■■■■■■■■■■

Shortform:

Invalid pers. number

Description:

Indicated personnel number is invalid.

16.1.463  Errorcode 1705: Cost center not indicated

Shortform:

Cost cent.n.indicat.

Description:

No cost center entered.

Problem:

No cost center entered.

solution:

Please enter a valid cost center.

16.1.464  Errorcode 1706: Person is logged on to an order

Shortform:

Person is logged on

SIS-MWV_30.docx

Version: 1.5.19608

Page 277 of 477

MES Weaver

Description:

Person is logged on to an order.

Problem:

The person is currently logged on to an order. The required action cannot be carried out in this

case.

solution:

Log the person off from all orders and machines and repeat the action.

16.1.465  Errorcode 1707: Log data are available for the person

Shortform:

Data avail.for pers.

Description:

Log data are available for the person

Problem:

There are still log data for the person, e.g. in HYDRA-ADE. They cannot be displayed correctly

anymore, provided that the required action is carried out.

solution:

The required action can only be carried out when the person's log data are completely deleted from

the system. Normally, this is done by the automatic deletion of data after a set term. This term has

to be awaited.

16.1.466  Errorcode 1708: Date o.leaving lies bef.date of joining

Shortform:

Leaving bef.joining

Description:

Date of leaving lies before date of joining.

Problem:

The entered date of leaving lies before date of joining.

solution:

Please enter a valid date of leaving.

SIS-MWV_30.docx

Version: 1.5.19608

Page 278 of 477

16.1.467  Errorcode 1709: Supervisor ■■■■■■■■ ■■■■ not

MES Weaver

available

Shortform:

Supervisor n.avail.

Description:

Supervisor not available.

Problem:

The entered supervisor is not available.

solution:

Please enter a valid supervisor.

16.1.468  Errorcode 1710: Superior of ■■■■■■■■ ■■■■

Shortform:

Pers. is superior

Description:

Person is supervisor.

Problem:

The person is a supervisor therefore the required action cannot be executed.

solution:

Please assure that the required person is nowhere entered as supervisor.

16.1.469  Errorcode 1720: Wage type not available

Shortform:

Wage type n. avail.

Description:

Wage type is not available.

16.1.470  Errorcode 1721: Wage type group not available

Shortform:

W.type grp.n.avail.

Description:

Wage type group is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 279 of 477

MES Weaver

16.1.471  Errorcode 1722: Logon not available

Shortform:

Logon not available

Description:

Posting is not available.

16.1.472  Errorcode 1723: Data record has already been

uploaded

Shortform:

Already uploaded

Description:

Data record has already been uploaded and thus it cannot be changed anymore.

16.1.473  Errorcode 1725: Invalid remuneration day type

Shortform:

Invalid remuneration

Description:

Invalid remuneration day type

solution:

Enter a valid remuneration day type.

16.1.474  Errorcode 1726: Invalid working time day type

Shortform:

Inv.work.t.day type

Description:

Invalid working time day type.

solution:

Enter a valid working time day type.

16.1.475  Errorcode 1727: Invalid shift type

Shortform:

Invalid shift type

SIS-MWV_30.docx

Version: 1.5.19608

Page 280 of 477

MES Weaver

Description:

Invalid shift type.

solution:

Enter a valid shift type.

16.1.476  Errorcode 1728: Clearing date in future not allowed

Shortform:

Inval. clearing date

Description:

The clearing date must not lie ahead.

solution:

Enter today's date or a date of the past as clearing date.

16.1.477  Errorcode 1729: The data are administered by SAP

Shortform:

Data administ.by SAP

Description:

The data are managed by SAP.

Problem:

These data are managed by SAP as guiding system and cannot be edited.

solution:

The data cannot be edited.

16.1.478  Errorcode 1731: Selection crit.or values wrong (■■■■■)

Shortform:

SQL is faulty

Description:

Faulty SQL instruction.

Problem:

The stated SQL fragment is erroneous or the selection criteria are invalid.

solution:

Correct the SQL fragment taking the database error number into account and enter valid values for

the selection criteria.

SIS-MWV_30.docx

Version: 1.5.19608

Page 281 of 477

16.1.479  Errorcode 1732: Sorting wrong (■■■■■)

MES Weaver

Shortform:

Sorting faulty

Description:

Sorting faulty.

Problem:

The entered SQL fragment with the sort sequence contains an error.

solution:

Correct the SQL fragment taking the database error number into account.

16.1.480  Errorcode 1733: The data must not be changed

Shortform:

Data n.be changed

Description:

Data cannot be changed.

Problem:

These data have been marked unchangeable by the system. This may have different reasons.

solution:

The required action cannot be executed.

16.1.481  Errorcode 1734: Last data record not allowed

Shortform:

Last DR not allowed

Description:

Last data record is not allowed.

Problem:

The last data record cannot be deleted as it has to be kept as template.

solution:

Copy the data record at first before it can be deleted.

16.1.482  Errorcode 1735: Report file is not available

Shortform:

Report not avail.

SIS-MWV_30.docx

Version: 1.5.19608

Page 282 of 477

MES Weaver

Description:

Report file is not available.

Problem:

The report file is not available.

16.1.483  Errorcode 1736: Access blocked to settled data.

Shortform:

Access blocked

Description:

The access to data that have already been settled is blocked. You are not authorized to change

these data.

16.1.484  Errorcode 1737: Report alr.available in report config.

Shortform:

Report config.avail.

Description:

Report is already available in the report configuration.

Problem:

The report is already available in the report configuration.

solution:

Choose another report.

16.1.485  Errorcode 1738: Report alr. avail. as terminal report

Shortform:

Terminal rep. avail.

Description:

Report is already available as terminal report.

Problem:

The report is alreaday available as terminal report.

solution:

Choose an other report name.

SIS-MWV_30.docx

Version: 1.5.19608

Page 283 of 477

16.1.486  Errorcode 1739: Data of monthly period partly deleted

MES Weaver

Shortform:

Access blocked

Description:

The data for the respective monthly period are partially or completely deleted. Therefore, changes

must not be made anymore for this monthly period.

16.1.487  Errorcode 1740: Period must not be deleted

Shortform:

Period not deleted

Description:

Evaluation periods for the current and the privious years must not be deleted because of affected

persons.

16.1.488  Errorcode 1741: Absence is already allowed

Shortform:

Absence allowed

Description:

The application for this absence couldn't be withdrawn because the absence has already been

allowed.

16.1.489  Errorcode 1742: Either account balance or modification

Shortform:

balance or modific.

Description:

Either account balance or account modification can be given.

solution:

Fill only one input field.

16.1.490  Errorcode 1785: Person has not logged on

Shortform:

Person not logged on

Description:

Person has not logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 284 of 477

MES Weaver

Problem:

Person has not logged on.

solution:

Customer-specifically, a person has to log on at first before he/she may carry out an action. Repeat

the person's logon.

16.1.491  Errorcode 1788: Max.no.of OPs that c.be log.on

reached

Shortform:

max. OPs reached

Description:

The maximum number of operations that can be logged on has been reached.

Problem:

The maximum number of running operations has been reached at this machine .

solution:

Customer-specifically, log an operation off at first before a new operation can be logged on.

16.1.492  Errorcode 1796: Data record has alr. been processed

Shortform:

Double data record

Description:

The data record has already been processed successfully.

Problem:

The message was not processed, because the previously sent identically message has been

processed.

16.1.493  Errorcode 1800: Time zone is assigned to access

profile

Shortform:

Time zone assigned

Description:

The time zone cannot be deleted as it is assigned to access profiles.

SIS-MWV_30.docx

Version: 1.5.19608

Page 285 of 477

16.1.494  Errorcode 1801: Time zone is assigned to opening

MES Weaver

hours

Shortform:

Time zone assigned

Description:

The time zone cannot be deleted because it is assigned to opening hours.

16.1.495  Errorcode 1802: Time zone is assigned to

except.author.

Shortform:

Time zone is assign.

Description:

The time zone cannot be deleted as it is assigned to exceptional authorizations.

16.1.496  Errorcode 1803: No authorization f.responsibility area

Shortform:

No resp.area author.

Description:

You are not authorized for this responsibility area.

16.1.497  Errorcode 1804: Access group is assigned to access

Shortform:

Access grp. assigned

Description:

The access group cannot be deleted as at least one entry of this access group has been assigned.

16.1.498  Errorcode 1805: Access alr.avail. f. reader at terminal

Shortform:

Read.avail.at term.

Description:

An access has already been defined for the reader at this terminal.

solution:

Please assign a free reader number.

SIS-MWV_30.docx

Version: 1.5.19608

Page 286 of 477

16.1.499  Errorcode 1806: Active ID card already available

MES Weaver

Shortform:

Active ID card avail

Description:

An active badge is already available.

Problem:

There can be only one badge active with the entered ID

16.1.500  Errorcode 1807: Person has alr.activated normal IDcard

Shortform:

IDcard avail.f.pers.

Description:

Person already uses a normal badge.

Problem:

An active badge has already been assigned to the person

16.1.501  Errorcode 1808: IDcard is active for other pers. in PZE

Shortform:

ID card avail.in PZE

Description:

The badge is used by another person within HYDRA-PZE.

Problem:

The badge is already assigned to another person

solution:

Choose an other badge

16.1.502  Errorcode 1809: Validity date coincides

Shortform:

Coincidence of dates

Description:

There is a date conflict.

Problem:

The specified validity period overlaps with existing validity periods

SIS-MWV_30.docx

Version: 1.5.19608

Page 287 of 477

solution:

Verify the validity period

16.1.503  Errorcode 1810: Reader 1 is reserved for PZE terminal

MES Weaver

Shortform:

Reader 1 for PZE res

Description:

An access or a terminal must not be assigned to reader 1 at a PZE terminal.

solution:

Change the operation mode of the terminal to ZZG or use a reader number that is greater than 1 for

the access/the terminal.

16.1.504  Errorcode 1811: Access is not available

Shortform:

Access n.available

Description:

Access is not available.

16.1.505  Errorcode 1812: Accesses of security gate at same

term.

Shortform:

Sec.gate at a term.

Description:

The entries of a security gate have to be connected to the same terminal.

solution:

Change the configuration accordingly in order that all accesses of a security gate are connected to

the same terminal.

16.1.506  Errorcode 1813: Not authorized for all data records

Shortform:

Part. authorized

Description:

You are only authorized for part of the data.

SIS-MWV_30.docx

Version: 1.5.19608

Page 288 of 477

MES Weaver

16.1.507  Errorcode 1814: Sync. PNR->KNR

■■■■■■■■■■■■■■■■■■■■■■

Shortform:

Sync. PNR->KNR

Description:

Error occurred when synchronizing HR master data with ID cards.

Problem:

For certain acitivities within the HR master data the modified data are transferred to HYDRA-ZKS

badges. In this connection, a technical error occurred.

solution:

Please contact MPDV Support.

16.1.508  Errorcode 1815: Reader is already used at this terminal

Shortform:

Reader already used

Description:

The specified reader has already been used for another terminal at this masterterminal.

solution:

Please assign a free reader number.

16.1.509  Errorcode 1850: Resulting order has invalid number

Shortform:

Resulting OP invalid

Description:

Target order has invalid number.

Problem:

The Target order has invalid number.

solution:

Check target order number.

16.1.510  Errorcode 1851: Order header not available

Shortform:

OP header not avail.

SIS-MWV_30.docx

Version: 1.5.19608

Page 289 of 477

MES Weaver

Description:

Order header is not available.

Problem:

Operations were attempted to be created, changed or deleted for an order (header), which is not

known in HYDRA.

solution:

Please create the order header.

16.1.511  Errorcode 1852: Tool data have not been saved

Shortform:

Tool data n. created

Description:

Tool data have not been saved.

Problem:

-

solution:

-

16.1.512  Errorcode 1854: OP has not been saved

Shortform:

OP data n. created

Description:

OP has not been saved.

16.1.513  Errorcode 1855: Target data record is alr. available

Shortform:

Targ.data alr.avail.

Description:

Target data record is already available.

Problem:

The Target data record is already available.

solution:

-

SIS-MWV_30.docx

Version: 1.5.19608

Page 290 of 477

16.1.514  Errorcode 1859: OP must not be a split master

MES Weaver

Shortform:

Split master impos.

Description:

This operation is a so-called "split master" i.e. an operation that has been split into single

operations.

problem:

Possible causes are:

1. It was tried to carry out a shop floor data collection posting for a split master. However, the single

split operations have to be posted.

2. It was attempted to split a split master again. But this is not allowed.

solution:

In the first case please post the single split operations.

16.1.515  Errorcode 1860: OP must not be an OP of a split OP

Shortform:

No split OP possible

Description:

The OP is an OP of a split OP.

Problem:

Possible causes are:

1. It was tried to a delete an operation which is member of a split operation

2. It was tried to add a member of a split operation to a collective operation

solution:

-

16.1.516  Errorcode 1861: OP must not be a collective OP

Shortform:

No collect. OP poss.

Description:

The OP must not be a collective OP.

SIS-MWV_30.docx

Version: 1.5.19608

Page 291 of 477

MES Weaver

Problem:

Possible causes are:

1. It was tried to deleted an operation which is member of a split operation

2. It was tried to add a member of a split operation to a collective operation

3. It was tried to add a split master to a collective operation

solution:

-

16.1.517  Errorcode 1862: OP must not be an OP of a collective

OP

Shortform:

No collect. OP poss.

Description:

The OP is an OP of a collective operation.

Problem:

Possible causes are:

1. It was tried to add a collective operation to a collective operation

2. It was tried to split a collective operation

solution:

-

16.1.518  Errorcode 1864: Collective OP does not exist

Shortform:

Collect. OP n.avail.

Description:

The collective operation does not exist.

Problem:

The collective operation does not exist.

solution:

Please enter an existing collective operation

16.1.519  Errorcode 1865: Stated COP is no collective OP

Shortform:

OP no collective OP

SIS-MWV_30.docx

Version: 1.5.19608

Page 292 of 477

MES Weaver

Description:

The OP is not a collective operation.

Problem:

An operation should be added to an collective operation but the collective operation is no collective

operation

solution:

Please enter an existing collective operation

16.1.520  Errorcode 1866: Stated OP is no OP of collective OP

Shortform:

OP no OP of COP

Description:

The OP is not an OP of the collective operation.

Problem:

The OP which should be removed from the collective operation is no member of the collective

operation

solution:

-

16.1.521  Errorcode 1867: OP must not be split

Shortform:

OP mustn't be split

Description:

The OP must not be split.

Problem:

The OP can not be split because it is configured as not splitable.

solution:

-

16.1.522  Errorcode 1868: Max. number of splits of OP exceeded

Shortform:

No.of splits>Max. OP

Description:

The number of splits has been exceeded.

SIS-MWV_30.docx

Version: 1.5.19608

Page 293 of 477

MES Weaver

Problem:

The number of splits has exceeded the maximum number of splits configured in the operation

solution:

-

16.1.523  Errorcode 1869: Max. number of splits exceeded

Shortform:

No.of splits>Maximum

Description:

The maximum number of splits has been exceeded.

Problem:

The maximum number of splits has exceeded the length configured in the HYDRA Setup

e.g. Splitlength = 1 in HYDRA Setup means maximum 9 splits

solution:

-

16.1.524  Errorcode 1870: Inspection plan is already available

Shortform:

IPL alr. available

Description:

The inspection plan already exists.

Problem:

-

solution:

-

16.1.525  Errorcode 1871: Status is not available

Shortform:

Status invalid

Description:

Status is not available.

Problem:

A selection is invalid for inspection plans, inspection plan characteristics or within the

characteristics catalog.

SIS-MWV_30.docx

Version: 1.5.19608

Page 294 of 477

MES Weaver

solution:

Check all selection boxes for valid values.

16.1.526  Errorcode 1872: Article is not available

Shortform:

Article invalid

Description:

Article is not available.

Problem:

The entered article or article group is invalid.

solution:

Correct the article number or the drawing issue number or enter a new article into the master data.

16.1.527  Errorcode 1873: Customer is not available

Shortform:

Customer invalid

Description:

Customer/supplier is not available.

Problem:

The entered customer or the customer group is invalid.

solution:

Correct the customer number or enter a new customer into the master data.

16.1.528  Errorcode 1874: Inspection plan is already active

Shortform:

IPL alr. active

Description:

Inspection plan is already active.

Problem:

You try to change inspection plan data or data of inspection plan characteristics. The affected

inspection plan has already been activated.

SIS-MWV_30.docx

Version: 1.5.19608

Page 295 of 477

MES Weaver

solution:

Provided that the inspection plan has not been used by an inspection request already you can

make the changes after having deactivated the inspection plan and having canceled its release. In

case that an inspection request has already been created on the basis of this inspection plan you

can copy the inspection plan and can change this copy. By releasing and activating this copy

afterwards the changes become effective for all subsequent inspection requests.

16.1.529  Errorcode 1875: Inspection plan has alr. been released

Shortform:

IPL already released

Description:

Inspection plan has already been released.

Problem:

You try to change inspection plan data or data of inspection plan characteristics The affected

inspection plan has already been released.

solution:

You can make the changes after having canceled the release of the inspeciton plan.

As an alternative, you can copy the inspection plan and can change this copy.

16.1.530  Errorcode 1876: Inspect.characteristic is not available

Shortform:

Characteristic inval

Description:

Inspection characteristic is not available.

Problem:

The entered material is invalid.

solution:

Correct the characteristic number or enter a new characteristic into the master data.

16.1.531  Errorcode 1877: Inspection station is not available

Shortform:

Inspect.stat.invalid

Description:

Inspection station is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 296 of 477

MES Weaver

Problem:

The entered inspection station or the entered group of inspection stations is invalid.

solution:

Correct the inspection station number or enter an new inspection station into the master data.

16.1.532  Errorcode 1878: Gage is not available

Shortform:

Gage invalid

Description:

Gage is not available.

Problem:

The entered gage or the entered gage group is invalid.

solution:

Correct the gage number or enter a new gage into the master data.

16.1.533  Errorcode 1879: Inspection group is not available

Shortform:

Inspect.group inval.

Description:

Inspection group is not available.

Problem:

The entered inspection group is invalid.

solution:

Correct the gage group or enter a new gage group into the master data.

16.1.534  Errorcode 1880: Test unit is not defined

Shortform:

Test unit invalid

Description:

Test unit is not available.

Problem:

The entered unit is invalid.

solution:

Correct the unit or enter a new unit into the master data.

SIS-MWV_30.docx

Version: 1.5.19608

Page 297 of 477

16.1.535  Errorcode 1881: Tool number is not available

MES Weaver

Shortform:

Tool no. invalid

Description:

Tool number is not available.

Problem:

The entered tool is invalid.

solution:

Correct the tool number or enter a new tool into the master data.

16.1.536  Errorcode 1882: Area is not available

Shortform:

Area invalid

Description:

Area is not available.

Problem:

The selected area is invalid.

solution:

Correct the area or enter a new area into the system administration.

16.1.537  Errorcode 1883: Supplier is not available

Shortform:

Supplier invalid

Description:

Supplier is not available.

Problem:

The entered supplier or supplier group is invalid.

solution:

Correct the supplier number or enter a new supplier into the master data.

16.1.538  Errorcode 1884: Canceled inspection order is available

Shortform:

Insp. order canceled

SIS-MWV_30.docx

Version: 1.5.19608

Page 298 of 477

MES Weaver

Description:

There is a canceled inspection order.

Problem:

You are trying to finish an inspection requirement that contains canceled inspection orders.

solution:

Please complete the corresponding, canceled inspection orders before finishing the inspection

requirement.

As an alternative, HYDRA can be configured via a CAQ system option (1003) in order that it will be

possible to complete inspection requirements in spite of canceled inspection orders.

16.1.539  Errorcode 1885: Insp.plan not found for

insp.requirement

Shortform:

Insp.plan not found

Description:

Inspection plan has not been found for inspection requirement.

Problem:

This error message only applies to the gage management.

You tried to create a new calibration or maintenance, which no active inspection plan is available

for.

solution:

Create or activate an inspection plan in accordance with the specifications of the assigned

inspection plan. If a wrong inspection plan is assigned to the calibration/maintenance please correct

the assignment.

16.1.540  Errorcode 1886: Serial determination failed

Shortform:

Error serial determ.

Description:

Determination of serial has failed.

Problem:

General error message that appears when an error occurs while generating a unique number.

solution:

Depending on the action different reasons are possible.

Please contact MPDV Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 299 of 477

16.1.541  Errorcode 1887: Insp. order has already been canceled

MES Weaver

Shortform:

Insp. order canceled

Description:

Inspection order has already been canceled.

Problem:

You are trying to finish an inspection order that has been canceled or that has a status which

prevents a completion.

solution:

Please re-release the inspection order if its status admits it. Otherwise, (erroneous status or skip

lot) a completion is impossible.

16.1.542  Errorcode 1888: Insp.plan not found for

insp.requirement

Shortform:

IPL not found

Description:

Inspection plan has not been found for inspection requirement.

Problem:

1. You are trying to create an inspection requirement which no inspection plan is available for.

2. You are trying to edit measured values, measures, errors or similar for an inspection order.

solution:

1. Please arrange for a valid inspection plan for inspection requirement data.

2. The corresponding inspection requirement data or inspection order data have been deleted or

have already been archived. Please contact MPDV Support.

16.1.543  Errorcode 1889: IPL is active/insp. requirement found

Shortform:

IPL is active

Description:

Inspection plan is active - inspection requirement found.

Problem:

You are trying to change inspection plan data. The affected inspection plan has already been

activated.

SIS-MWV_30.docx

Version: 1.5.19608

Page 300 of 477

MES Weaver

solution:

Provided that the inspection plan has not yet been used by an inspection request you can make the

changes after having deactivated the inspection plan and having canceled its release. In case that

an inspection request has already been created on the basis of this inspection plan you can copy

the inspection plan and can change this copy. By releasing and activating this copy afterwards the

changes become effective for all subsequent inspection requests.

16.1.544  Errorcode 1890: Gage is already in use

Shortform:

Gage in use

Description:

Gage is already being used

Problem:

You are trying to delete a gage which has already been assigned to characteristics.

solution:

Please delete all data which refer to the gage to be deleted. Alternatively, you can just set the

archive flag of the gage. This flag identifies the gage as not in use anymore.

16.1.545  Errorcode 1891: Entry is already in use

Shortform:

Entry is alr. in use

Description:

Entry is already being used.

Problem:

You are trying to delete a master data entry, which has already been assigned to other HYDRA

data.

solution:

Please delete all data that refer to the entry to be deleted. Alternatively, you can just set the archive

flag of the entry. This flag identifies the entry as not in use any longer.

16.1.546  Errorcode 1892: Insp.character.is not available for IPL

Shortform:

Character. n.avail.

Description:

Inspection characteristic is not available for the inspection plan.

SIS-MWV_30.docx

Version: 1.5.19608

Page 301 of 477

MES Weaver

Problem:

You are trying to activate an inspection plan without characteristics.

solution:

Assign characteristics to the inspection plan before activating it.

16.1.547  Errorcode 1893: Inspection plan has not been released

Shortform:

IPL not released

Description:

Inspection plan has not been released.

Problem:

You are trying to activate an inspection plan that has not been released.

solution:

Please release the inspection plan before activating it.

16.1.548  Errorcode 1894: Insp.requirement is already available

Shortform:

Insp.requ.alr.avail.

Description:

Inspection requirement is already available.

Problem:

You are trying to change inspection plan data or data of inspection plan characteristics. The

affected inspection plan has already been used for an inspection requirement.

solution:

You can copy the inspection plan and change this copy. By releasing and activating this copy

afterwards the changes become effective for all subsequent inspection requirements. It is

impossible to delete inspection plans that are already being used.

16.1.549  Errorcode 1895: Inspection requirement is not available

Shortform:

Insp.requir.n.avail.

Description:

Inspection requirement is not available.

Problem:

You are trying to edit measured values, measures, errors or similar for an inspection order.

SIS-MWV_30.docx

Version: 1.5.19608

Page 302 of 477

MES Weaver

solution:

The corresponding inspection requirement data have been deleted or have already been archived.

Please contact MPDV Support.

16.1.550  Errorcode 1896: Insp. order has already been canceled

Shortform:

Insp. order canceled

Description:

Inspection order has already been canceled.

Problem:

You are trying to finish an inspection order that has been canceled or that has a status which

prevents a completion.

solution:

Please re-release the inspection order if its status admits it. Otherwise, (erroneous status or skip

lot) a completion is impossible.

16.1.551  Errorcode 1897: Insp. order has already been canceled

Shortform:

Insp. order canceled

Description:

Inspection order has already been canceled.

Problem:

You are trying to finish an inspection order that has been canceled or that has a status which

prevents a completion.

solution:

Please re-release the inspection order if its status admits it. Otherwise, (erroneous status or skip

lot) a completion is impossible.

16.1.552  Errorcode 1898: Insp. order has already been canceled

Shortform:

Insp. order canceled

Description:

Inspection order has already been canceled.

SIS-MWV_30.docx

Version: 1.5.19608

Page 303 of 477

MES Weaver

Problem:

You are trying to finish an inspection order that has been canceled or that has a status which

prevents a completion.

solution:

Please re-release the inspection order if its status admits it. Otherwise, (erroneous status or skip

lot) a completion is impossible.

16.1.553  Errorcode 1899: Insp. order has already been canceled

Shortform:

Insp. order canceled

Description:

Inspection order has already been canceled.

Problem:

You are trying to finish an inspection order that has been canceled or that has a status which

prevents a completion.

solution:

Please re-release the inspection order if its status admits it. Otherwise, (erroneous status or skip

lot) a completion is impossible.

16.1.554  Errorcode 1900: Premium group invalid

Shortform:

Premium group inval.

Description:

Premium group is invalid.

Problem:

The stated premium group does not exist or is invalid at the point in time indicated.

solution:

Choose a valid premium group or correct the master data of the premium groups.

16.1.555  Errorcode 1910: Time tick.from prev.month can't

b.postp.

Shortform:

T.ticket prev.month

SIS-MWV_30.docx

Version: 1.5.19608

Page 304 of 477

MES Weaver

Description:

Time ticket from previous month cannot be postponed.

Problem:

A time ticket from the previous month cannot be postponed.

solution:

16.1.556  Errorcode 1911: Bonus reason not available

Shortform:

Bonus reas.n.avail.

Description:

There is no bonus reason.

Problem:

The bonus reason is not available.

solution:

Choose a valid bonus reason.

16.1.557  Errorcode 1912: Indicate person or premium group

Shortform:

Ind.PNR or prem.grp.

Description:

State person or premium group.

Problem:

Either a person or a premium group has to be entered.

solution:

16.1.558  Errorcode 1913: Premium area invalid

Shortform:

Premium area inval.

Description:

Premium area is invalid.

Problem:

The premium area is not available or invalid.

solution:

Enter an existing and valid premium area.

SIS-MWV_30.docx

Version: 1.5.19608

Page 305 of 477

16.1.559  Errorcode 1914: Used in HR master data

MES Weaver

Shortform:

Used for person

Description:

Used within HR master data.

Problem:

The action cannot be carried out as the data are still being used within the HR master data.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.560  Errorcode 1915: Used in PZE wage type booking

Shortform:

Used in PZE booking

Description:

Used within the HYDRA-PZE wage type booking.

Problem:

The action cannot be carried out as the data are still being used within the HYDRA-PZE wage type

bookings.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.561  Errorcode 1916: Used in ADE log message

Shortform:

Used in ADE log mess

Description:

Used within HYDRA-ADE log message.

Problem:

The action cannot be carried out as the data are still being used within the HYDRA-ADE postings.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.562  Errorcode 1917: Used in LLE results

Shortform:

Used in LLE

SIS-MWV_30.docx

Version: 1.5.19608

Page 306 of 477

MES Weaver

Description:

Used within HYDRA-LLE results.

Problem:

The action cannot be carried out as the data are still being used in results of the incentive wage

determination.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.563  Errorcode 1918: Used in LLE bonuses/deductions

Shortform:

Used for bonus

Description:

Used in HYDRA-LLE bonuses/deductions.

Problem:

The action cannot be carried out as the data are still being used in bonuses/deductions.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.564  Errorcode 1919: Used in premium groups

Shortform:

Used in premium grp.

Description:

Used in premium groups.

Problem:

The action cannot be carried out as the data are still being used in premium groups.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.565  Errorcode 1920: Used in assignment of premium

groups

Shortform:

Used i.LEISTGRPZUORD

Description:

Used when assigning premium groups.

SIS-MWV_30.docx

Version: 1.5.19608

Page 307 of 477

MES Weaver

Problem:

The action cannot be carried out as the data are still being used for the assignment of premium

groups.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.566  Errorcode 1921: Used in assignment of premium area

Shortform:

Used i.LEISTBERZUORD

Description:

Used when assigning premium areas.

Problem:

The action cannot be carried out as the data are still being used for the assignment of premium

areas.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.567  Errorcode 1923: Not authorized for sequence/condition

Shortform:

Not authorized

Description:

Not authorized for this sequence or condition.

Problem:

The user is not authorized to use this sequence or condition.

solution:

Use a valid sequence or condition. See documentation or online help.

16.1.568  Errorcode 1950: N.poss.to change OP logon t.staff

logon

Shortform:

A to B rec.n.allowed

Description:

It is impossible to change an order posting into a personnel posting.

SIS-MWV_30.docx

Version: 1.5.19608

Page 308 of 477

MES Weaver

Problem:

It is impossible to change an order posting (U/E/H record) into a personnel posting (B record).

solution:

Create the new booking via copying the order posting

16.1.569  Errorcode 1951: N.poss.to change staff logon to OP

logon

Shortform:

B to A rec.n.allowed

Description:

It is impossible to change a personnel posting into an order posting

Problem:

It is impossible to change a personnel posting (B record) into an order posting (U/E/H record)

solution:

Create the new booking via copying the personal posting

16.1.570  Errorcode 1952: End date less than start date

Shortform:

End date invalid

Description:

Logoff time is less than logon time.

Problem:

The Logoff time defined in the booking is less than logon time in the booking

solution:

Plaese change the booking so that the logon time ist less or equal the logoff time

16.1.571  Errorcode 1954: N.poss. to change cancelation

message

Shortform:

Cancel.n.be.changed

Description:

It is impossible to change cancelation message.

SIS-MWV_30.docx

Version: 1.5.19608

Page 309 of 477

MES Weaver

Problem:

It is impossible to change cancelation message.

This message is only used for cancelation in the PPS System

solution:

-

16.1.572  Errorcode 1955: Not possible to change original

message

Shortform:

Original n.alterable

Description:

It is impossible to change original message.

Problem:

It is impossible to change original message.

This message is only used to see the original value send from the terminal

solution:

-

16.1.573  Errorcode 1956: Par.conf.n.alterable with curr.run.scen.

Shortform:

Cur.part.conf.n.alt.

Description:

Partial confirmation with currently running scenario cannotbe changed.

Problem:

Partial confirmation with currently running scenario cannot be changed, because changing the

partial confirmation changes also the operation posting and this one is not available at that moment

solution:

Wait till the operation is interupted before changing the partitial confirmation

16.1.574  Errorcode 1957: Record type not alterable

Shortform:

Record type n.alter.

Description:

Record type cannot be changed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 310 of 477

MES Weaver

Problem:

Record type cannot be changed.

solution:

Create the new booking via copying and then delete the no more used booking

16.1.575  Errorcode 1958: Data for OP,MNR and period alr. exists

Shortform:

Data OP alr.exists

Description:

A concurrent log record already exists for OP and machine for the selected period.

Problem:

A concurrent log record already exists for OP and machine for the selected period.

solution:

Please check the bookings for machine/op and change the timestamps,

so no more overlapping bookings are existing

16.1.576  Errorcode 1970: OP is no split OP

Shortform:

OP is no split OP

Description:

The OP is not a split OP.

Problem:

Possible causes are:

1. op which should be deleted is no split master 2. op which should be deleted is no operation of a

split

solution:

Delete split or split master to delete the split itself

16.1.577  Errorcode 1971: Min. no. of splits not reached

Shortform:

No.of splits<Minimum

Description:

The minimum number of splits has not been reached.

Problem:

To create a split the split number must be minimum 2

SIS-MWV_30.docx

Version: 1.5.19608

Page 311 of 477

solution:

Please insert a split number > 1

16.1.578  Errorcode 1984: Order has been technically completed

MES Weaver

Shortform:

Order techn.complet.

Description:

It is impossible to reactivate technically completed orders.

16.1.579  Errorcode 1985: Proport.targ. qty./partitioning incorr.

Shortform:

Prop.targ.qty/part.

Description:

The target quantity/partitioning relation is incorrect.

16.1.580  Errorcode 1986: Operation cannot be deleted

Shortform:

OP not deletable

Description:

Operation cannot be deleted.

Problem:

The order header or the operation cannot be deleted. This is prevented by the current status of ther

order or the operation.

In HYDRA Standard active operations cannot be deleted.

solution:

16.1.581  Errorcode 1987: Operation cannot be changed

Shortform:

OP not alterable

Description:

The operation cannot be changed.

Problem:

The order header or the operation cannot be changed. This is prevented by the current status of

the order or the operation.

In HYDRA standard active/finished operations cannot be changed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 312 of 477

solution:

16.1.582  Errorcode 1989: Max.number of orders exceeded for

MES Weaver

prio

Shortform:

No. > max. no. prio.

Description:

Maximum number of orders has been exceeded for prio.

Problem:

Maximum number of orders has been exceeded for prio if using the functionality priority check

solution:

Please change the operationgroup configuration

16.1.583  Errorcode 1990: Order header cannot be deleted

Shortform:

AUNR not deletable

Description:

Order header cannot be deleted.

Problem:

Order can nit be deleted because: 1. minimum one op of the order can not be deleted concerning

the operation status configuration 2. one op of the order is runniung 3. orderstatus is configured as

not deletable concerning in operation status cofiguration

solution:

1.Please change the operation status cofiguration so that all operation status (except L) are

deletable 2.Interrupt the running operation 3.Please change the operation status cofiguration of the

order to deletable = J

16.1.584  Errorcode 1991: Order header cannot be changed

Shortform:

AUNR not alterable

Description:

Order header cannot be changed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 313 of 477

16.1.585  Errorcode 1993: Error in formula calculation for times

MES Weaver

Shortform:

Error formula calc.

Description:

Error in formula calculation for times.

Problem:

While calculating the values by formulas an error is occurred

solution:

Verify the input values and the formulas used

16.1.586  Errorcode 1994: OP not subj.to comparison of targ.qty.

Shortform:

No comp.of targ.qty.

Description:

Operation is not subject to comparison of target quantities

Problem:

Operation is not subject to comparison of target quantities

solution:

Configure the operation to comparison of target quantities

16.1.587  Errorcode 1995: Operation has already been scheduled

Shortform:

OP alr. scheduled

Description:

Operation has already been scheduled.

16.1.588  Errorcode 1996: Batch job is already running

Shortform:

Batch already runs

Description:

Batch job is already running.

Problem:

Batch job is already running.

SIS-MWV_30.docx

Version: 1.5.19608

Page 314 of 477

MES Weaver

solution:

Please wait till batchob is finished

16.1.589  Errorcode 1997: Order type is not equal

Shortform:

Order type n. equal

Description:

Order type is not the same.

Problem:

Parallel Logon of operations with diffrent order types is not allowed.

solution:

-

16.1.590  Errorcode 1998: Order model not available

Shortform:

Order model n.avail.

Description:

There is no order model.

Problem:

Souce order not existing when copying an order

solution:

Please select an existing order as source order

16.1.591  Errorcode 2000: An U/E record alr. exists in period

Shortform:

U/E-rec.alr.exists

Description:

An U/E record already exists within the period.

16.1.592  Errorcode 2001: Wrong sequence of OP logon

Shortform:

Wrong sequence

Description:

Wrong sequence of OP posting.

SIS-MWV_30.docx

Version: 1.5.19608

Page 315 of 477

MES Weaver

Problem:

The specified posting sequence has not been observed when logging the OP on to the machine.

solution:

Please check the statuses of the preceding OPs. There must not exist a prepared predecessor OP

within this order.

16.1.593  Errorcode 2002: Wrong scheduling sequence at

machine

Shortform:

Wrong sched.sequence

Description:

Wrong planning sequence at the machine.

Problem:

The specified posting sequence with respect to the planned start date has not been observed when

logging the OP on to the machine.

solution:

Checking the status and start date of the preceding OPs at the machine or in the machine group.

When the compulsory sequence is activated the current OP can only be logged on provided that

there is no OP within the pool of orders that has the status prepared and whose planned date lies

prior to the date of the OP to be logged on.

The inspection is configured based on machines via the compulsory sequence of parameters

(sequence of the specification list when logging OPs on).

16.1.594  Errorcode 2003: Not possible to log OP on to group

Shortform:

Cannot be logged on

Description:

It is impossible to log the OP on to the group.

Problem:

When logging the OP on to the machine the default group of the machine has not been observed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 316 of 477

MES Weaver

solution:

The inspection is configured on the basis of machines via the group production parameter

(customer-specific). If this flag is set only the same (or no) OP may be logged on to the machines of

this group.

As this is a configuration specific to groups a modification automatically affects all other machines

of this group.

16.1.595  Errorcode 2004: Status of preceding OP not allowed

Shortform:

Error preced. status

Description:

Status of the preceding OP is not allowed.

Problem:

When logging the OP on to the machine the default status of the predecessor OP is not observed.

solution:

Please check the status of the preceding OP. The configuration based on the OP defines which

status the preceding OP must have in order that a logon is allowed. In this case the preceding OP

is determined due to the start sequence.

16.1.596  Errorcode 2007: Production variant not found for OP

Shortform:

Prod.variant n.found

Description:

Production variant belonging to the OP has not been found.

Problem:

Production variant belonging to the OP has not been found.

solution:

Please check the production variant belonging to the OP.

16.1.597  Errorcode 2011: Reserved batch has not been logged

on

Shortform:

Reserv. still open

Description:

Reserved batches have not been logged on.

SIS-MWV_30.docx

Version: 1.5.19608

Page 317 of 477

MES Weaver

Problem:

Reserved batches have not been logged on for the OP.

solution:

Please check status of reserved batches.

16.1.598  Errorcode 2012: Batch has been reserved f.another

order

Shortform:

Batch reserved

Description:

Batch has been reserved for another order.

Problem:

Batch could not be locked on, because it has been reserved for another order.

solution:

-

16.1.599  Errorcode 2013: Quantity is missing for an output

batch

Shortform:

O.batchw/o qty.found

Description:

Quantity is missing for an output batch.

Problem:

Output batches without quantity are found for the OP.

solution:

-

16.1.600  Errorcode 2020: Weight of roll has alr. been recorded

Shortform:

Roll alr. weighed

Description:

The weight of the roll has already been recorded.

Problem:

The batch has already been weighed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 318 of 477

solution:

Please check status of the batch.

16.1.601  Errorcode 2021: Roll alr. assigned to pallet

MES Weaver

■■■■■■■■■■

Shortform:

Roll alr. assigned

Description:

Roll has already been assigned to a pallet.

Problem:

The batch has already been assigned to a pallet.

solution:

-

16.1.602  Errorcode 2022: Usage decision alr. available f.order

Shortform:

USD alr. made

Description:

Usage decision is already available for the order.

Problem:

Usage decision has already been made for order header.

solution:

-

16.1.603  Errorcode 2023: Usage decision alr. available f. batch

Shortform:

USD already made

Description:

Usage decision is already available for the batch.

Problem:

The Usage decision has already been made for batch.

solution:

-

SIS-MWV_30.docx

Version: 1.5.19608

Page 319 of 477

16.1.604  Errorcode 2024: Usage decision is not valid

MES Weaver

Shortform:

USD is invalid

Description:

Usage decision is invalid.

Problem:

The Usage decision is not valid.

solution:

-

16.1.605  Errorcode 2025: Batch is still active

Shortform:

Batch still runs

Description:

Batch is still active.

Problem:

Batch is still in status running.

solution:

Please check status of the batch.

16.1.606  Errorcode 2026: Operation is still running

Shortform:

OP still runs

Description:

Operation is still running.

Problem:

Changing of running order is not possible.

solution:

-

16.1.607  Errorcode 2027: Processing mode is invalid

Shortform:

Invalid mode

SIS-MWV_30.docx

Version: 1.5.19608

Page 320 of 477

Description:

Processing mode is invalid.

16.1.608  Errorcode 2028: Roll has alr. been defined as scrap

MES Weaver

Shortform:

Roll already scrap

Description:

Roll has already been posted as scrap.

Problem:

Batch has already been posted as WASTE.

solution:

-

16.1.609  Errorcode 2029: A quantity blancing must be done

Shortform:

Do quantity blancing

Description:

Quantity balancing has to be performed.

Problem:

Quantity balancing has to be performed.

solution:

-

16.1.610  Errorcode 2030: Carrier material has alr.been logged on

Shortform:

C.mat.alr.logged on

Description:

Carrier material has already been logged on.

Problem:

Carrier material already logged on as input batch at machine.

solution:

-

SIS-MWV_30.docx

Version: 1.5.19608

Page 321 of 477

16.1.611  Errorcode 2031: Bill of material item for mat. invalid

MES Weaver

Shortform:

Bill o.mat.item inv.

Description:

Bill of material item belonging to material is invalid.

Problem:

BOM item is invalid for changing input material.

solution:

-

16.1.612  Errorcode 2032: Unplanned material runs on machine

Shortform:

Unplan. mat. active

Description:

Unplanned material is running at the machine.

Problem:

Unplanned material must not run during status change.

solution:

Please check configuration of machine status.

16.1.613  Errorcode 2034: Batch has alr.been reported as

finished

Shortform:

Batch is processed

Description:

Batch has already been registered as prcessed.

16.1.614  Errorcode 2036: Batch has no quantity

Shortform:

Batch without qty.

Description:

Batch has not got a quantity.

SIS-MWV_30.docx

Version: 1.5.19608

Page 322 of 477

MES Weaver

Problem:

Batches without quantity was found.

solution:

-

16.1.615  Errorcode 2039: Machine is not available

Shortform:

Mach.not available

Description:

Machine is not available.

16.1.616  Errorcode 2041: Batch has already been blocked

Shortform:

Batch is blocked

Description:

Batch has already been blocked.

Problem:

Batches have already been blocked.

solution:

-

16.1.617  Errorcode 2043: Total cutting width is too large

Shortform:

Cutting width inval.

Description:

Total cutting width is too large.

16.1.618  Errorcode 2046: Batch has alr.been logged on

i.adv.f.OP

Shortform:

Adv.logon alr.avail.

Description:

Batch has already been logged on in advance for OP.

SIS-MWV_30.docx

Version: 1.5.19608

Page 323 of 477

MES Weaver

Problem:

Advance logon already available for batch.

solution:

-

16.1.619  Errorcode 2047: Batch has not been logged on

i.adv.f.OP

Shortform:

Adv.logon n.avail.

Description:

Batch has not been logged on in advance for OP.

Problem:

There is no advance logon for the batch.

solution:

-

16.1.620  Errorcode 2048: Input batch found without residual qty.

Shortform:

I.batch w/o res.qty.

Description:

Input batch without remaining quantity found.

Problem:

Input batch with remaining quantity <= 0 found.

solution:

Please ckeck status of the input batches on the OP.

16.1.621  Errorcode 2051: Scrap reason is not allowed

Shortform:

Scrap reas.n.allowed

Description:

Scrap reason is not allowed.

Problem:

Scrap reason must not be posted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 324 of 477

16.1.622  Errorcode 2069: Data record has not been changed

MES Weaver

Shortform:

Data rec.n.changed

Description:

Data record has not been changed.

16.1.623  Errorcode 2400: Please state valid characteristic no.

Shortform:

Invalid charact.no.

Description:

Invalid characteristic number.

Problem:

You have entered an invalid characteristic number.

solution:

Check your input or configure the characteristic before you use it

16.1.624  Errorcode 2401: Charact.assigned to at least one mach.

Shortform:

Ch.assign.meas.chan.

Description:

Characteristic is at least assigned to one machine.

Problem:

The characteristic can not be deleted because the characteristic is assigned at least to one

machine.

solution:

Delete all the channels to which this characteristic is assigned before you delete the characteristic

16.1.625  Errorcode 2402: Characteristic used in at least on IPL

Shortform:

Ch. assigned to IPL

Description:

Characteristic is used at least in one inspection plan.

Problem:

The characteristic can not be deleted because the characteristic is used at least in inspection plan

SIS-MWV_30.docx

Version: 1.5.19608

Page 325 of 477

16.1.626  Errorcode 2403: Characteristic is not available

MES Weaver

Shortform:

Charac.n.available

Description:

Characteristic is not available.

Problem:

Characteristic for the input characteristic number is not available

solution:

Select a valid characteristic number

16.1.627  Errorcode 2404: Collect.is curr.active at meas.channel

Shortform:

Coll.active meas.ch.

Description:

Collection is currently active at measuring channel.

Problem:

The measuring channel can not be deleted at the moment, because the collection is active at this

channel

solution:

Log off the operations at this machine (at the terminal), before you delete the measuring channel.

16.1.628  Errorcode 2405: Max.no. of meas.chan.per

mach.reached

Shortform:

Max.16 meas.chan.def

Description:

Maximum number of measuring channels has been reached per machine.

16.1.629  Errorcode 2406: Coll.w.assignm.active at 1 mach.at

least

Shortform:

Coll.w.assign.active

SIS-MWV_30.docx

Version: 1.5.19608

Page 326 of 477

MES Weaver

Description:

Collection including assignment is active at one machine at least.

Problem:

The inspection plan, which is assigned in this reference, is active at least at one machine.

solution:

Log off the operations at this machine (at the terminal), which use this inspection plan, before you

delete the assignment.

16.1.630  Errorcode 2407: Select machine, article or tool no.!

Shortform:

Indicate MNR/ATK/WNR

Description:

Choose machine, article or tool number!

Problem:

You have not chosen any keys for the assignment of the inspection plan.

solution:

You will need to assign at least one key (machine, article and / or tool number).

16.1.631  Errorcode 2408: Please indicate valid inspect. plan no.

Shortform:

Invalid insp. plan

Description:

Please enter valid inspection plan number.

Problem:

An inspection plan with the specified ID does not exist.

solution:

Enter a valid ID for the inspection plan

16.1.632  Errorcode 2409: Please indicate valid insp.plan version

Shortform:

Invalid IPL version!

Description:

Please enter valid inspection plan version.

SIS-MWV_30.docx

Version: 1.5.19608

Page 327 of 477

MES Weaver

Problem:

The inspection plan does not exist with the given version

solution:

Enter a valid inspection plan version.

16.1.633  Errorcode 2410: N.possible,insp.plan has been

productive

Shortform:

Insp.plan productive

Description:

Impossible, inspection plan has been productive.

Problem:

Deleting or modifying a inspection plan, which was already used to record measurements, is not

possible.

solution:

Disable the inspection, if the inspection plan should no longer be used or insert a new version of

the inspection plan, if you want to change it

16.1.634  Errorcode 2411: Invalid reference has been indicated

Shortform:

Invalid reference

Description:

Invalid reference has been stated.

Problem:

Data record has been deleted. Please request the list anew.

16.1.635  Errorcode 2412: Please state valid process

intervent.no.

Shortform:

Invalid PE no.

Description:

Invalid action or machine number. Please enter valid action number or machine number.

Problem:

You have an invalid action number and / or machine number.

SIS-MWV_30.docx

Version: 1.5.19608

Page 328 of 477

solution:

Check your input.

16.1.636  Errorcode 2413: Process intervent.no.hasn't been

MES Weaver

stated

Shortform:

Proc.interv.missing

Description:

Process action number has not been entered.

Problem:

You have entered an invalid action number

solution:

Check your input.

16.1.637  Errorcode 2415: Channel type not supported

Shortform:

C.type unsupported

Description:

Channel type is not supported

Problem:

You have entered an invalid channel type

solution:

Check your input.

16.1.638  Errorcode 2416: PDV Event not set

Shortform:

PDV Event not set

Description:

Assigned PDV Event is not available

Problem:

Assigned PDV Event is not available

solution:

Assign a configured PDV Event

SIS-MWV_30.docx

Version: 1.5.19608

Page 329 of 477

16.1.639  Errorcode 2417: Wrong channel data for anonym

MES Weaver

pparam

Shortform:

Wrong channel data

Description:

Anonym processparameters do not support this chan. data

Problem:

Anonym processparameters dont support any specifications so only measure values are valid

channel data entries

solution:

Please change channel data to MW

16.1.640  Errorcode 2418: Invalid channel number

Shortform:

Invalid chan. number

Description:

Invalid channel number assigned

Problem:

Channel number must be between 1 and 9999

solution:

Please insert a channel number between 1 and 9999

16.1.641  Errorcode 2419: Invalid cycle time

Shortform:

Invalid cycle time

Description:

Invalid cycle time

Problem:

Invalid cycle time entered

solution:

Please insert a valid cycle number

SIS-MWV_30.docx

Version: 1.5.19608

Page 330 of 477

16.1.642  Errorcode 2420: Invalid channel orientation

MES Weaver

Shortform:

Invalid chan. orien.

Description:

Invalid channel orientation

Problem:

Invalid channel orientation for assigned channel data

solution:

Please insert a valid channel orientation (Input / Output) for assigned channel data

16.1.643  Errorcode 2421: Alert not supported

Shortform:

Alert not supported

Description:

Alert not supported for this channel data

Problem:

Alert not supported for this channel data. Only channel data for limits support alert channels

solution:

Please change channel data or romove alert

16.1.644  Errorcode 2422: Machine already assigned to terminal

Shortform:

Machine ardy. assig.

Description:

Machine already assigned to another terminal

Problem:

Machine already assigned to another terminal using logical channels.

solution:

Please assign machine of this logical channel to same terminal

SIS-MWV_30.docx

Version: 1.5.19608

Page 331 of 477

16.1.645  Errorcode 2423: MachNo-TermNo-Chan-Combi already

MES Weaver

assig

Shortform:

Channel ardy. assig.

Description:

This combination of machine, terminal and channel already assigned

Problem:

This combination of machine, terminal and channel already assigned. The combination must be

unique.

solution:

Please assign an other free logical channel.

16.1.646  Errorcode 2424: MachNo-TermNo-FKey-Combi already

assig

Shortform:

FKey ardy. assig.

Description:

This combination of machine, terminal and fkey already assigned

Problem:

This combination of machine, terminal and fkey already assigned. The combination must be unique.

solution:

Please assign an other free fkey.

16.1.647  Errorcode 2600: Logical system is not available!

Shortform:

Log.system invalid

Description:

Logical system is not available.

Problem:

Logical system is not available.

solution:

Define the Logical system first.

SIS-MWV_30.docx

Version: 1.5.19608

Page 332 of 477

16.1.648  Errorcode 2601: Logical system already exists!

MES Weaver

Shortform:

Log.sys.alr.avail.

Description:

Logical system is already available.

Problem:

Logical system is already available.

solution:

Use another name for the new logical system.

16.1.649  Errorcode 2602: Configuration n.available f.log.system!

Shortform:

LS config. invalid

Description:

The configuration belonging to the logical system is not available.

Problem:

The configuration belonging to the logical system is not available.

solution:

Define a valid configuration for the logical system.

16.1.650  Errorcode 2603: Config. alr. exists for logical system.!

Shortform:

LS config.alr.avail.

Description:

Configuration belonging to the logical system is already available.

Problem:

Configuration belonging to the logical system is already available.

solution:

Define a configuration for another logical system.

16.1.651  Errorcode 2604: Distribution model is not available!

Shortform:

Distr.model invalid

SIS-MWV_30.docx

Version: 1.5.19608

Page 333 of 477

MES Weaver

Description:

Distribution model is not available.

Problem:

Distribution model is not available.

solution:

Define a valid Distribution model.

16.1.652  Errorcode 2605: Distribution model already exists!

Shortform:

Dist.model alr.avail

Description:

Distribution model is already available.

Problem:

Distribution model is already available.

solution:

Choose another Name for the new entry.

16.1.653  Errorcode 2606: Wrong MESTYP

Shortform:

Wrong MESTYP

Description:

Wrong MESTYP

Problem:

The message type is not be supported.

solution:

Choose a supported message type.

16.1.654  Errorcode 2607: IDoc not found

Shortform:

IDoc not found

Description:

IDoc not found

SIS-MWV_30.docx

Version: 1.5.19608

Page 334 of 477

16.1.655  Errorcode 2608: IDoc status not for processing

MES Weaver

Shortform:

Do not process IDoc

Description:

IDoc status is not to be processed.

16.1.656  Errorcode 2609: No processible data found

Shortform:

No processible data

Description:

No processible data found.

16.1.657  Errorcode 2610: Wrong segment type

Shortform:

Wrong segment type

Description:

Wrong segment type.

16.1.658  Errorcode 2611: Segment at wrong position in IDoc

Shortform:

Wrong segment pos.

Description:

Segment is at wrong position within IDoc.

16.1.659  Errorcode 2612: Error in initialization

Shortform:

Init. error

Description:

Error in initialization.

16.1.660  Errorcode 2613: Order cannot be processed

Shortform:

Wrong order status

SIS-MWV_30.docx

Version: 1.5.19608

Page 335 of 477

Description:

Order cannot be processed.

16.1.661  Errorcode 2614: Error when connecting to sap system

MES Weaver

Shortform:

No Connection to SAP

Description:

A connection to the SAP system cannot be established.

16.1.662  Errorcode 2615: Incorrect reply from the SAP system

Shortform:

Incorrect reply

Description:

The SAP system reports an invalid response

16.1.663  Errorcode 2700: There are dependencies (machine

table)

Shortform:

Mach.depend.exists

Description:

There are still dependencies (table of machines)

Problem:

It is not possible to delete the dataset, because of the dependencies of the machine.

solution:

Please unlock the maschine dependencies.

16.1.664  Errorcode 2701: There are

dependencies(hierarc.assignm.)

Shortform:

Hier.assignm.exists

Description:

There are still dependencies (hierarchical assignments)!

Problem:

It is not possible to delete the dataset, because of the hierarchical assignments.

SIS-MWV_30.docx

Version: 1.5.19608

Page 336 of 477

solution:

Please unlock the hierarchical assignments.

16.1.665  Errorcode 2702: There are dependencies(transport

MES Weaver

table)

Shortform:

Transp.depend.exists

Description:

There are still dependencies (transport table)

Problem:

It is not possible to delete the dataset, because of the transport assignments.

solution:

Please unlock the transport assignments.

16.1.666  Errorcode 2703: Hier.ID bigger than select.hier.buffer

Shortform:

Hierar.ID bigger

Description:

The hierarchical ID is larger than that of the selected hierarchical buffer.

Problem:

The hierarchical ID is larger than that of the selected hierarchical buffer.

solution:

Please choose another material buffer.

16.1.667  Errorcode 2704: Hier.ID smaller than hier.buffer

Shortform:

Hierar.ID smaller

Description:

The hierarchical ID is smaller than at least one of the assigned buffers.

Problem:

The hierarchical ID is smaller than at least one of the assigned buffers.

solution:

Please choose another material buffer.

SIS-MWV_30.docx

Version: 1.5.19608

Page 337 of 477

16.1.668  Errorcode 2705: Invalid hierarchy

MES Weaver

Shortform:

Assignm.smaller hier

Description:

Selected destination is not available.

Problem:

Selected destination is not available.

solution:

Please choose an available destination.

16.1.669  Errorcode 2707: Reference tab

MAT_MATTYP/LOS_BESTAND

Shortform:

Refer.tab MATMATYP

Description:

There is a reference to the table MAT_MATTYP and/or LOS_BESTAND

Problem:

There is a reference to the table MAT_MATTYP and/or LOS_BESTAND.

solution:

Please choose another MAT_MATTYP.

16.1.670  Errorcode 2708: String length not equal

C_GEN_FIX/C_FIX

Shortform:

Differ. string len.

Description:

Fix string length of the automatical generation of batch numbers is not identical (column

C_GEN_FIX and C_FIX)

Problem:

Fix string length of the automatical generation of batch numbers is not identical (column

C_GEN_FIX und C_FIX)

solution:

Please correct the string length.of the automatical generation of batch numbers.

SIS-MWV_30.docx

Version: 1.5.19608

Page 338 of 477

16.1.671  Errorcode 2709: Material type does not exist

MES Weaver

Shortform:

MATTYP doesn't exist

Description:

Material type does not exist.

Problem:

Material type does not exist.

solution:

Please declare an correct material type.

16.1.672  Errorcode 2710: Mat.buffers of type F may be assigned

Shortform:

Assign. MATPUT Typ=F

Description:

Only material buffers of the type F may be assigned.

Problem:

Only material buffers of the type F may be assigned.

solution:

Please use an material buffer of type F.

16.1.673  Errorcode 2712: Transp.unit occupied by current batch

Shortform:

TPU = occ.curr.batch

Description:

Transport unit is occupied by an active batch.

Problem:

Transport unit is occupied by an active batch.

solution:

Please choose another transport unit.

16.1.674  Errorcode 2715: Wrong status

Shortform:

Wrong status

SIS-MWV_30.docx

Version: 1.5.19608

Page 339 of 477

MES Weaver

Description:

Wrong status

Problem:

There are inconsistencies with date of expiry/availability date .

solution:

Please correct the inconsistencies.

16.1.675  Errorcode 2716: Filling out the table(qty.,unit,status)

Shortform:

Filling the table

Description:

Error when filling the table LOS_BESTAND

Problem:

Invalid status of the lot when updating the table LOS_BESTAND.

solution:

Please insert a correct status of the lot.

16.1.676  Errorcode 2717: Transport unit not available

Shortform:

TPU not available

Description:

Transport unit is not available.

Problem:

Transport unit is not available.

solution:

Please insert a correct transport unit.

16.1.677  Errorcode 2718: Material buffer not available

Shortform:

Mat.buf.n. available

Description:

Material buffer is not available.

Problem:

Material buffer is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 340 of 477

solution:

Please insert a correct material buffer.

16.1.678  Errorcode 2719: Semi-finished material type n.

MES Weaver

available

Shortform:

Semi-f.type n.avail.

Description:

Semi-finished material type not available.

Problem:

Semi-finished material type not available.

solution:

Please insert a correct Semi-finished material type.

16.1.679  Errorcode 2720: Material buffer not connected with PL

Shortform:

Mat.buf.n.connected

Description:

Deletion impossible, as material buffer is not explicitly connected to the production step.

16.1.680  Errorcode 2721: Assignment not possible (recursion)

Shortform:

Assignment n.poss.

Description:

Assignment impossible (recursion).

16.1.681  Errorcode 2722: Destination is still being used

Shortform:

ZLO is used

Description:

Destination is still being used.

SIS-MWV_30.docx

Version: 1.5.19608

Page 341 of 477

16.1.682  Errorcode 2723: Max. field length exceeded

MES Weaver

Shortform:

Field length too big

Description:

Maximum field length exceeded.

Problem:

The maximum field length has been exceeded.

solution:

Choose a valid field length. The field may be at most <MAXLEN> characters long.

16.1.683  Errorcode 2724: Max.no.of decimal places exceeded

Shortform:

Decim.places too big

Description:

The maximum number of decimal places exceeded.

Problem:

The maximum number of decimal places has been exceeded.

solution:

Choose a valid number of decimal places. The field can have at most <MAXNKS> decimal places.

16.1.684  Errorcode 2725: Invalid indexing. Value range!

Shortform:

Invalid index

Description:

Invalid indexing. Consider value range!

Problem:

You have chosen an invalid index. Please consider the value range.

solution:

Invalid indexing. Value range between <MINIDX> and <MAXIDX>.

16.1.685  Errorcode 2726: Invalid input type

Shortform:

Invalid input type

SIS-MWV_30.docx

Version: 1.5.19608

Page 342 of 477

MES Weaver

Description:

Invalid input type.

Problem:

You have chosen an invalid input type.

solution:

Please choose a valid input type.

16.1.686  Errorcode 2727: Display position has alr. been defined

Shortform:

Display pos.avail.

Description:

The display position has already been defined for this semi finished article!

Problem:

The display position has already been defined for this semi finished article!

solution:

Enter another display position.

16.1.687  Errorcode 2728: Print position has alr. been defined

Shortform:

Print pos. available

Description:

The print position has already been defined for this semi-finished article!

Problem:

The print position has already been defined for this semi-finished article!

solution:

Enter another print position.

16.1.688  Errorcode 2729: Table does not exist

Shortform:

Table doesn't exist

Description:

Table does not exist!

SIS-MWV_30.docx

Version: 1.5.19608

Page 343 of 477

16.1.689  Errorcode 2730: There are still dependencies!

MES Weaver

Shortform:

Dependencies avail.

Description:

There are still dependencies (LOS_BESTAND-Tabelle)!

Problem:

There are still dependencies (LOS_BESTAND-Tabelle)

solution:

Please dissolve the dependencies.

16.1.690  Errorcode 2733: Storage location is still being used

Shortform:

Storage loc. in use

Description:

Destination is still being used.

Problem:

Destination is still being used.

solution:

Delete the dependencies first (i.e. at the ressource).

16.1.691  Errorcode 2734: The reason text is still being used!

Shortform:

Text is used

Description:

The text is still being used in a configuration!

16.1.692  Errorcode 2801: Order split not possible.

Shortform:

Order split n.poss.

Description:

Order split is impossible. The number of splits exceeds the maximum number of 99 splits or the

quantity of the OP(s) exceeds the max. possible quantity.

SIS-MWV_30.docx

Version: 1.5.19608

Page 344 of 477

16.1.693  Errorcode 2802: Order must not be a split order

MES Weaver

Shortform:

No split order poss.

Description:

This order is split and thus cannot be deleted. Please cancel the split at first.

16.1.694  Errorcode 2803: Order mustn't be order of a split order

Shortform:

No split order poss.

Description:

The order is a split order and thus cannot be deleted. Please cancel the split at first.

16.1.695  Errorcode 2804: Only allowed for split order

Shortform:

Only split ord.poss.

Description:

Canceling a split is only possible in case of an order that is split or a split order.

16.1.696  Errorcode 2805: Quick order alphanumer.after 1st digit

Shortform:

Quick order alphanum

Description:

The creation of quick orders with alphanumeric characters after the 1st digit is not allowed.

Problem:

The creation of quick orders with alphanumeric characters after the 1st digit is not allowed.

solution:

Change the order number of the quick order.

16.1.697  Errorcode 2807: Status n.alterable as sequence

inactive

Shortform:

Status n. alterable

SIS-MWV_30.docx

Version: 1.5.19608

Page 345 of 477

MES Weaver

Description:

Status cannot be changed as sequence is inactive.

Problem:

Status of an operation can not be changed if operation is member of an inactive sequence

solution:

-

16.1.698  Errorcode 2808: Start date is after end date

Shortform:

Start after end

Description:

Start date lies after end date.

Problem:

Start date lies after end date.

solution:

Please set a correct start and end date

16.1.699  Errorcode 2809: Order type n.alterable as order started

Shortform:

Order type n.alter.

Description:

Order type cannot be changed as order has been started.

Problem:

Order type cannot be changed as order has been started.

solution:

-

16.1.700  Errorcode 2810: Value batch management is different

Shortform:

Value batch man. dif

Description:

Only operations having the same value within the batch management requirement field may be

grouped to collective operations, i.e. a collective operations may only include operations that are

subject to batch management requirement OR operations that are not.

SIS-MWV_30.docx

Version: 1.5.19608

Page 346 of 477

MES Weaver

Problem:

Only operations having the same value within the batch management requirement field may be

grouped to collective operations, i.e. a collective operations may only include operations that are

subject to batch management requirement OR operations that are not.

solution:

-

16.1.701  Errorcode 2811: Order not allowed for collective OP

Shortform:

OP not allow. col.OP

Description:

OP cannot be added to collective OP.

Problem:

OP cannot be added to collective OP because it is a child operation

solution:

-

16.1.702  Errorcode 2812: Order already exists in archive

Shortform:

OP already archived

Description:

Order is already available within the archive.

Problem:

It was tried to create an order which is already available within the archive. Orders which are once

in the archive can not be created anymore in the actual dataset

solution:

-

16.1.703  Errorcode 2813: Activity Code key not defined

Shortform:

Activity Code n.avail

Description:

The stated activity code key does not exist in HYDRA.

Problem:

The stated activity code key does not exist in HYDRA.

SIS-MWV_30.docx

Version: 1.5.19608

Page 347 of 477

solution:

Please configure activity code key in HYDRA.

16.1.704  Errorcode 2817: Order Type not available

MES Weaver

Shortform:

Order Type not avail.

Description:

Order type not available.

Problem:

Order type not available.

solution:

Please enter a valid order type

16.1.705  Errorcode 2818: Categorie order type is not equal

Shortform:

Order cat. n. equal

Description:

Category of order type is not the same.

Problem:

When copying an order the category of the order type of source and target order must be the same

solution:

-

16.1.706  Errorcode 2901: Is used as source in inspection plan

Shortform:

Is IPL source

Description:

Is used as source within inspection plan.

Problem:

You are trying to delete a catalog characteristic for which a reference (details or specifications)

exists within the inspection planning.

solution:

If possible, please change the reference data within the inspection plan characteristics in such a

way that the inspection plan is used as source for the detail and specification data.

If this is impossible the characteristic must not be deleted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 348 of 477

16.1.707  Errorcode 2902: Inspection order has not been found

MES Weaver

Shortform:

Insp. order n.avail.

Description:

Inspection order has not been found.

Problem:

You are trying to create an inspection requirement by logging an order onto the terminal or you are

trying to create a calibration or maintenance order.

solution:

Please make sure that an active inspection plan is available for the inspection requirement or the

calibration or maintenance plan.

16.1.708  Errorcode 2903: Indicated company not available

Shortform:

Company n. available

Description:

Company has not been found.

Problem:

The entered company number or company group is invalid.

solution:

Correct the company number or enter a new company in the master data.

16.1.709  Errorcode 2904: Is used in specification list

Shortform:

Used in spec.list

Description:

Is being used within the specification list.

Problem:

You are trying to delete a catalog characteristic which entries in the specification list exist for.

solution:

If possible, please delete the entries in the specification list having a reference to this characteristic

number.

If this is impossible the characteristic must not be deleted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 349 of 477

16.1.710  Errorcode 2905: Mandatory insp.has not been carried

MES Weaver

out

Shortform:

Mand.insp.n.executed

Description:

Mandatory inspection has not been carried out.

Problem:

You are trying to finish an inspection order having a characterististic that is identified by "mandatory

inspection". Measured values have not been recorded for this characteristic.

solution:

Please collect measured values for all characteristics that are labeled by "mandatory inspection".

16.1.711  Errorcode 2906: Calculat. character., no entry possible

Shortform:

Calculated character

Description:

Calculated characteristic, input impossible

Problem:

You are trying to enter, change or delete a measured value for a calculated characteristic.

solution:

Single values of calculated characteristics can only be changed by altering characteristic values,

which are taken into account in the computation formula.

16.1.712  Errorcode 2907: Measured value is invalid(not

plausible)

Shortform:

Meas.value invalid

Description:

Measured value is invalid as it is not plausible.

Problem:

You are trying to save a measured value that is beyond the plausibility limits.

SIS-MWV_30.docx

Version: 1.5.19608

Page 350 of 477

MES Weaver

solution:

If plausibility limits are defined within the inspection planning the corresponding single values have

to be within these limits. Please correct the measured value accordingly.

16.1.713  Errorcode 2908: No Q-character. found for preced.roll

Shortform:

No preceding roll

Description:

No Q characteristic has been found for preceding roll.

Problem:

When completing an inspection order it is searched for a Q characteristic of the preceding roll.

However, a corresponding characteristic has not been found for this one.

solution:

Please respond to this message according to the specified options.

16.1.714  Errorcode 2909: Preceding order hasn't been

completed

Shortform:

Order n.completed

Description:

The preceding order has not been completed.

Problem:

When completing an inspection order it is searched for Q data of the preceding roll. The order of

this preceding roll has indeed been found but it is not completed.

solution:

Respond to this message according to the specified options.

16.1.715  Errorcode 2910: Measured values handed down are

faulty

Shortform:

Meas.values faulty

Description:

Inherited measured values are faulty.

SIS-MWV_30.docx

Version: 1.5.19608

Page 351 of 477

MES Weaver

Problem:

Measured values from the preceding roll are attempted to be adopted for an unchecked

characteristic. However, this roll disposes of characteristics that would lead to a violation of limit

values within the current characteristic.

solution:

Please respond to this message according to the specified options.

16.1.716  Errorcode 2911: The distributor doesn't contain entries

Shortform:

Distributor empty

Description:

The distributor does not contain entries.

Problem:

A measure is attempted to be generated for a distributor. This distributor does not contain entries.

solution:

Assign entries to the distributor or choose another party responsible for the action.

16.1.717  Errorcode 2912: Specified measure not distinct

Shortform:

Several measures

Description:

Specified measure is not unique.

Problem:

You are trying to change data of a measure.

solution:

The key fields to identify the measure are not sufficient enough to identify exactly one measure.

There are several measures tha correspond to the key fields.

Please contact MPDV Support.

16.1.718  Errorcode 2913: The assessment catalog is active

Shortform:

Assessm.catal.active

Description:

The assessment catalog is active.

SIS-MWV_30.docx

Version: 1.5.19608

Page 352 of 477

MES Weaver

Problem:

You are trying to change data of an active assessment catalog.

solution:

Deactivate the assessment catalog before changing the data.

16.1.719  Errorcode 2914: The assessment catalog is used

Shortform:

Assessm.cat.in use

Description:

The assessment catalog is being used.

Problem:

You are trying to change the data of an assessment catalog that is in use.

solution:

Data of an assessment catalog that is already used cannot be changed. Please create a new

assessment catalog or delete the assessments that are using this assessment catalog.

16.1.720  Errorcode 2915: The assessment has been completed

Shortform:

Assessment completed

Description:

The assessment has been completed.

Problem:

You are trying to change data of a completed assessment.

solution:

Data of a completed assessment cannot be changed.

16.1.721  Errorcode 2916: The control plan has been released

Shortform:

Control pl. released

Description:

The control plan has been released.

Problem:

You are trying to change the data of a released control plan.

SIS-MWV_30.docx

Version: 1.5.19608

Page 353 of 477

MES Weaver

solution:

Please change the release of the control plan.

16.1.722  Errorcode 2917: The control plan is active

Shortform:

Control plan active

Description:

The control plan is active.

Problem:

You are trying to change the data of an active control plan.

solution:

Deactivate the control plan before changing the data.

16.1.723  Errorcode 2918: Gage is not allowed for mass output

Shortform:

Gage n.mass output

Description:

Gage has been excluded from mass output.

Problem:

The gage has been excluded from mass output.

solution:

Please use a gage that is allowed for mass output.

16.1.724  Errorcode 2919: Stock is not available

Shortform:

Stock not available

Description:

Stock is not available.

Problem:

The stock is not available.

solution:

Please enter valid stock.

SIS-MWV_30.docx

Version: 1.5.19608

Page 354 of 477

16.1.725  Errorcode 2920: Department not available.

MES Weaver

Shortform:

Dept. not available

Description:

Department is not available.

16.1.726  Errorcode 2921: No.of NCU larger than sample size

Shortform:

NCU larger spl.size

Description:

Number of nonconforming units is larger than sample size.

Problem:

The number of nonconforming units entered is larger than the sample size.

solution:

Please enter less nonconforming units.

16.1.727  Errorcode 2922: Invalid input type

Shortform:

Invalid input tpye

Description:

Invalid input type.

Problem:

The input type (variable, attributive, etc.) does not exist.

solution:

Please choose a valid input type.

16.1.728  Errorcode 2923: Order status does not allow an entry

Shortform:

Invalid order status

Description:

Order status does not allow an entry

SIS-MWV_30.docx

Version: 1.5.19608

Page 355 of 477

16.1.729  Errorcode 2924: Character. status doesn't allow entry

MES Weaver

Shortform:

Inv.character.status

Description:

Character. status doesn't allow entry.

16.1.730  Errorcode 2925: Measured value violates tolerance limit

Shortform:

Meas.val.violates TL

Description:

Measured value violates tolerance limit.

16.1.731  Errorcode 2926: Characteristic has not been defined

Shortform:

Character.not avail.

Description:

Characteristic has not been defined.

16.1.732  Errorcode 2927: The gage has become due

Shortform:

Gage due

Description:

The gage has become due.

16.1.733  Errorcode 2928: The sample number is invalid

Shortform:

Sample no. invalid

Description:

The sample number is invalid or a new number entry could not be created.

16.1.734  Errorcode 2929: The sample number already exists

Shortform:

Sample no. exists

SIS-MWV_30.docx

Version: 1.5.19608

Page 356 of 477

Description:

The sample number already exists.

16.1.735  Errorcode 2930: A measured value with this ID exists

MES Weaver

Shortform:

Meas.val.ID exists

Description:

A measured value with this ID exists.

16.1.736  Errorcode 2931: Simulation OK

Shortform:

Simul. OK

Description:

Simulation OK.

16.1.737  Errorcode 2932: Min. 1 sample has not been

completed!

Shortform:

Sample n. completed

Description:

Min. 1 sample has not been completed!

16.1.738  Errorcode 2933: This function not supported for input

type!

Shortform:

Wrong input type

Description:

This function not supported for input type.

Problem:

You are trying to record inspection results.

solution:

Please use another method for recording results (CPAUSP or CPAUMW).

Please contact MPDV Support.

SIS-MWV_30.docx

Version: 1.5.19608

Page 357 of 477

16.1.739  Errorcode 2934: Maximum of samples reached!

MES Weaver

Shortform:

Max. samples reached

Description:

Maximum of samples reached.

Problem:

You are trying to record inspection results.

solution:

The number of samples are limited for the current input type. You are trying to record one sample

more than allowed.

Please contact MPDV Support.

16.1.740  Errorcode 2935: Maximum of samples for number

reached!

Shortform:

Max. samples number

Description:

Maximum of samples for number reached.

Problem:

You are trying to record inspection results.

solution:

The number of sumples of a number entry is limited for the current input type. You are trying to

record one sample more than allowed.

Please contact MPDV Support.

16.1.741  Errorcode 2936: Inspection point(s) not finished!

Shortform:

Insp. points n. fini

Description:

Inspection point(s) not finished.

Problem:

There are inspection points that have not yet been completed.

solution:

Please complete all inspection points.

SIS-MWV_30.docx

Version: 1.5.19608

Page 358 of 477

16.1.742  Errorcode 2937: Inspection point(s) not finished for

MES Weaver

machine!

Shortform:

Insp. points n. fini

Description:

Inspection point(s) not finished for machine.

Problem:

There are inspection points that have not yet been completed for the machine.

solution:

Please complete all inspection points for the machine.

16.1.743  Errorcode 2938: Inspection scope incorrect!

Shortform:

Insp. scope incorr.

Description:

Inspection scope incorrect.

Problem:

The inspection scope has not been observed.

solution:

The inspection scope has not been observed. Either too many or not enough values have been

recorded for at least one corresponding characteristic.

16.1.744  Errorcode 2939: Inspection order not finished!

Shortform:

Inspec.ord. not fini

Description:

Inspection order not finished.

Problem:

There are inspection orders that have not yet been finished.

solution:

Please finish all inspection orders.

SIS-MWV_30.docx

Version: 1.5.19608

Page 359 of 477

16.1.745  Errorcode 2940: Inspection not finished!

MES Weaver

Shortform:

Inspec. not finished

Description:

Inspection not finished.

Problem:

The quality inspection has not been carried out completely or was checked NOK (not ok).

solution:

Please carry out the quality inspection completely.

16.1.746  Errorcode 2941: Last Container already reached!

Shortform:

Last Cont. reached

Description:

Last Container already reached.

16.1.747  Errorcode 2942: Open measures exist!

Shortform:

Open measures exist

Description:

Open measures exist.

16.1.748  Errorcode 2943: Invalid Input type must be "AUTOMAT"

Shortform:

Invalid Input type

Description:

Invalid Input type must be "AUTOMAT".

16.1.749  Errorcode 2944: Wrong specification

Shortform:

Wrong specification

Description:

Wrong specification.

SIS-MWV_30.docx

Version: 1.5.19608

Page 360 of 477

16.1.750  Errorcode 2945: Characteristic, Changing not possible

MES Weaver

Shortform:

Changing n. possible

Description:

Characteristic, Changing not possible.

16.1.751  Errorcode 2946: Prod. operation is still logged on

Shortform:

Prod. OP logged on

Description:

Prod. operation is still logged on.

Problem:

There is still a (superior) productive operation logged on for the QM operation,which is to be

finished or interrupted.

solution:

Msn: Booking requirement possible => "Yes"-Button OR, if necessary, log productive operation off.

16.1.752  Errorcode 2947: Inspection point(s) already finished!

Shortform:

Insp. points finish

Description:

Inspection point(s) already finished.

Problem:

The inspection point is already completed.

solution:

Please reopen the inspection point.

16.1.753  Errorcode 2948: Inspection order already finished!

Shortform:

Inspec.ord finished

Description:

Inspection order already finished.

Problem:

The inspection order is already finished.

SIS-MWV_30.docx

Version: 1.5.19608

Page 361 of 477

solution:

Reopen the inspection order.

16.1.754  Errorcode 2949: Inspection requirem. already finished!

MES Weaver

Shortform:

Inspec.req. finished

Description:

Inspection requirement already finished.

Problem:

The inspection requirement is already finished.

solution:

Reopen the inspection requirement.

16.1.755  Errorcode 2950: Gauge not useable (status)!

Shortform:

Gauge not useable

Description:

Gauge not useable because of the status.

Problem:

Gauge not useable because of the status.

solution:

Change the status of the gauge.

16.1.756  Errorcode 2951: Incorrect format of input data!

Shortform:

Incorrect inputform.

Description:

Contens of list are not correct

Problem:

value of column or count of columns are not correct

solution:

check content of data row

SIS-MWV_30.docx

Version: 1.5.19608

Page 362 of 477

16.1.757  Errorcode 2952: No data found in tnt_table_repo!

MES Weaver

Shortform:

No data,tnttablerepo

Description:

No entry is existed in table tnt_tbale_repo, with this keys.

Problem:

Entry of TNT-table does not exist.

solution:

-

16.1.758  Errorcode 2953: Column is_online is not N!

Shortform:

Is_online is not N!

Description:

Table: tnt_table_repo, column: is_online with value unequal N

Problem:

The process is stopped for this entry, jump to next step.

solution:

-

16.1.759  Errorcode 2954: TNT-table is locked by process!

Shortform:

Table is locked!

Description:

TNT-table is locked by an other process.

Problem:

The process is ignored the TNT-table, because an other process is used the TNT-table.

solution:

-

16.1.760  Errorcode 2955: TNT-table,lock status is indeterminate!

Shortform:

Lock status unknow!

SIS-MWV_30.docx

Version: 1.5.19608

Page 363 of 477

MES Weaver

Description:

Lock status of TNT-table is indeterminate.

Problem:

The process is ignored the TNT-table, (jump to next step).

solution:

check: database is online. check: table hyd_lock is existed.

16.1.761  Errorcode 2956: Entry was not found in tnt_headers!

Shortform:

No tnt_header found!

Description:

Header entry of table tnt_headers was not found.

Problem:

No entry is existed for this table_id.

solution:

-

16.1.762  Errorcode 2957: TNT-table was not created!

Shortform:

TNT-table not create

Description:

Error by creating TNT-table.

Problem:

TNT-table could not be created!

solution:

-

16.1.763  Errorcode 2958: Index of TNT-table was not created!

Shortform:

Index not create

Description:

Error by creating index of TNT-table

Problem:

Index of TNT-table could not be created!

SIS-MWV_30.docx

Version: 1.5.19608

Page 364 of 477

solution:

-

16.1.764  Errorcode 2959: Archiving file was not found!

MES Weaver

Shortform:

Arc. file not found

Description:

Archiving file was not found!

Problem:

Archiving directory or archiving file are not correct.

solution:

Check, archiving directory. Check, archiving file.

16.1.765  Errorcode 2960: File transfer was failed!

Shortform:

File transfer failed

Description:

File transfer was failed from archiving directory to transport directory.

Problem:

File was not copied into transport directory.

solution:

Check, archiving directory. Check, transport directory. Check, file already exist in transport

directory.

16.1.766  Errorcode 2961: Reading file was failed!

Shortform:

Reading file failed

Description:

Reading file was failed.

Problem:

Reading file was failed (or general error in process\function do_pdv_reload_massdate)

solution:

Check, if file is existed in transport directory. Check, if file has reading rights.

SIS-MWV_30.docx

Version: 1.5.19608

Page 365 of 477

16.1.767  Errorcode 2962: Reload flag was not updated!

MES Weaver

Shortform:

Reload flag not set

Description:

Reload flag was not updated in table tnt_table_repo.

Problem:

The Status "is_online" of tnt_table was not set from 'N' (not online) to 'R' (reload), because the

process is run into an error.

solution:

-

16.1.768  Errorcode 2963: Param for calculation is missing!

Shortform:

Param f. calc. miss.

Description:

One or more params for calculation are missing!

Problem:

The limits can not be calculated because one or more params are missing.

solution:

Check the params.Use the Users Guide.

16.1.769  Errorcode 2964: Error in formula calculation for test

result

Shortform:

Error formula calc.

Description:

Error in formula calculation for test result.

Problem:

While calculating the values by formulas an error is occurred

solution:

Verify the existence of input values and the formulas used

SIS-MWV_30.docx

Version: 1.5.19608

Page 366 of 477

16.1.770  Errorcode 2965: Wrong acquisition workplace

MES Weaver

Shortform:

Wrong aquis. workpl.

Description:

The test result cant be changed on by this acquisition workplace.

Problem:

The test result cant be changed on by this acquisition workplace, because it was measured by

another workplace.

solution:

Change the test result in context of the original aquisition workplace.

16.1.771  Errorcode 3000: Transaction has already been opened

Shortform:

Transact.alr.open

Description:

Transaction has already been opened.

Problem:

A transaction was attempted to be started although a transaction has already been opened. Nested

transactions are impossible.

solution:

Please correct the processing logic.

16.1.772  Errorcode 3001: No transaction has been opened

Shortform:

No transaction open

Description:

No transaction opened.

Problem:

A transaction was attempted to be finished although no transaction is open.

solution:

Please correct the processing logic.

SIS-MWV_30.docx

Version: 1.5.19608

Page 367 of 477

16.1.773  Errorcode 3002: DLG error in transaction ->

MES Weaver

ROLLBACK

Shortform:

ROLLBACK DLG error

Description:

Errors within the transaction. The changes have been reversed.

Problem:

An error ocurred when processing the data within a transaction. The transaction has been

canceled.

solution:

Please correct the data processed or the processing logic.

16.1.774  Errorcode 3003: Exception: Bapicallexecute: no

handler

Shortform:

Exception: Bapicall

Description:

Exception ocurred when calling a BAPI.

Problem:

Internal error

solution:

Please contact MPDV Support.

16.1.775  Errorcode 3020: Account blocked, logon not possible

Shortform:

Account blocked

Description:

The user account has been blocked!

Problem:

The user account has been blocked. Logon is not possible at the moment.

solution:

Please contact your HYDRA administrator.

SIS-MWV_30.docx

Version: 1.5.19608

Page 368 of 477

MES Weaver

16.1.776  Errorcode 3021: Not possible. User is logged on

Shortform:

User logged on

Description:

Impossible as the user <BEARB> is logged on to client <KONS>.

Problem:

You cannot delete a user account if the user is logged on.

solution:

The user must be logged off before the user account can be deleted

16.1.777  Errorcode 3022: Script file is not available.

Shortform:

Script not available

Description:

Script file is not available.

Problem:

The script file is not available.

solution:

Please restore the script file.

16.1.778  Errorcode 3023: Script has already been released

Shortform:

Scr.alr.released

Description:

Script has already been released.

Problem:

The script has already been released.

solution:

Create a copy of the script.

16.1.779  Errorcode 3024: Syntax error in script file

Shortform:

Syntax error script

SIS-MWV_30.docx

Version: 1.5.19608

Page 369 of 477

MES Weaver

Description:

The script file contains a syntax error.

Problem:

The script file contains a syntax error.

solution:

Correct the script file.

16.1.780  Errorcode 3025: Runtime error in script file

Shortform:

Runtime error script

Description:

The script file contains an error.

Problem:

The script file contains an error that only occurs when the script is started.

solution:

Correct the script file.

16.1.781  Errorcode 3026: Pers at date avail co ■■■■ cc

■■■■■■■■■■

Shortform:

Pers. at date avail.

Description:

The version of this HR master data is already available for this start date.

solution:

When creating a new version of the HR master data a new personnel number or a new validity date

has to be indicated. You can recognize from the other details of the error message which company,

cost center and responsibility area this person is assigned to.

16.1.782  Errorcode 3027: Person ■■■■■■■■ badge overlap

■■■■■■■■

Shortform:

Badge overlap

Description:

Badge overlap due to elongation of previous version of this person.

SIS-MWV_30.docx

Version: 1.5.19608

Page 370 of 477

MES Weaver

Problem:

Deleting this version of this person results in a badge overlap with the badge number of another

person.

solution:

Fierst delete the previous version sof this person or assign an empty badge number or give another

badge number to the aother person.

16.1.783  Errorcode 3028: Label type and alias already exists

Shortform:

Typ and alias exists

Description:

Label type and alias has already been assigned.

Problem:

Label type and alias has already been assigned.

solution:

Enter a not assigned alias name.

16.1.784  Errorcode 3029: Label type is not available

Shortform:

Label type n. avail.

Description:

Label type not available.

Problem:

Label type is not available.

solution:

Please enter a valid label type

16.1.785  Errorcode 3030: Label alias is not available

Shortform:

Label alias n. avail

Description:

Label alias not available.

Problem:

Label alias is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 371 of 477

solution:

Please enter a valid label alias

16.1.786  Errorcode 3031: The data must not be deleted

MES Weaver

Shortform:

Data n.be deleted

Description:

Data cannot be deleted.

Problem:

These data have been marked quenchless by the system.

solution:

The required action cannot be deleted.

16.1.787  Errorcode 3100: Workflow active.Modification

n.possible

Shortform:

Workflow active

Description:

The workflow is active.

Problem:

The workflow is active. Because of this it is not possible to change it.

solution:

Copy the workflow and make changes in the duplicate. Activate the copy, after all changes are

done.

16.1.788  Errorcode 3102: Configuration has not been indicated

Shortform:

Configurat. missing

Description:

Configuration has not been indicated

16.1.789  Errorcode 3104: Event has not been indicated

Shortform:

Event is missing

SIS-MWV_30.docx

Version: 1.5.19608

Page 372 of 477

Description:

Event has not been indicated

16.1.790  Errorcode 3108: Sub event has not been indicated

MES Weaver

Shortform:

Subev.not indicated

Description:

Sub event has not been indicated.

16.1.791  Errorcode 3109: Workflow is used. Modificat.

impossible

Shortform:

Workflow is used

Description:

Workflow is used.

Problem:

Workflow is used. Because of this it is not possible to change it.

solution:

Copy the workflow and make changes in the duplicate. Activate the copy, after all changes are

done.

16.1.792  Errorcode 3200: Invalid or empty resource

Shortform:

Inval.or empty res.

Description:

Invalid or empty resource.

Problem:

No resource or resource reference has been transferred to the dialog.

solution:

A resource number including resource type or a resource ID (reference to resource) has to be

transferred to the dialog.

SIS-MWV_30.docx

Version: 1.5.19608

Page 373 of 477

16.1.793  Errorcode 3201: Resource not available

MES Weaver

Shortform:

Res.not available

Description:

Resource not available.

Problem:

The resource indicated in the dialog is not defined within the resoure stock.

solution:

An existing resource number including resource type or a valid resource ID has to be transferred to

the dialog.

16.1.794  Errorcode 3202: Resource(w/o type)several times

i.stock

Shortform:

Res.sev.times avail.

Description:

Resource(w/o type) is several times in stock.

Problem:

The resource (without resource type) indicated within the dialog has been defined several times

with different resource types within the resource stock .

solution:

Please check the stock or transfer the resource type as 2nd key besides the resource name to the

dialog.

16.1.795  Errorcode 3203: Resource list max. depth reached

Shortform:

Res.list max. depth

Description:

Resource list max. depth reached.

Problem:

At the moment the resource list is limited to 10 levels at most. If this value is exceeded (insertion of

an 11th level) the action will be rejected. Please do not mistake this for parallel resources within

one level.

SIS-MWV_30.docx

Version: 1.5.19608

Page 374 of 477

MES Weaver

solution:

Please check whether it is actually required to create more than 10 BOM levels or whether this is

rather a mistake.

Please contact MPDV if more than 10 BOM levels are required.

16.1.796  Errorcode 3204: Resource already available

Shortform:

Res.alr.available

Description:

Resource already available.

Problem:

The resource indicated in the dialog has already been defined within the resource stock.

solution:

Please check the stock.

16.1.797  Errorcode 3205: Resource could not be created

Shortform:

Res. not created

Description:

Resource could not be created.

Problem:

The new resource indicated in the dialog could not be created wtihin the resource stock.

solution:

Analysis of the HYMW logs to determine the reason. Please note: in case the resource already

exists message 3204 appears.

16.1.798  Errorcode 3210: Invalid or empty resource status

Shortform:

Invalid res.status

Description:

Invalid or empty resource status.

Problem:

No resource status indicated.

solution:

Transfer of a status > 0.

SIS-MWV_30.docx

Version: 1.5.19608

Page 375 of 477

16.1.799  Errorcode 3211: Resource status is not available

MES Weaver

Shortform:

Res.status n.avail.

Description:

Resource status is not available.

Problem:

The status indicated does not go with the resource type/ resource family transferred.

solution:

Please check status assignment.

16.1.800  Errorcode 3212: Resource status is not allowed

Shortform:

Res.status n.allowed

Description:

Resource status is not allowed.

Problem:

At the moment this check is not supported. Therefore, this message cannot appear.

solution:

16.1.801  Errorcode 3213: No release status available

Shortform:

No rel. stat.avail.

Description:

No release status available.

Problem:

At least one status having the property "RELEASED" has to be defined for all resource types, e.g.:

"WNR" (tool). Therefore, the resource types specified by HYDRA already have the status "999".

solution:

A release status has to be defined for the resource type of the resource to be processed. Please

set "processing" flag to "F".

16.1.802  Errorcode 3214: Resource type is not available

Shortform:

Res.type n. avail.

SIS-MWV_30.docx

Version: 1.5.19608

Page 376 of 477

MES Weaver

Description:

Resource type is not available.

Problem:

The indicated resource type has not been defined within the system.

solution:

Definition of the resource type in HYDRA.

16.1.803  Errorcode 3215: Resource family is not available

Shortform:

Res.family n.avail.

Description:

Resource family is not available.

Problem:

The indicated resource family has not been defined within the system.

solution:

Definition of the resource family in HYDRA.

16.1.804  Errorcode 3216: No status available for logging off res.

Shortform:

No l.off s.res.avail

Description:

No status available for logging off resource.

Problem:

When logging resources off from the machine (happens automatically when orders are logged off) it

can be switched to a certain resource status. This status has been defined with "processing" = "B"

at the resource type. If no status is available no status is changed.

solution:

If it is required to switch to a certain resource status when orders are logged off or interrupted a

respectively identified status has to be created.

16.1.805  Errorcode 3217: Product. status f.resource n.available

Shortform:

Prod.st.res.n.avail.

Description:

Production status for resource is not available.

SIS-MWV_30.docx

Version: 1.5.19608

Page 377 of 477

MES Weaver

Problem:

It is impossible to switch to the required status having the ID PROD = <indicated value> as such a

status has not been defined in HYDRA.

solution:

Please create a status with the respective flag "processing" = <indicated value>.

16.1.806  Errorcode 3218: Resource blocked

Shortform:

Resource blocked

Description:

Resource blocked.

Problem:

Resource blocked due to respective status OR collective block

solution:

Please check the status of the resource.

16.1.807  Errorcode 3219: Resource is no DNC resource

Shortform:

Res. no DNC resource

Description:

Resource is no DNC resource.

Problem:

The type of the resource indicated in the dialog is no DNC resource type.

solution:

Please check the resource types for the DNC processing field. This field should not be "K". This

message only appears for DNC dialogs.

16.1.808  Errorcode 3220: Resource scheduled or blocked

Shortform:

Res.sched.or blocked

Description:

Resource scheduled or blocked.

Problem:

The resource has already been logged on and therefore it cannot be logged on once again.

SIS-MWV_30.docx

Version: 1.5.19608

Page 378 of 477

solution:

Please check where the resource has already been logged on to.

16.1.809  Errorcode 3221: Machine has not been indicated

MES Weaver

Shortform:

Mach. not indicated

Description:

Machine has not been indicated.

Problem:

When it comes to an DNC upload the stated machine is checked for plausibility.

solution:

Please enter a valid machine in the dialog.

16.1.810  Errorcode 3222: DNC family has not been stated

Shortform:

DNC fam.not stated

Description:

DNC family has not been stated.

Problem:

When it comes to an DNC upload the stated DNC familiy is checked for plausibility.

solution:

Please enter valid DNC family in the dialog.

16.1.811  Errorcode 3223: Machine and DNC family do not match

Shortform:

Mach+DNCfam.n.match

Description:

Machine and DNC family do not match.

Problem:

When it comes to an DNC upload the entered machine and DNC family are checked for plausibility.

solution:

Please define information on the relationship between machine and DNC family in HYDRA.

SIS-MWV_30.docx

Version: 1.5.19608

Page 379 of 477

16.1.812  Errorcode 3224: Resource cannot be logged on

MES Weaver

Shortform:

Res.n. be logged on

Description:

Resource cannot be logged on.

Problem:

A resource, which is defined as "cannot be logged on", is attempted to be logged on.

solution:

Please check the configuration at the resource type: "When logging OP on also log on".

16.1.813  Errorcode 3225: Status does not allow processing

Shortform:

Res.stat.no process.

Description:

Status does not allow processing.

Problem:

The resource is currently blocked and therefore it cannot be logged on.

solution:

Please unblock the resource.

16.1.814  Errorcode 3226: Res.alr.log.on t.this mach.w.this order

Shortform:

Res.l.on w.mach.+ord

Description:

Res.alr.log.on t.this mach.w.this order.

Problem:

Resource has already been logged on to this machine with this order.

solution:

16.1.815  Errorcode 3227: Res. has been logged on too many

times

Shortform:

Res.l.on too often

SIS-MWV_30.docx

Version: 1.5.19608

Page 380 of 477

MES Weaver

Description:

Res. has been logged on too many times.

Problem:

An anonymous resource is attempted to be logged on more often than it is available within stock.

solution:

If required, please increase its quantity within stock.

16.1.816  Errorcode 3228: resource <RES> has alr. been logged

on

Shortform:

res. alr. logged on

Description:

resource has already been logged on.

Problem:

Resource has already been logged on.

solution:

Please check configuration and to which machine the resource has already been logged on.

16.1.817  Errorcode 3229: Resource has not been logged on

Shortform:

Res.not logged on

Description:

Resource has not been logged on.

Problem:

Resource has not been logged on and is attempted to be logged off.

solution:

16.1.818  Errorcode 3230: End date is smaller than current time

Shortform:

End dat.smaller curr

Description:

End date is smaller than current time.

SIS-MWV_30.docx

Version: 1.5.19608

Page 381 of 477

MES Weaver

Problem:

It is attempted to transfer a date for the future whereas the point in time has already been

exceeded.

solution:

Please check the data.

16.1.819  Errorcode 3231: Resource is active

Shortform:

Resource is active

Description:

Resource is active.

Problem:

Checking whether the resource is inactive fails, i.e. resource is currently being used.

solution:

Please log resource off at another place.

16.1.820  Errorcode 3232: Resource is not active

Shortform:

Resource not active

Description:

Resource is not active.

Problem:

Checking whether resource is active fails, i.e. resource is currently not in use.

solution:

Please log resource on in advance.

16.1.821  Errorcode 3233: There are events for the resource

Shortform:

Res in event_res

Description:

There are events for the resource.

SIS-MWV_30.docx

Version: 1.5.19608

Page 382 of 477

MES Weaver

16.1.822  Errorcode 3235: Maintenance is not yet in threshold

range

Description:

Maintenance has not yet reached the defined threshold value.

16.1.823  Errorcode 3240: Resource type is not editable

Shortform:

Res.type n.editable

Description:

Resource type is not editable.

Problem:

The resource type cannot be changed. It was protected by HYDRA.

solution:

Only HYDRA can change the resource type.

16.1.824  Errorcode 3241: User field key not defined

Shortform:

User f. key n.avail.

Description:

User field key not defined.

Problem:

The stated user field key is not available within HYDRA.

solution:

Please configure user field key in HYDRA.

16.1.825  Errorcode 3242: Resource type is currently being used

Shortform:

Res type is used

Description:

Resource type is currently being used.

Problem:

A resource type is attempted to be deleted but there are still resources of this type.

SIS-MWV_30.docx

Version: 1.5.19608

Page 383 of 477

solution:

Please delete all resources of this type.

16.1.826  Errorcode 3243: Resource family is used

MES Weaver

Shortform:

Res.fam.is used

Description:

Resource family is used.

Problem:

A resource family is attempted to be deleted but there are still resources of this family.

solution:

Please delete all resources of the family.

16.1.827  Errorcode 3244: If changed KENN must have prefix U:

Shortform:

KENN must prefix U:

Description:

If changed KENN must have prefix U:.

Problem:

Customer-specific user fields may only be changed (with prefix "U:").

solution:

This user field type cannot be changed.

16.1.828  Errorcode 3245: prod=F may only exist once per

type/fam.

Shortform:

prod = F only once

Description:

F may only exist once per type/fam..

Problem:

A second status having the flag "processing" = "F" is attempted to be created.

solution:

Please remove the status with the flag "processing" = "F" at first then a new assignment will be

possible.

SIS-MWV_30.docx

Version: 1.5.19608

Page 384 of 477

16.1.829  Errorcode 3246: No header record is available

MES Weaver

Shortform:

No header record

Description:

No header record is available

Problem:

User field configuration has internal error as there is no basic information

solution:

16.1.830  Errorcode 3247: Resource status is in use

Shortform:

Status in use

Description:

Resource status is in use.

Problem:

A resource status is attempted to be deleted but there are still resources having this status.

solution:

Change the statuses of all resources that are still assigned to this status.

16.1.831  Errorcode 3248: Header record of resource is in use

Shortform:

Header rec. in use

Description:

Header record of resource is in use.

Problem:

User field header record is to be deleted but it is still being used.

solution:

Please check the fields assigned to the user field header record.

16.1.832  Errorcode 3249: Copy of itself is not possible.

Shortform:

Copy of itself

SIS-MWV_30.docx

Version: 1.5.19608

Page 385 of 477

MES Weaver

Description:

Copy of itself is not possible.

Problem:

Attempt to copy itself.

solution:

16.1.833  Errorcode 3250: The path is not available

Shortform:

Path not available

Description:

The path is not available.

Problem:

The path specification has not been defined in HYDRA.

solution:

Please define path ID in HYDRA.

16.1.834  Errorcode 3251: Invalid blocking reason

Shortform:

Inv.blocking reason

Description:

Invalid blocking reason.

16.1.835  Errorcode 3252: Invalid measure

Shortform:

Invalid measure

Description:

Invalid measure.

Problem:

The measure is not known within HYDRA.

solution:

Please configure measure in HYDRA.

SIS-MWV_30.docx

Version: 1.5.19608

Page 386 of 477

16.1.836  Errorcode 3253: Resource is still available in BOM

MES Weaver

Shortform:

Resource in BOM

Description:

Resource is still available in BOM

Problem:

Resource can´t be deleted, becaus it is still available in resource list

solution:

Delete the resource list entry first.

16.1.837  Errorcode 3254: Res.is still being used as component

Shortform:

Res. is component

Description:

Res.is still being used as component

Problem:

Resource can´t be deleted, becaus it is still available in component list

solution:

Delete the component list entry first.

16.1.838  Errorcode 3255: Invalid maintenance

Shortform:

Invalid maintenance

Description:

Invalid maintenance.

Problem:

The indicated maintenance has not been recorded within the system.

solution:

Please create maintenance within the system in advance.

16.1.839  Errorcode 3256: Maintenance condition is not allowed

Shortform:

Maint.cond.n.allowed

SIS-MWV_30.docx

Version: 1.5.19608

Page 387 of 477

MES Weaver

Description:

Maintenance status is not allowed.

Problem:

An invalid maintenance status was attempted to be set in the database.

solution:

The maintenance statuses 0 to 3 are allowed.

16.1.840  Errorcode 3257: Resource measure has alr. been

recorded

Shortform:

Measure is used

Description:

Resource measure has alr. been recorded

Problem:

Measure can´t be deleted because it is already in use.

solution:

Active measures can´t be deleted.

16.1.841  Errorcode 3259: Status assignments not configurable

Shortform:

Status n.configurab.

Description:

Status assignments not configurable

16.1.842  Errorcode 3260: DNC file has already been assigned

Shortform:

DNC file invalid

Description:

DNC file has already been assigned

Problem:

Ressource can´t be inserted/updated because the DNC file has already been assigned.

solution:

Use another DNC file.

SIS-MWV_30.docx

Version: 1.5.19608

Page 388 of 477

16.1.843  Errorcode 3261: Resource is still i.maintenance

MES Weaver

calendar

Shortform:

RES i.maint.calendar

Description:

Resource is still i.maintenance calendar

Problem:

Ressource can´t be deleted because it is still in the maintenance calendar.

solution:

Delete the maintenance calendar first.

16.1.844  Errorcode 3262: Maintenance n.possible for resource

type

Shortform:

Maintenance n.poss.

Description:

Maintenance n.possible for resource type

Problem:

Maintenance is not possible for DNC ressources !

solution:

Maintenance is not possible for DNC ressources !

16.1.845  Errorcode 3263: Family status has become invalid

Shortform:

Fam.status invalid

Description:

Status of resource family has become invalid.

Problem:

Through an update of the resource family the status has become invalid !

solution:

Define the current status on the new family or change the resource status to an general status first!

SIS-MWV_30.docx

Version: 1.5.19608

Page 389 of 477

16.1.846  Errorcode 3264: Status alr. assigned for family/type

MES Weaver

Shortform:

Status alr. assigned

Description:

Status has already been assigned for resource family/resource type.

Problem:

Status has already been assigned for resource family/resource type !

solution:

Us a new Status.

16.1.847  Errorcode 3265: Resource-ID is invalid!

Shortform:

Resource-ID invalid!

Description:

Resource-ID is invalid!

Problem:

Resource-ID is invalid!

solution:

Resource-ID is invalid!

16.1.848  Errorcode 3266: Master resource already exists

Shortform:

Master res. exists

Description:

Master resource already exists.

Problem:

Master resource already exists.

solution:

Please choose another master resource.

16.1.849  Errorcode 3267: Parent and child are master resources

Shortform:

Two master resources

SIS-MWV_30.docx

Version: 1.5.19608

Page 390 of 477

MES Weaver

Description:

Parent and child are master resources.

Problem:

Parent and child are master resources

solution:

Please choose another master resource for parent or child.

16.1.850  Errorcode 3270: Max. no. of fast USRFLD reached

Shortform:

Max. number reached

Description:

Max. no. of fast USRFLD reached

Problem:

Internal error message.

solution:

-

16.1.851  Errorcode 3271: N.possible, entry is still being used

Shortform:

Entry is still used

Description:

Impossible - entry is still being used.

Problem:

The action cannot be carried out as the data are still being used.

solution:

Please make sure that the data are not used any longer and repeat the action.

16.1.852  Errorcode 3272: N.possible,year model is factory

calend.

Shortform:

Year mod.fact.calend

Description:

Impossible - year model has been defined as factory calendar.

SIS-MWV_30.docx

Version: 1.5.19608

Page 391 of 477

MES Weaver

Problem:

This year model is defined as a factory calender, and can not be deleted if it is valid for the current

year.

16.1.853  Errorcode 3273: N.possible-processing SYSTEM entry

Shortform:

SYSTEM entry

Description:

Impossible - a reason can either be assigned to SYSTEM or to a user-defined number of machines.

16.1.854  Errorcode 3274: Password must not contain user name

Shortform:

Password not allowed

Description:

Password must not include user name.

Problem:

According to password guidelines the password must not include user name.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.855  Errorcode 3275: Password contains insufficient letters

Shortform:

Password not allowed

Description:

Password contains insufficient letters.

Problem:

According to password guidelines the password contains insufficient letters.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.856  Errorcode 3276: Password contains insufficient

numbers

Shortform:

Password not allowed

SIS-MWV_30.docx

Version: 1.5.19608

Page 392 of 477

MES Weaver

Description:

Password contains insufficient numbers.

Problem:

According to password guidelines the password contains insufficient numbers.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.857  Errorcode 3277: Passw.contains

insuffic.spec.characters

Shortform:

Password not allowed

Description:

Password contains insufficient special characters.

Problem:

According to password guidelines the password contains insufficient special characters.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.858  Errorcode 3278: Password is altogether too short

Shortform:

Password not allowed

Description:

Password is altogether too short.

Problem:

According to password guidelines the password is too short.

solution:

Enter an longer password or contact your HYDRA administrator.

16.1.859  Errorcode 3279: Password contains invalid characters

Shortform:

Password not allowed

Description:

Password contains invalid characters.

SIS-MWV_30.docx

Version: 1.5.19608

Page 393 of 477

MES Weaver

Problem:

According to password guidelines the password contains invalid characters.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.860  Errorcode 3280: Password violates password history

Shortform:

Password not allowed

Description:

Password violates password history.

Problem:

According to password guidelines the entered password was used before and cannot be used

again.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.861  Errorcode 3281: Password history is not available

Shortform:

Passw.hist.n.avail.

Description:

Password history is not available.

Problem:

Internal error when accessing password history

solution:

Please contact MPDV Support.

16.1.862  Errorcode 3282: Password has expired

Shortform:

Password expired

Description:

Password has expired.

Problem:

Your password has expired.

SIS-MWV_30.docx

Version: 1.5.19608

Page 394 of 477

solution:

Change your password

16.1.863  Errorcode 3283: Password must be changed!

MES Weaver

Shortform:

Change password!

Description:

Password has to be changed!

Problem:

The entered password is the same as the actual one.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.864  Errorcode 3284: Bill of material level is invalid

Shortform:

BOM level is invalid

Description:

BOM level is invalid!

Problem:

BOM level is invalid. Please check correct level.

16.1.865  Errorcode 3285: Cutting plan not found for order

Shortform:

Cutt.plan.not avail.

Description:

Cutting plan has not been found for the order.

16.1.866  Errorcode 3286: Overall width of web distrib.too small

Shortform:

Width too small

Description:

Overall width of cutting plan too small

SIS-MWV_30.docx

Version: 1.5.19608

Page 395 of 477

16.1.867  Errorcode 3287: Parent OP is already available

MES Weaver

Shortform:

Par.OP alr.available

Description:

Parent OP is already available.

16.1.868  Errorcode 3288: Cutting plan is already active

Shortform:

Cutt.plan.alr.active

Description:

Cutting plan is already active!

16.1.869  Errorcode 3299: Material component not found for OP

Shortform:

Invalid component

Description:

Material component has not been found for OP.

Problem:

Material component of the OP is missing.

16.1.870  Errorcode 3300: Assignment code must show the value

NUM

Shortform:

Assignm.code <> NUM

Description:

The assignment code must show the value NUM.

Problem:

The assignment code must show the value NUM.

solution:

Change the assignment code

SIS-MWV_30.docx

Version: 1.5.19608

Page 396 of 477

16.1.871  Errorcode 3301: No. is not within the defined range

MES Weaver

Shortform:

FROM<No or No>TO

Description:

The number is not within the defined range.

Problem:

The number is not within the defined range.

solution:

Enter the correct number

16.1.872  Errorcode 3302: Number starts with wrong prefix

Shortform:

Prefix not OK

Description:

The number starts with a wrong prefix.

Problem:

The number starts with a wrong prefix.

Lösung:

Enter the correct prefix

16.1.873  Errorcode 3303: Generat.type P does not generate a

No.

Shortform:

Generation type P

Description:

The generation type P does not generate a number.

Problem:

The generation type P does not generate a number.

solution:

-

SIS-MWV_30.docx

Version: 1.5.19608

Page 397 of 477

16.1.874  Errorcode 3304: Active template must not be deleted

MES Weaver

Shortform:

Active not deletable

Description:

Active template must not be deleted.

Problem:

Active template must not be deleted.

solution:

Please deactivate the template before deleting it

16.1.875  Errorcode 3400: Parameter InstID not indicated

Shortform:

Inst. canceled

Description:

Parameter InstID has not been indicated.

Problem:

The installation id has not been indicated.

solution:

-

16.1.876  Errorcode 3401: Installation path not created

Shortform:

Inst. canceled

Description:

Installation path has not been created.

Problem:

The installation path has not been created.

solution:

-

16.1.877  Errorcode 3402: Media path not created

Shortform:

Inst. canceled

SIS-MWV_30.docx

Version: 1.5.19608

Page 398 of 477

MES Weaver

Description:

Media path has not been created.

Problem:

The media path has not been created.

solution:

-

16.1.878  Errorcode 3403: Backup path could not be created

Shortform:

Inst. canceled

Description:

Backup path could not be created.

Problem:

The backup path could not be created.

solution:

-

16.1.879  Errorcode 3404: Files have already been installed

Shortform:

Inst. canceled

Description:

Files have already been installed.

Problem:

This update has already been installed.

solution:

-

16.1.880  Errorcode 3405: Log file could not be created

Shortform:

Inst. canceled

Description:

Log file could not be created.

Problem:

The log file could not be created.

SIS-MWV_30.docx

Version: 1.5.19608

Page 399 of 477

solution:

-

16.1.881  Errorcode 3406: Source could not be opened

MES Weaver

Shortform:

Inst. canceled

Description:

Source could not be opened.

Problem:

The source directory could not be opened.

solution:

-

16.1.882  Errorcode 3420: Do not delete or change stand. config.

Shortform:

Don't change st.conf

Description:

Standard configuration can neither be deleted nor changed.

16.1.883  Errorcode 3421: Do not delete standard configuration

Shortform:

Don't delete st.conf

Description:

Do not delete standard configuration

16.1.884  Errorcode 3430: Invalid signature 1 or level 1

Shortform:

Invalid sig./level 1

Description:

Invalid signature 1 or level 1.

Problem:

The entered signature 1 or level 1 are invalid.

solution:

Please enter a valid signature 1 or level 1.

SIS-MWV_30.docx

Version: 1.5.19608

Page 400 of 477

16.1.885  Errorcode 3431: Invalid signature 2 or level 2

MES Weaver

Shortform:

Invalid sig./level 2

Description:

Invalid signature 2 or level 2

Problem:

The entered signature 2 or level 2 are invalid.

solution:

Please enter a valid signature 2 or level 2.

16.1.886  Errorcode 3432: Invalid sig.1 and 2 or level 1 and 2

Shortform:

Inv.sig./level 1+2

Description:

Invalid signature 1 and 2 or level 1 and 2.

Problem:

The entered signatures or levels are invalid.

solution:

Please enter two valid pairs of signatures/levels.

16.1.887  Errorcode 3433: Input for action necessary

Shortform:

Input necessary

Description:

Input is necessary for the action in order to be able to document this one.

Problem:

The action can only be carried out if it is documented

16.1.888  Errorcode 3434: No dialog data extisting

Shortform:

No dialog data

Description:

As no dialog data have been recorded it is impossible to restore them.

SIS-MWV_30.docx

Version: 1.5.19608

Page 401 of 477

16.1.889  Errorcode 3500: Invalid processing flag

MES Weaver

Shortform:

Inv.processing flag

Description:

Invalid processing flag has been entered.

Problem:

The entered processing flag is invalid.

solution:

Please enter a valid processing flag.

16.1.890  Errorcode 3501: Invalid variant

Shortform:

Invalid variant

Description:

Variant does not exist within customer name space.

Problem:

Variant does not exist within customer name space.

solution:

Please use the prefix U: for customer specific variants.

16.1.891  Errorcode 3502: Invalid BAPI-POS

Shortform:

Invalid BAPI-POS

Description:

Invalid BAPI-POS entered.

Problem:

Invalid BAPI-Position entered.

solution:

Please enter a valid BAPI-Position.

16.1.892  Errorcode 3503: Invalid field position

Shortform:

Invalid FIELD-POS

SIS-MWV_30.docx

Version: 1.5.19608

Page 402 of 477

MES Weaver

Description:

Invalid field position has been entered.

Problem:

Invalid field position entered.

solution:

Please enter a valid field position.

16.1.893  Errorcode 3504: Invalid formula position

Shortform:

Invalid EXPR-POS

Description:

Invalid formula position has been entered.

Problem:

Invalid formula position entered.

solution:

Please enter a valid formula position.

16.1.894  Errorcode 3505: Invalid basic configuration

Shortform:

Invalid bas.config.

Description:

Invalid basic configuration has been entered.

Problem:

The entered basic configuration does not exist.

solution:

Please enter an existing basic configuration.

16.1.895  Errorcode 3506: Invalid segment configuration

Shortform:

Invalid segm.config.

Description:

Invalid segment configuration has been entered.

Problem:

The entered segment configuration does not exist.

SIS-MWV_30.docx

Version: 1.5.19608

Page 403 of 477

solution:

Please enter an existing segment configuration.

16.1.896  Errorcode 3507: Invalid field configuration

MES Weaver

Shortform:

Inval.field config.

Description:

There is no field configuration.

Problem:

The entered field configuration does not exist.

solution:

Please enter an existing field configuration.

16.1.897  Errorcode 3508: Invalid conversion function

Shortform:

Inv.conversion fct.

Description:

There is no conversion function.

Problem:

The entered conversion function does not exist.

solution:

Please enter an existing conversion function.

16.1.898  Errorcode 3509: Acronym has already been assigned

Shortform:

Invalid acronym

Description:

Acronym has already been assigned.

Problem:

The entered Acronym is already in user.

solution:

Please enter an other Acronym name.

SIS-MWV_30.docx

Version: 1.5.19608

Page 404 of 477

16.1.899  Errorcode 3510: Invalid formula

MES Weaver

Shortform:

Invalid formula

Description:

Invalid formula indicated.

Problem:

The entered formula does not exist.

solution:

Please enter an existing formula.

16.1.900  Errorcode 3511: Invalid transaction flag

Shortform:

Inv.transaction flag

Description:

Invalid transaction flag entered.

Problem:

Invalid transaction flag entered.

solution:

Use I or O for the transaction flag.

16.1.901  Errorcode 3512: Transact.not avail.or not yet

processed

Shortform:

Transact.n.processed

Description:

Transaction not available or not yet processed.

Problem:

The current transaction status does not allow an reset.

solution:

Only processed transactions can be resetted.

SIS-MWV_30.docx

Version: 1.5.19608

Page 405 of 477

16.1.902  Errorcode 3513: Transaction archived or not available

MES Weaver

Shortform:

Transact. archived

Description:

Transaction has already been archived or is not available.

Problem:

The transaction can´t be resetted because it is already archived.

solution:

Archived transactions can´t be resetted.

16.1.903  Errorcode 3514: Initial download is not allowed.

Shortform:

Init down. n.a.

Description:

Initial download is not allowed.

Problem:

Initial download can not be performed because the INI configuration is not available or inactive.

solution:

Check the SAP INI configuration with key ACTIVE_UNTIL.

16.1.904  Errorcode 3602: Main OP defined several times

Shortform:

Main OP multiple

Description:

Main OP has been defined several times!

16.1.905  Errorcode 3603: Cut number has been defined

sev.times

Shortform:

Cut no. multiple

Description:

Cut number has been defined several times!

SIS-MWV_30.docx

Version: 1.5.19608

Page 406 of 477

16.1.906  Errorcode 3604: Sum of cut widths > overall width

MES Weaver

Shortform:

Cut widths too large

Description:

Sum of cut widths > Overall width!

16.1.907  Errorcode 3605: Active orders cannot be changed

Shortform:

Active n.alterable

Description:

Active orders cannot be changed!

16.1.908  Errorcode 3606: No header rec. available for cut layout

Shortform:

No header rec.avail.

Description:

There is no header record for the cutting layout!

16.1.909  Errorcode 3608: Cutting plan alr.avail. for order

Shortform:

Cutt.plan alr.avail.

Description:

Cutting plan is already available for the order!

16.1.910  Errorcode 3612: Batch has alr.been packed in container

Shortform:

Batch alr. packed

Description:

Batch has already been packed in container!

16.1.911  Errorcode 3613: Batch has already been deleted

Shortform:

Batch is deleted

SIS-MWV_30.docx

Version: 1.5.19608

Page 407 of 477

Description:

Batch has already been deleted!

16.1.912  Errorcode 3631: Material width of batch is too small

MES Weaver

Shortform:

Inv.material width

Description:

Material width of batch is too small

Problem:

Material width of batch is too small for logging on at OP.

solution:

Please check the width of the batch or the cutting plan of the OP.

16.1.913  Errorcode 3636: Batch is blocked due to quality

reasons

Shortform:

Batch is blocked

Description:

Batch is blocked due to quality reasons

16.1.914  Errorcode 3638: Article not allowed for package

Shortform:

Article wrong

Description:

Article not allowed for package

16.1.915  Errorcode 3639: Roll width not allowed for package

Shortform:

Roll width wrong

Description:

Roll width not allowed for package

SIS-MWV_30.docx

Version: 1.5.19608

Page 408 of 477

16.1.916  Errorcode 3640: Order not allowed for package

MES Weaver

Shortform:

Order wrong

Description:

Order not allowed for package

16.1.917  Errorcode 3645: The user password expires

Shortform:

Password expires

Description:

The user password expires in <PWD:VALIDTG> days!

Problem:

The user password expires in a few days.

solution:

Assign a new password

16.1.918  Errorcode 3646: Signature(s) required

Shortform:

Signature required

Description:

Signature(s) required.

Problem:

This action can only be carried out if it is signed

solution:

Enter a valid signature or contact the Hydra administrator

16.1.919  Errorcode 3647: Higher authorization level required

Shortform:

Higher auth.lev.req.

Description:

Higher authorization level required.

Problem:

You do not have the authorization level, which is needed for the required signature

SIS-MWV_30.docx

Version: 1.5.19608

Page 409 of 477

16.1.920  Errorcode 3648: Signature invalid

MES Weaver

Shortform:

Signature invalid

Description:

Signature invalid.

Problem:

Entered signature is invalid

solution:

Enter a valid signature or contact the Hydra administrator

16.1.921  Errorcode 3649: Invalid error code

Shortform:

Invalid error code

Description:

Invalid error code

Problem:

An invalid error code has been recorded during posting.

solution:

All error codes have to be defined with the type "L" the reasons configuration at the HYDRA client.

16.1.922  Errorcode 3650: Material availability exceeded

Shortform:

Mat.n.sufficient

Description:

Material availability exceeded.

Problem:

The quantity of input material is not sufficient for the production during posting.

solution:

Please change input batch or quantity.

SIS-MWV_30.docx

Version: 1.5.19608

Page 410 of 477

16.1.923  Errorcode 3653: The handling unit has assigned

MES Weaver

batches

Shortform:

HU has assig.batches

Description:

The actual handling unit has still assigned batches

Problem:

This OP cannot be logged off because the actual handling unit has still assigned batches.

solution:

Please make sure that the actual handling unit (output batch) has to complete before log off order.

16.1.924  Errorcode 3654: No batches have been assigned to HU

Shortform:

Handl. unit is empty

Description:

The actual handling unit could not complete without assigned batches.

16.1.925  Errorcode 3655: Batch is not assigned to handling unit

Shortform:

Batch is n. assigned

Description:

The batch is not assigned to the actual handling unit.

16.1.926  Errorcode 3656: Quantity of batch has alr. been

recorded

Shortform:

Batch alr. recorded

Description:

The quantity of the batch has already been recorded.

Problem:

The batch has already been recorded.

solution:

Please check status of the batch.

SIS-MWV_30.docx

Version: 1.5.19608

Page 411 of 477

16.1.927  Errorcode 3657: Unplaned Material is not allowed

MES Weaver

Shortform:

Unpl.Mat. n. allowed

Description:

Unplaned Material is not allowed in this machine status.

Problem:

When logging a batch on it is detected that the material is not planned within the material list of the

operation an the machine status do not allow the log on.

solution:

Check the configuration of maschine status.

16.1.928  Errorcode 3658: Scrap quantity for batch not allowed

Shortform:

Inadmiss. scrap qty.

Description:

Batch has still yield.

Problem:

Scrap quantity is not allowed because batch has still yield.

solution:

Please check your input

16.1.929  Errorcode 3659: There is no serial number for quantity

Shortform:

No serial number

Description:

The quantity has booked without serial number.

Problem:

The quantity has booked without serial number.

solution:

Please check your input

16.1.930  Errorcode 3660: Serial number is blocked

Shortform:

Serial numb. blocked

SIS-MWV_30.docx

Version: 1.5.19608

Page 412 of 477

MES Weaver

Description:

Serial number is blocked

Problem:

The batch of the Serial number is blocked

solution:

Please check your input

16.1.931  Errorcode 3661: Webservice communication error

Shortform:

WS comm. error

Description:

The Webservice communication with the external system is faulty.

Problem:

There is no connection to the external system via Webservice.

solution:

Please check the configuration of the Webservice.

16.1.932  Errorcode 3662: Material reservation is not planned

Shortform:

Mat.res. n. planned

Description:

Material reservation has not been planned.

Problem:

When logging a batch on it is detected that the material reservation is not planned within the

material reservation list of the operation.

solution:

Check the material reservation list in your system or log another batch on.

16.1.933  Errorcode 3663: Material for BOM cannot be logged on

Shortform:

BOM already active

Description:

Material cannot be logged on for bill of material.

SIS-MWV_30.docx

Version: 1.5.19608

Page 413 of 477

MES Weaver

Problem:

A batch has already been logged on for an input material.

solution:

Log the batch that is already active for the material off.

16.1.934  Errorcode 3664: The working status not exist

Shortform:

Workstatus not exist

Description:

The working status does not exist.

Problem:

Please insert an valid working status (seetable mpl_status_zuord)

solution:

Please insert an valid working status (seetable mpl_status_zuord)

16.1.935  Errorcode 3665: Material type n. available

Shortform:

Mat.type n.avail.

Description:

Material type not available.

Problem:

Material type not available.

solution:

Please insert a correct material type.

16.1.936  Errorcode 3666: Input material consumed!

Shortform:

In.mat cons.

Description:

The input material has been consumed.

Problem:

The total quantity of output material exceeds the still available quantity of one of the registered

input materials of the operation.

SIS-MWV_30.docx

Version: 1.5.19608

Page 414 of 477

MES Weaver

solution:

Enter less output material or change the input batch before, in order to have a sufficient amount of

input material available. If the booking is intended please activate the mandatory posting option.

16.1.937  Errorcode 3667: Coilno. not assigned

Shortform:

Coilno. not assigned

Description:

Coilno. not assigned.

Problem:

Coilno. not assigned.

solution:

Please insert a correct coilno..

16.1.938  Errorcode 3668: OP has no box quantity

Shortform:

no box quantity

Description:

OP has no box quantity.

Problem:

OP has no box quantity.

solution:

Please configure op .

16.1.939  Errorcode 3669: ATK double scan

Shortform:

ATK double scan.

Description:

ATK double scan.

Problem:

ATK double scan.

solution:

Please scan not the same ATK.

SIS-MWV_30.docx

Version: 1.5.19608

Page 415 of 477

16.1.940  Errorcode 3702: Operation not available

MES Weaver

Shortform:

OP not available

Description:

Operation is not available.

Problem:

An operation, which does not exist within the HYDRA dataset, is attempted to be logged on.

solution:

Please check whether the number entered is correct. At the MOC within the order overview it can

be checked whether an operation exists in HYDRA.

16.1.941  Errorcode 3704: Exclusion list contains password

Shortform:

Password not allowed

Description:

Password is included in exclusion list.

Problem:

The password you entered is not allowed, because the password is in the exclusion list.

solution:

Enter an other password or contact your HYDRA administrator.

16.1.942  Errorcode 3705: The password is not correct

Shortform:

Wrong password

Description:

The password is incorrect.

Problem:

The entered old password is not correct.

solution:

Check your input

16.1.943  Errorcode 3706: annotation too long

Shortform:

annotaiton too long

SIS-MWV_30.docx

Version: 1.5.19608

Page 416 of 477

MES Weaver

Description:

The entered comment is too long (250 characters at most)

16.1.944  Errorcode 4000: PCC: Load Driver

Shortform:

PCC: Load Driver

Description:

Error in loading a driver (PCC).

16.1.945  Errorcode 4001: PCC: Channel not configured

Shortform:

PCC: Ch. not config.

Description:

Channel has not been configured (PCC).

16.1.946  Errorcode 4002: PCC: Channel Write Error

Shortform:

PCC: Ch. Write Error

Description:

Write error of channel (PCC).

16.1.947  Errorcode 4003: PCC: Channel Read Error

Shortform:

PCC: Ch. Read Error

Description:

Read error of channel (PCC).

16.1.948  Errorcode 4004: PCC: Channel not active

Shortform:

PCC: Ch. not active

Description:

Channel is inactive (PCC).

SIS-MWV_30.docx

Version: 1.5.19608

Page 417 of 477

MES Weaver

16.1.949  Errorcode 4005: PCC: Error event

Shortform:

PCC: Error event

Description:

Driver reports error to PCC.

16.1.950  Errorcode 4100: workplace Ressource cant be logged

off

Shortform:

no ressource logoff

Description:

The machine-related resource cannot be logged off as a higher-level machine-related resource is

still logged on to the machine.

16.1.951  Errorcode 4101: Requirement Ressource in parts list

Shortform:

Req.Res. in STKL

Description:

Requirement Ressource in parts list

Problem:

The stated reference ressource is in parts list.

solution:

Reference ressource can´t be in parts list. Delete the parts list entry first.

16.1.952  Errorcode 4102: assigned resource is invalid

Shortform:

assign. res. invalid

Description:

assigned resource is invalid

Problem:

You have tried to assign an anonym- or a further Requirement-Ressource to an Requirement-

Ressource.

solution:

Anonym- or Requirement-Ressources can not be assigned to Requirement-Ressources.

SIS-MWV_30.docx

Version: 1.5.19608

Page 418 of 477

16.1.953  Errorcode 4103: res. is not defined as req. resource

MES Weaver

Shortform:

res. not req. res.

Description:

res. is not defined as req. resource

Problem:

You have tried to assign ressource to a normal ressource as a requirement.

solution:

Only Requirement-Ressources are valid for this configuration.

16.1.954  Errorcode 4104: invalid reference resource

Shortform:

inv. ref. resource

Description:

invalid reference resource

Problem:

The stated reference ressource ist not valid.

solution:

Use a reference ressource which is scheduled on the order.

16.1.955  Errorcode 4105: no free explicit ressource

Shortform:

no free expl. res.

Description:

no free explicit ressource

Problem:

For the explicit resource registrition is no free explicit ressource available

solution:

Log off another explicit resource first.

16.1.956  Errorcode 4106: ressource has no explicit booking

Shortform:

res. is not explicit

SIS-MWV_30.docx

Version: 1.5.19608

Page 419 of 477

MES Weaver

Description:

ressource has no explicit booking

Problem:

The stated resource is not configured for explicit bookings

solution:

Configure the ressource for explicit bookings

16.1.957  Errorcode 4107: Requirement ressource cant be logged

on

Shortform:

req. res. n. log. on

Description:

Requirement ressource cant be logged on

Problem:

You have tried to log on a requirement ressource

solution:

Requirement Resources cant be logged on

16.1.958  Errorcode 4108: Ressource already referenced

Shortform:

res. already refer.

Description:

Ressource already referenced

Problem:

The stated resource is already by logged on as a reference

solution:

log off the referencing ressource first.

16.1.959  Errorcode 4109: Missing logons for req. ressource

Shortform:

req. res. missing

Description:

Missing logons for req. ressource

SIS-MWV_30.docx

Version: 1.5.19608

Page 420 of 477

MES Weaver

Problem:

Requirement Ressources is not enough logged on

solution:

Log on all required resources

16.1.960  Errorcode 4110: Resource is a req. resource assigned

Shortform:

Res. in BEDRESZUORD

Description:

Resource is a req. resource assigned

16.1.961  Errorcode 4111: Invalid maintenance duration

Shortform:

Invalid duration

Description:

Invalid maintenance duration

16.1.962  Errorcode 4112: Invalid maintenance quantity

Shortform:

Invalid quantity

Description:

Invalid maintenance quantity

16.1.963  Errorcode 4113: No activ maintenance notification

Shortform:

N.atc.m.n.

Description:

No activ maintenance notification

16.1.964  Errorcode 4114: Could not create maintenance number

Shortform:

no m. number

Description:

Could not create maintenance number

SIS-MWV_30.docx

Version: 1.5.19608

Page 421 of 477

16.1.965  Errorcode 4115: Could not create a maintenance order

MES Weaver

Shortform:

no m. order

Description:

Could not create a maintenance order

16.1.966  Errorcode 4116: IH number not available

Shortform:

IHNR not available

Description:

IH number not available

Problem:

The IH number does not exist within the HYDRA dataset.

solution:

Please check whethter the entered number is correct.

16.1.967  Errorcode 4117: Cavity assignment to resource is

invalid

Shortform:

assign. invalid

Description:

Cavity assignment to resource is invalid

Problem:

Missing cavity assignment to ressource

solution:

Assign cavity to the ressource

16.1.968  Errorcode 4118: Status type is reserved for the system

Shortform:

Status type reserved.

Description:

Status type invalid.

SIS-MWV_30.docx

Version: 1.5.19608

Page 422 of 477

MES Weaver

Problem:

The indicated status type is reserved for the system (MST, RESSTA, ...).

solution:

Use an other name for the status type.

16.1.969  Errorcode 4119: Status type does not exist

Shortform:

Status type n. exist.

Description:

Status does not exist.

Problem:

The indicated ressource status type does not exist for ressource_type/family.

solution:

Use an existing status type or create a new one.

16.1.970  Errorcode 4120: Status text is invalid

Shortform:

Status invalid.

Description:

Status text is invalid.

Problem:

The indicated ressource status text does not exist for ressource_type/family/status_text.

solution:

Use an existing status type or create a new one.

16.1.971  Errorcode 4121: Combination RES/RESFAM is invalid

Shortform:

Combination invalid.

Description:

Combination RES/RESFAM is invalid

Problem:

The indicated combination ressource/ressource family is invalid.

solution:

Indicate either ressource or ressource family, not both at the same time.

SIS-MWV_30.docx

Version: 1.5.19608

Page 423 of 477

16.1.972  Errorcode 4122: Download ist not possible

MES Weaver

Shortform:

Download not poss.

Description:

Download of the DNC resource is not possible.

Problem:

Download of the DNC resource is not possible.

solution:

Check the status of the DNC resource.

16.1.973  Errorcode 4123: Upload ist not possible

Shortform:

Upload not poss.

Description:

Upload of the DNC resource is not possible.

Problem:

Upload of the DNC resource is not possible.

solution:

Terminal / PCC was offline, but must be online.

16.1.974  Errorcode 4124: stroke booking is not possible

Shortform:

strokes not poss.

Description:

ressource has no explicit booking of strokes

Problem:

The resource type is not configured for explicit bookings of stokes

solution:

Configure the ressource for explicit bookings of strokes

16.1.975  Errorcode 4200: data already reloaded

Shortform:

data alr. reloaded

SIS-MWV_30.docx

Version: 1.5.19608

Page 424 of 477

MES Weaver

Description:

Die Reloaddaten befinden sich bereits im Reloadbereich

16.1.976  Errorcode 4201: data already reloaded

Shortform:

data alr. reloaded

16.1.977  Errorcode 4202: cannot open reloadfile

Shortform:

cannot open relfile

16.1.978  Errorcode 4203: Error exporting file to customer dir.

Shortform:

export error

16.1.979  Errorcode 4204: Error reading metadata

Shortform:

error in metadata

16.1.980  Errorcode 7000: Resource is in use!

Shortform:

Resource in use

Description:

Resource is being used!

Problem:

The ressource is being used!

solution:

-

16.1.981  Errorcode 7003: The filename of the image is too long.

Shortform:

Filename to long.

SIS-MWV_30.docx

Version: 1.5.19608

Page 425 of 477

MES Weaver

Description:

Problem:

The file name of the picture is too long. Only files, whose file names including extension do not

exceed a maximum of 12 characters, may be assigned.

solution:

-

16.1.982  Errorcode 7004: Temporary users are not alterable.

Shortform:

Temporary user.

Description:

Problem:

The user is a temporary user. Such users are not manually alterable.

solution:

-

16.1.983  Errorcode 7005: Autologin user manually login

forbidden

Shortform:

Autologin user error

Description:

Autologin user can not perform a manually login.

Problem:

The user is a autologin user. Such users can not perform a manually login via username and

password. Only auto login without username and password is supported.

solution:

-

16.1.984  Errorcode 7007: Person has no qualification for OP

Shortform:

No qualification

Description:

The operation can not be logged on, because the person has not the necessary qualification.

SIS-MWV_30.docx

Version: 1.5.19608

Page 426 of 477

MES Weaver

Problem:

Operations can only be logged on by persons, who own the the qualification of the operation.

solution:

Assign a valid qualification to the person, consider the period and activate (field ranking order) the

assignement.

16.1.985  Errorcode 7008: Logged on person no qualification for

OP

Shortform:

No qualification

Description:

The operation can not be logged on, because there are persons logged on, who do not own the

necessary qualification.

Problem:

Operations can only be logged, when all logged on persons do own the the qualification of the

operation.

solution:

Assign a valid qualification to the logged on persons, consider the period and activate (field ranking

order) the assignement.

16.1.986  Errorcode 7009: Person no qualification for logged on

OP

Shortform:

No qualification

Description:

The person can not be logged on, because the person has not the necessary qualification for the

logged on operations.

Problem:

Persons can only be logged on, when they own the the qualification of the logged on operations.

solution:

Assign the necessary valid qualification to the person, consider the period and activate (field

ranking order) the assignement.

SIS-MWV_30.docx

Version: 1.5.19608

Page 427 of 477

16.1.987  Errorcode 7010: Clearing without posting is not

MES Weaver

possible

Shortform:

Clearing n. possib

Description:

Clearing without posting is not possible.

16.1.988  Errorcode 7011: Change of Batch Number is not

allowed

Shortform:

Ch. Batch n. allowed

Description:

It is not allowed to change the Batch Number

16.1.989  Errorcode 7012: Duplicate component not allowed.

Shortform:

Dupl. Comp.n. allow.

Description:

Component is not set for automatic duplication.

Problem:

Component is not set for automatic duplication.

solution:

Set component user field 31 = Y

16.1.990  Errorcode 7013: Carrier status not (2) EMPTY

Shortform:

Carrier not empty

Description:

Carrier status not (2) empty

Problem:

Carriers have to be empty to be used for packing.

solution:

Force carrier status EMPTY via terminal dialog or set carrier status manually.

SIS-MWV_30.docx

Version: 1.5.19608

Page 428 of 477

MES Weaver

16.1.991  Errorcode 7014: Original booking is canceled

Shortform:

Booking is canceled

Description:

Original booking has already been canceled

Problem:

Original booking has already been canceled and can not be changed

solution:

Insert a new booking.

16.1.992  Errorcode 7015: Reversal booking not editable.

Shortform:

Reversalbooking

Description:

A reversal booking can not be changed.

Problem:

A reversal booking can not be changed.

solution:

A reversal booking can not be changed.

16.1.993  Errorcode 7016: Booking is canceled and not editable.

Shortform:

Booking is canceled,

Description:

Booking is canceled and not editable.

Problem:

Booking is canceled and not editable.

solution:

Insert a new booking.

16.1.994  Errorcode 7017: Debited bookings are not editable.

Shortform:

Debited booking n.e.

SIS-MWV_30.docx

Version: 1.5.19608

Page 429 of 477

MES Weaver

Description:

Debited bookings are not editable.

Problem:

The booking was created by the debiting and can not be changed.

solution:

The booking was created by the debiting and can not be changed.

16.1.995  Errorcode 7018: Wrong workplace, no allocated time.

Shortform:

w. workplace.

Description:

Wrong workplace, no allocated time.

Problem:

The Sign in at the workstation is not possible.

solution:

The Sign in at the workstation is not possible.

16.1.996  Errorcode 7019: Possibly teamwork!

Shortform:

p. teamwork!

Description:

Possibly teamwork!

16.1.997  Errorcode 7020: One/more previous AGs are not

complete

Shortform:

Prev. AGs n. compl.

Description:

One or more previous AGs are not complete.

16.1.998  Errorcode 7021: AG already been registered in package

Shortform:

AG already reg.

SIS-MWV_30.docx

Version: 1.5.19608

Page 430 of 477

Description:

The AG has already been registered in the package.

16.1.999  Errorcode 7022: AG has wrong time type specification.

MES Weaver

Shortform:

w. specification.

Description:

AG has wrong time type specification.

16.1.1000 Errorcode 7023: No package registered on the

machine.

Shortform:

n. package reg.

Description:

No package was registered on the machine.

16.1.1001 Errorcode 7024: Entry is enabled.

Shortform:

Entry is enabled.

Description:

Entry is already enabled.

16.1.1002 Errorcode 7025: Error by calculating remaining effort

Shortform:

Err remaining effort

Description:

Error by calculating the new remaining effort.

16.1.1003 Errorcode 7026: Workflow could not be started.

Shortform:

Workflow n. started

Description:

Workflow could not be started.

SIS-MWV_30.docx

Version: 1.5.19608

Page 431 of 477

MES Weaver

16.1.1004 Errorcode 7027: Component not reserved.

Shortform:

Component n. reserved

Description:

The material component has not been reserved.

16.1.1005 Errorcode 7028: Target qty. smaller than loaded. qty.

Shortform:

targ.qty. too small

Description:

Target quantity smaller than loaded quantity

16.1.1006 Errorcode 7029: No melting aggregate found

Shortform:

no melt. aggregate

Description:

No melting aggregate found

16.1.1007 Errorcode 7030: No melting operation found

Shortform:

no melting op.

Description:

No melting operation found

16.1.1008 Errorcode 7031: No preceding operation found

Shortform:

no preceding op.

Description:

No preceding operation found

16.1.1009 Errorcode 7032: Melting operation already assigned

Shortform:

Melt. op. assigned

SIS-MWV_30.docx

Version: 1.5.19608

Page 432 of 477

MES Weaver

Description:

Melting operation already assigned

16.1.1010 Errorcode 7033: Incorrect component type

Shortform:

Incorrect comp.type

Description:

Incorrect component type

16.1.1011 Errorcode 7034: Component is already available

Shortform:

Comp. alr.available

Description:

Component is already available

16.1.1012 Errorcode 7035: article do not match

Shortform:

article not match

Description:

article do not match

16.1.1013 Errorcode 7036: Material in output buffer not distinct

Shortform:

mat. in buf. n.dist.

Description:

Material in output buffer not distinct

16.1.1014 Errorcode 7037: OP is not in status prepared

Shortform:

op. n. status prep.

Description:

OP is not in status prepared

SIS-MWV_30.docx

Version: 1.5.19608

Page 433 of 477

16.1.1015 Errorcode 7038: Batch not in material buffer

MES Weaver

Shortform:

Batch n.in mat.buff.

Description:

Batch not in material buffer

16.1.1016 Errorcode 7039: Resource not in material buffer

Shortform:

Res. n.in mat.buff.

Description:

Resource not in material buffer

16.1.1017 Errorcode 7040: Invalid material buffer type

Shortform:

Inv. mat. buff. typ

Description:

Invalid material buffer type

solution:

Enter a valid material buffer type.

16.1.1018 Errorcode 7041: Batch transport status not allowed

Shortform:

trans.sta.n.allowed

Description:

Batch transport status not allowed

solution:

Check the transport status.

16.1.1019 Errorcode 7042: Not allowed run through batch status

Shortform:

Thr.bat.sta.n.allow.

Description:

The run-through status batch is not allowed.

SIS-MWV_30.docx

Version: 1.5.19608

Page 434 of 477

MES Weaver

Problem:

The run-through status batch is not allowed.

solution:

16.1.1020 Errorcode 7043: Work plan not found

Shortform:

Work plan n. found

Description:

Work plan not found

16.1.1021 Errorcode 7044: Transportation order already assigned

Shortform:

T.order assigned

Description:

Transportation order already assigned

16.1.1022 Errorcode 7045: Capacity order type not set

Shortform:

No capa. order type

Description:

Capacity order type not configured

16.1.1023 Errorcode 7046: Kanban order type not set

Shortform:

No KBN order type

Description:

Kanban order type not configured

16.1.1024 Errorcode 7047: Kanban resource status not

configured

Shortform:

KBN res.stat n.conf.

Description:

Kanban resource status not configured

SIS-MWV_30.docx

Version: 1.5.19608

Page 435 of 477

16.1.1025 Errorcode 7048: Kanban order is already available

MES Weaver

Shortform:

KBN-Ord. alr. avail.

Description:

Kanban order is already available

16.1.1026 Errorcode 7049: Capacity order not available

Shortform:

Capa.order n. avail.

Description:

Capacity order not available

16.1.1027 Errorcode 7050: Max. no. of kanban reached

Shortform:

Max. no. of kbn.

Description:

Maximum number of kanban reached.

16.1.1028 Errorcode 7051: Collective batch already running

Shortform:

col. batch running

Description:

Collective batch already running

16.1.1029 Errorcode 7052: Child batches have wrong status

Shortform:

child batch wrong sta

Description:

Child batches have wrong status

16.1.1030 Errorcode 7053: Output batch change not allowed

Shortform:

O.batch chg. n.all.

SIS-MWV_30.docx

Version: 1.5.19608

Page 436 of 477

MES Weaver

Description:

Output batch change not allowed

16.1.1031 Errorcode 7054: Batch is no collective batch

Shortform:

no collective batch

Description:

Batch is no collective batch

16.1.1032 Errorcode 7055: Batch has no childs

Shortform:

batch has no childs

Description:

Batch has no childs

16.1.1033 Errorcode 7056: Input file not available

Shortform:

Input file not avail.

Description:

Input file not available

16.1.1034 Errorcode 7060: File could not be saved at the dest.

Shortform:

File not saved at d.

Description:

File could not be saved at the destination

16.1.1035 Errorcode 7061: Destination does not exist

Shortform:

Dest. does not exist

Description:

Destination does not exist

SIS-MWV_30.docx

Version: 1.5.19608

Page 437 of 477

MES Weaver

16.1.1036 Errorcode 7062: Dir. could not be created at the dest.

Shortform:

Dir. at dist. n. a.

Description:

Directory could not be created at the destination

16.1.1037 Errorcode 7063: File could not be renamed.

Shortform:

File could not be ren

Description:

File could not be renamed according to the renaming rules.

16.1.1038 Errorcode 7064: File could not be read on the HYDRA

serv

Shortform:

File could not read.

Description:

File could not be read on the HYDRA server.

16.1.1039 Errorcode 7065: Invalid combination of doc and link

type

Shortform:

Invalid combination.

Description:

Invalid combination of documenttype and link type.

16.1.1040 Errorcode 7066: Access to the directory is not possible

Shortform:

Access to the dir.

Description:

Access to the directory is not possible.

SIS-MWV_30.docx

Version: 1.5.19608

Page 438 of 477

16.1.1041 Errorcode 7067: For this record, no text is entered.

MES Weaver

Shortform:

No text for entry.

Description:

For this record, no text is entered.

16.1.1042 Errorcode 7068: Documents entry does not exist

Shortform:

Doc entry not exist

Description:

Documents entry does not exist.

16.1.1043 Errorcode 7069: Collective not available

Shortform:

col. batch n. availa.

Description:

Collective not available

16.1.1044 Errorcode 7070: The Collective batch is not free

Shortform:

col. batch not free

Description:

The Collective batch is not free

16.1.1045 Errorcode 7071: Not allowed batch status

Shortform:

Bat.sta.n.allow.

Description:

Not allowed batch status

16.1.1046 Errorcode 7072: serial number could not be created

Shortform:

SNR creation failed

SIS-MWV_30.docx

Version: 1.5.19608

Page 439 of 477

MES Weaver

Description:

Serial number could not be created.

Problem:

There is some problem with the number range.

solution:

Configure the correct number range or enter a serial number

16.1.1047 Errorcode 7073: serial number is required

Shortform:

SNR required

Description:

A serial number is required for this process.

Problem:

The transmitted data contain no serial number.

solution:

Enter a serial number

16.1.1048 Errorcode 7074: serial component cannot be logged on

Shortform:

SNR cant logged on

Description:

Serial number component cannot be logged on.

Problem:

A single serial number component cannot be manually logged on.

solution:

Single serial number components are automatically logged on by the process.

16.1.1049 Errorcode 7075: invalid classification

Shortform:

invalid class choice

Description:

Invalid classification.

Problem:

This class is not allowed for this batch.

SIS-MWV_30.docx

Version: 1.5.19608

Page 440 of 477

MES Weaver

solution:

Another class must be elected for this batch

16.1.1050 Errorcode 7076: SNR does not match the input

component

Shortform:

SNR does not match

Description:

Serial number does not match with the input component.

Problem:

Serial number does not match with the input component.

solution:

Another serial number must be used or the input component changed.

16.1.1051 Errorcode 7077: serial component cannot be logged off

Shortform:

SNR cant logged off

Description:

Serial number component cannot be logged off.

Problem:

A single serial number component cannot be manually logged off.

solution:

Single serial number components are automatically logged off by the process.

16.1.1052 Errorcode 7078: The coll. batch has assigned batches

Shortform:

CB has assig.batches

Description:

The actual collective batch has still assigned batches

Problem:

This OP cannot be logged off because the actual collective batch has still assigned batches.

solution:

Please make sure that the actual collective batch (output batch) has to complete before log off

order.

SIS-MWV_30.docx

Version: 1.5.19608

Page 441 of 477

16.1.1053 Errorcode 7079: already a existing deleted RESSTA

MES Weaver

Shortform:

already del. RESSTA

Description:

There already exists for this resource type and resource family a deleted status.

Problem:

Only one deleted status for the same resource type and resource family is allowd.

solution:

Please change the deleted status or the actual one.

16.1.1054 Errorcode 7080: set status deleted only if col. blocked

Shortform:

set del. only if blo.

Description:

It is not possible to set the status deleted while collection is released.

Problem:

It is only possible to set the status deleted when collection is blocked.

solution:

Change the collectin to blocked.

16.1.1055 Errorcode 7081: The TU is not reserved for running OP

Shortform:

TU not reserv.for OP

Description:

The TU (transport unit) is not reserved for running Operation.

Problem:

The TU (transport unit) is not reserved for running Operation.

solution:

Choose TU, that is reserved for running operation.

16.1.1056 Errorcode 7082: The TU could not be logged on

Shortform:

TU not logged on

SIS-MWV_30.docx

Version: 1.5.19608

Page 442 of 477

MES Weaver

Description:

The TU (transport unit) could not be logged on.

Problem:

The TU (transport unit) could not be logged on.

solution:

Check status of the TU (batch).

16.1.1057 Errorcode 7083: Posting only at longest running OP

Shortform:

Posting not possible

Description:

Posting at this OP not possible. Booking is only possible at operation <ANR>.

Problem:

Booking is only allowed at the operation, which is logged on the longest.

solution:

Choose the operation, which is logged on the longest.

16.1.1058 Errorcode 7084: Op. already logged on at given

workplace

Shortform:

Op. already logged on

Description:

The operation is already logged on at the given workplace in the future.

Problem:

The delayed booking can not be processed because the operation is already logged on at this

workplace.

solution:

-

16.1.1059 Errorcode 7085: Target partitioning is required

Shortform:

partitioning required

Description:

For this posting target partitioning is mandatory.

SIS-MWV_30.docx

Version: 1.5.19608

Page 443 of 477

MES Weaver

Problem:

For the processing of this posting the target partitioning is mandatory.

solution:

Enter a target partitioning

16.1.1060 Errorcode 7086: There are open escalations.

Shortform:

ESK msg. are open.

Description:

For this escalation configuration there are still open escalation messages.

Problem:

For this escalation configuration there are still open escalation messages.

solution:

Please close all open escalation messages for this configuration.

16.1.1061 Errorcode 7087: Material type do not match

Shortform:

Mat.type mismatch

Description:

material type do not match

Problem:

material type must match

solution:

Please choose a batch with the same material type as the component

16.1.1062 Errorcode 7088: Batch class must be yield

Shortform:

Wrong batch class

Description:

You can only log on an input batch with batch class yield

Problem:

The input batch has not batch class yield

solution:

Please choose a batch with twith batch class yield

SIS-MWV_30.docx

Version: 1.5.19608

Page 444 of 477

MES Weaver

16.1.1063 Errorcode 7089: Missing quantity unit..

Shortform:

Missing qty unit

Description:

There is no quantity unit for batch and component available

Problem:

For calculation of consumption the batch or the component must have a quantity unit.

solution:

Please select a valid quantity unit.

16.1.1064 Errorcode 7090: Missing mandatory parameter batch id

Shortform:

Missing batch id

Description:

The posting does not contain the mandatory parameter batch id

Problem:

Batch id is mandatory for this posting

solution:

Please add a batch id to the posting

16.1.1065 Errorcode 7091: Missing mandatory parameter shift

end

Shortform:

Missing shift end

Description:

The posting does not contain the mandatory parameter shift begin (shift.begin_ts)

Problem:

The parameter shift begin is mandatory for this posting

solution:

Please add a shift begin to the posting

SIS-MWV_30.docx

Version: 1.5.19608

Page 445 of 477

16.1.1066 Errorcode 7092: Missing mandatory parameter shift

MES Weaver

end

Shortform:

Missing shift end

Description:

The posting does not contain the mandatory parameter shift end (shift.end_ts)

Problem:

The parameter shift end is mandatory for this posting

solution:

Please add a shift end to the posting

16.1.1067 Errorcode 7093: Shift begin not possible

Shortform:

Shiftbegin n.possible

Description:

Shift begin not possible

Problem:

Shift begin not possible because it is already another shift activ

solution:

Please wait until shift end

16.1.1068 Errorcode 7094: Shift end is not possible

Shortform:

Shift end n.possible

Description:

Shift end is not possible

Problem:

Shift end is not possible because there is no shift activ

solution:

Please wait until next shift begin

SIS-MWV_30.docx

Version: 1.5.19608

Page 446 of 477

16.1.1069 Errorcode 7095: Missing mandatory parameter batch

MES Weaver

class

Shortform:

Missing batch class

Description:

The posting does not contain the mandatory parameter batch class

Problem:

Batch class is mandatory for this posting

solution:

Please add a batch class to the posting

16.1.1070 Errorcode 7096: Remaining quantity is not allowed

Shortform:

Rem. qty not allowed

Description:

This scenario allows no given remaining quanty.

Problem:

The Batch is paralle logged on at multiple operations.

solution:

Please remove the remaining quantity of the posting.

16.1.1071 Errorcode 7097: No counter allowed for MPL type

manuell

Shortform:

No counter allowed

Description:

No counter configuration is allowed for this workplace.

Problem:

For the manuell MPL there is no counter configuration allowed for this workplace.

Only counter configuration witht the following conditions are allowed:

1) Counter with indicator "No booking"

2) Counter as consumption counter

SIS-MWV_30.docx

Version: 1.5.19608

Page 447 of 477

solution:

Please change or remove the counter configurations for this workplace.

16.1.1072 Errorcode 7098: Only batch class yield is allowed

MES Weaver

Shortform:

Only yiel class allow

Description:

The posting allows only yield batch class

Problem:

The MPL type OUTPUTBATCH_COLLECTION_TYPE "YIELD_BATCHES_ONLY" allows only

batches with class yield.

solution:

Please use batch class yield or change the MPL type.

16.1.1073 Errorcode 7099: No Shift: No status change possible

Shortform:

No stat. change poss

Description:

It is impossible to change the status because there is no shift activ

Problem:

It is impossible to change the status because there is no shift activ

solution:

Please wait until next shift begin

16.1.1074 Errorcode 7100: Not a valid required resource

Shortform:

Not a val. req. res.

Description:

The posted resource is not a valid required resource

Problem:

The posted resource is not a valid required resource

solution:

Please post valid required resource

SIS-MWV_30.docx

Version: 1.5.19608

Page 448 of 477

16.1.1075 Errorcode 7101: Not enough companay licenses avail.

MES Weaver

Shortform:

company licenses mis

Description:

Exceeded number of licensed workplaces

Problem:

Exceeded number of licensed workplaces

solution:

Please check number of company licenses for workplaces.

16.1.1076 Errorcode 7102: Not enough companay licenses avail.

Shortform:

company licenses mis

Description:

Exceeded number of licensed logical channels

Problem:

Exceeded number of licensed logical channels

solution:

Please check number of company licenses for logical channels.

16.1.1077 Errorcode 7103: Not enough companay licenses avail.

Shortform:

company licenses mis

Description:

Exceeded number of licensed DNC resources

Problem:

Exceeded number of licensed DNC resources

solution:

Please check number of company licenses for DNC resources.

16.1.1078 Errorcode 7104: Not enough company licenses avail.

Shortform:

company licenses mis

SIS-MWV_30.docx

Version: 1.5.19608

Page 449 of 477

MES Weaver

Description:

Exceeded number of licensed persons

Problem:

Exceeded number of licensed persons

solution:

Please check number of company licenses for persons.

16.1.1079 Errorcode 7105: License service not available

Shortform:

License service n.a.

Description:

License service not available

Problem:

License service not available

solution:

Please check if license service is running.

16.1.1080 Errorcode 7106: The batch quality status is invalid

Shortform:

Batch qstatus invalid

Description:

The quality status of the batch is invalid.

Problem:

The quality status is invalid for this posting.

solution:

Please use another quality status for this batch.

16.1.1081 Errorcode 7107: A negative consumption is not

allowed.

Shortform:

Negative consumption

Description:

A negative consumption is inadmissible.

SIS-MWV_30.docx

Version: 1.5.19608

Page 450 of 477

MES Weaver

Problem:

It is not allowed to send a negativ consumption with this posting.

solution:

Please use a positiv consumption.

16.1.1082 Errorcode 7108: Batch already archived

Shortform:

Batch alr. archived

Description:

Batch already archived

Problem:

Batch already archived

solution:

-

16.1.1083 Errorcode 7109: The max. number of batches is

exceeded

Shortform:

Max. no. of batches

Description:

The maximum number of batches has been exceeded.

Problem:

The maximum number of batches has been exceeded.

solution:

The maximum number is 500 batches.

16.1.1084 Errorcode 7110: msl attributes are different

Shortform:

msl attrib. are diff.

Description:

The msl attributes are different.

Problem:

The msl attributes of the batches are different.

SIS-MWV_30.docx

Version: 1.5.19608

Page 451 of 477

MES Weaver

solution:

Please check the msl expire date and the msl time of each batch.

16.1.1085 Errorcode 7111: msl time is not defined

Shortform:

msl time not defined

Description:

The msl time is not defined.

Problem:

There is no msl time defined for this batch or material.

solution:

Please define a msl time at the batch or for this material.

16.1.1086 Errorcode 7112: requested amount of data is too large

Shortform:

requ. data too large

Description:

The requested amount of data is too large. Please restrict the data using selection criteria.

Problem:

The requested amount of data is too large.

solution:

Please restrict the data using selection criteria.

16.1.1087 Errorcode 7113: ReferenceAggr. already assigned

Shortform:

RefAggr.already.ass.

Description:

Problem:

solution:

16.1.1088 Errorcode 7114: Passwords does not match

Shortform:

Passwords not match

SIS-MWV_30.docx

Version: 1.5.19608

Page 452 of 477

MES Weaver

Description:

The entered passwords do not match.

Problem:

solution:

16.1.1089 Errorcode 7115: Password processing

Shortform:

Passwords processing

Description:

An error occurred during password processing.

Problem:

solution:

Please contact the administrator of Hydra

16.1.1090 Errorcode 7116: Not enough company licenses avail.

Shortform:

company licenses mis

Description:

Exceeded number of licensed employees in production

Problem:

Exceeded number of licensed employees in production

solution:

Please check number of company licenses for employees in production.

16.1.1091 Errorcode 7120: Missing mandatory param. material

buffer

Shortform:

Missing mat. buffer

Description:

The posting does not contain the mandatory parameter material buffer

Problem:

Material buffer is mandatory for this posting

solution:

Please add a material buffer to the posting

SIS-MWV_30.docx

Version: 1.5.19608

Page 453 of 477

16.1.1092 Errorcode 7121: Missing mandat. param. consumpt.

MES Weaver

quant.

Shortform:

Missing mat. buffer

Description:

The posting does not contain the mandatory parameter material buffer

Problem:

Material buffer is mandatory for this posting

solution:

Please add a material buffer to the posting

16.1.1093 Errorcode 7122: Missing mandatory parameter material

Shortform:

Missing material

Description:

The posting does not contain the mandatory parameter material

Problem:

Material is mandatory for this posting

solution:

Please add a material to the posting

16.1.1094 Errorcode 7123: Group is no capacity group

Shortform:

No capacity group

Description:

Specified group is not a capacity group.

Problem:

The specified group must be a capacity group

16.1.1095 Errorcode 7124: Validity date causes gap in versions

Shortform:

Date gap in versions

SIS-MWV_30.docx

Version: 1.5.19608

Page 454 of 477

MES Weaver

Description:

The date specified causes a gap between the versions.

Problem:

Gaps between versions are not allowed.

solution:

Check the validity period. There must be no gaps between the versions. A new start date must be

no later than the day following the last version. The end date can only be freely chosen for the last

version.

16.1.1096 Errorcode 7125: Incorrect length of batch number

Shortform:

Incor. len. batch nr

Description:

The batch number length entered does not correspond to the specifications.

Problem:

An attempt is made to specify a batch number length outside the valid range.

solution:

The batch number length must be a minimum of 8 and a maximum of 20.

16.1.1097 Errorcode 7126: Invalid machine number

Shortform:

Syntax error filter

Description:

Invalid machine number

16.1.1098 Errorcode 7127: Invalid character in machine number

Shortform:

Syntax error filter

Description:

Invalid character in machine number

16.1.1099 Errorcode 7128: Invalid character in resource

Shortform:

Syntax error filter

SIS-MWV_30.docx

Version: 1.5.19608

Page 455 of 477

Description:

Invalid character in resource

16.1.1100 Errorcode 7129: Output lot with quantity 0 not allowed.

MES Weaver

Shortform:

A-lot with qty 0.

Description:

The output lot has the quantity 0.

Problem:

An attempt is made to log off an output lot with quantity 0.

solution:

Enter a quantity greater than 0. This message can be overridden.

16.1.1101 Errorcode 7130: Output lot with quantity 0 not allowed.

Shortform:

A-lot with qty 0.

Description:

The output lot has the quantity 0.

Problem:

An attempt is made to log off an output lot with quantity 0.

solution:

Enter a quantity greater than 0. This message cannot be overridden.

16.2  Local error messages at the terminal

16.2.1  Overview

The terminal even checks host computer data and thus detects errors that are displayed for the user.

16.2.2  Error when saving the machine label

Cause

Machine label neither could be saved locally.

SIS-MWV_30.docx

Version: 1.5.19608

Page 456 of 477

MES Weaver

16.2.3  Error when saving the machine status

Cause

Error when saving the machine status locally.

16.2.4  Error 901

Cause

Machine label could not be read (no network or not available).

16.2.5  Error 902

Cause

Machine label neither could be read locally.

16.2.6  Error 903

Cause

A shift model has not been defined for the workplace/machine.

16.2.7  Error 904

Cause

Shift model: Error in loading other shifts.

16.2.8  Error 905

Cause

The shift calendar could not be read or it is not available.

16.2.9  Error 906 (DOS terminals only)

Cause

The machine status could not be read.

16.2.10  Error 907 (DOS terminals only)

Cause

Not assigned.

SIS-MWV_30.docx

Version: 1.5.19608

Page 457 of 477

MES Weaver

16.2.11  Error 908 (DOS terminals only)

Cause

The machine status neither could be read locally.

16.2.12  Error 909

Cause

No status table available.

16.2.13  Error 951

Cause

The “general disturbance“ status is not available for the machine.

16.2.14  Error code 10001

Cause

Demo mode: The directory %1% including the demo data is missing!!

Solution

16.2.15  Error code 10002

Cause

The queue %1% could not be created.

Solution

16.2.16  Error code 10003

Cause

Error in terminal label: Terminal %1% has not been configured.

Solution

16.2.17  Error code 10004

Cause

Error in terminal label: Different user numbers: Ctwin.ini: %1% tkenn.dat: %2%

SIS-MWV_30.docx

Version: 1.5.19608

Page 458 of 477

MES Weaver

Solution

16.2.18  Error code 10005

Cause

Error  in  reading  the  local  clock!  It  is  impossible  to  read  the  LAN  clock.  LAN  not  ready?  ADE/PZE

terminals cannot be started without clock!

Solution

16.2.19  Error code 10006

Cause

Terminal label could not be read. Ctwin.ini: usr=%1%

Solution

16.2.20  Error code 10007

Cause

No dialog files available!!

Solution

16.2.21  Error code 10008

Cause

Dialog  files  are  not  available  on  the  server!  The  terminal  starts  with  the  last  local  configuration!  Please

also check the HYDRA path: hypath=%1%

Solution

16.2.22  Error code 10009

Cause

Downloading the file %1% has failed. Local file could not be created.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 459 of 477

MES Weaver

16.2.23  Error code 10010

Cause

Downloading the file %1% has failed. Error in accessing the host computer file.

Solution

16.2.24  Error code 10011

Cause

The file %1% could not be loaded. %2%

Solution

16.2.25  Error code 10012

Cause

File %1% not found. Code: %2%

Solution

16.2.26  Error code 10013

Cause

%1% structure of OP info: AGInfoField=%2%

Solution

16.2.27  Error code 10014

Cause

The file %1% has an unknown file extension %2% %3%

Solution

16.2.28  Error code 10015

Cause

Error in opening a dialog list automatically. Failure type: %1% Dialog: %2% Field ID: %3%

SIS-MWV_30.docx

Version: 1.5.19608

Page 460 of 477

MES Weaver

Solution

16.2.29  Error code 10016

Cause

Due to the customer-specific layout the button configuration is ignored.

Solution

16.2.30  Error code 10017

Cause

The application %1% has not been found.

Solution

16.2.31  Error code 10018

Cause

The  system  has  been  running  for  more  than  30  days.  The  system  is  now  restarted  in  order  to  avoid

problems with a hardware timer.

Solution

16.2.32  Error code 10019

Cause

Error in opening the file "%1%"

Solution

16.2.33  Error code 10020

Cause

File %1% is defective.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 461 of 477

MES Weaver

16.2.34  Error code 10021

Cause

Unknown button ID "%1%" in "%2%".

Solution

16.2.35  Error code 10022

Cause

Dialog %1% has not been configured!

Solution

16.2.36  Error code 10023

Cause

Error in converting a transfer value: %1%

Solution

16.2.37  Error code 18001

Cause

Window not found

Solution

16.2.38  Error code 19001

Cause

Partial quantities can only be printed online.

Solution

16.2.39  Error code 20001

Cause

A quantity must not be posted onto an order having the order type %1%

SIS-MWV_30.docx

Version: 1.5.19608

Page 462 of 477

MES Weaver

Solution

16.2.40  Error code 20002

Cause

The order is already running on the machine %1%

Solution

16.2.41  Error code 20003

Cause

The file %1% could not be written.

Solution

16.2.42  Error code 20004

Cause

Order data for "%1%" could not be loaded!

Solution

16.2.43  Error code 20005

Cause

The machine status "%1%" may only be set when no order is running at the machine!

Solution

16.2.44  Error code 20006

Cause

The machine status "%1%" may only be set when an order is running at the machine!

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 463 of 477

MES Weaver

16.2.45  Error code 20007

Cause

The posting is impossible for the current machine status "%1%"!

Solution

16.2.46  Error code 20008

Cause

No more than 8 orders may be logged on to the machine!

Solution

16.2.47  Error code 20009

Cause

Error in scrap posting: Order %1% not found.

Solution

16.2.48  Error code 20010

Cause

Error in scrap posting: No data found for the order %1%

Solution

16.2.49  Error code 20011

Cause

Error in scrap posting: Order type %2% not found for order %1%.

Solution

16.2.50  Error code 20012

Cause

Error in scrap posting: The option OPT:SNR is missing in the order type %2% for order %1%

SIS-MWV_30.docx

Version: 1.5.19608

Page 464 of 477

MES Weaver

Solution

16.2.51  Error code 20013

Cause

Error in scrap posting: There is an unknown option OPT:SNR=%3% in the order type %2% (order %1%)

Solution

16.2.52  Error code 20014

Cause

Entry has already been completed

Solution

16.2.53  Error code 20015

Cause

Serial number has already been assigned.

Solution

16.2.54  Error code 20016

Cause

Operations of the order %1% can only be logged on.

Solution

16.2.55  Error code 20017

Cause

When  updating  the  order  list  an  error  appeared:  %1%  the  order  list  will  be  reloaded  as  soon  as  the

terminal is again online!

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 465 of 477

MES Weaver

16.2.56  Error code 29801

Cause

There is no information on the collective OP. Info on individual OPs via “COP list“!

Solution

16.2.57  Error code 30001

Cause

Machine list could not be loaded. Please check the network!

Solution

16.2.58  Error code 30002

Cause

Order list could not be loaded. Please check the network connection!

Solution

16.2.59  Error code 30003

Cause

Error in line configuration: Aggregates, however, no line available!

Solution

16.2.60  Error code 30004

Cause

Error in changing containers: The total quantity has been enlarged! The initial value is entered!

Solution

16.2.61  Error code 30005

Cause

Dialog %1% is not allowed as the machine is in shift break.

SIS-MWV_30.docx

Version: 1.5.19608

Page 466 of 477

MES Weaver

Solution

16.2.62  Error code 39801

Cause

Manual status change is not allowed.

Solution

16.2.63  Error code 39802

Cause

The Engel interfacing is currently not ready

Solution

16.2.64  Error code 60001

Cause

Error in loading the machine list of the terminal %1%

Solution

16.2.65  Error code 60002

Cause

Error in loading the inspection plan of machine %1%

Solution

16.2.66  Error code 60003

Cause

Error in loading the measuring channels of terminal %1%

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 467 of 477

MES Weaver

16.2.67  Error code 60004

Cause

PDV file error: File %1% could not be created.

Solution

16.2.68  Error code 60005

Cause

Only %1% PDV machines can be operated all other machines are ignored.

Solution

16.2.69  Error code 60006

Cause

Error in loading an inspection plan. Data are set up locally.

Solution

16.2.70  Error code 60007

Cause

The IOP file %1% has not been picked up. The file will be overwritten.

Solution

16.2.71  Error code 60008

Cause

Unknown requirement of the IOP: %1%

Solution

16.2.72  Error code 60009

Cause

The IOP file %1% has not been picked up %2%

SIS-MWV_30.docx

Version: 1.5.19608

Page 468 of 477

MES Weaver

Solution

16.2.73  Error code 60010

Cause

PDV inactive! (probably none of the machines at the terminal has been configured for PDV)

Solution

16.2.74  Error code 60011

Cause

Wrong configuration of tolerance limits LTL = %1%, UTL = %2%

Solution

16.2.75  Error code 60012

Cause

A  new  inspection  plan  could  not  be  loaded.  The  previous  inspection  plan  is  not  valid  anymore.  A  new

online registration of the order is required!

Solution

16.2.76  Error code 70001

Cause

Batch info on "%1%" could not be loaded.

Solution

16.2.77  Error code 70002

Cause

Batch info on "%1%" is empty.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 469 of 477

MES Weaver

16.2.78  Error code 70003

Cause

The batch "%1%" may only be logged off by entering a new batch of the same material.

Solution

16.2.79  Error code 70004

Cause

The dialog %1% has been configured incorrectly. The batch number must include the DLL ID.

Solution

16.2.80  Error code 70005

Cause

No order available

Solution

16.2.81  Error code 70006

Cause

The order is not subject to batch management requirement

Solution

16.2.82  Error code 70007

Cause

Fct: edit batches, machine %1% not known.

Solution

16.2.83  Error code 70008

Cause

It is impossible to post batches in OFFLINE mode

SIS-MWV_30.docx

Version: 1.5.19608

Page 470 of 477

MES Weaver

Solution

16.2.84  Error code 70009

Cause

Batch not found

Solution

16.2.85  Error code 70010

Cause

The run-through batch must not be changed

Solution

16.2.86  Error code 70011

Cause

"Material can be logged on several times“ not allowed for coil-based manufacturing.

Solution

16.2.87  Error code 70012

Cause

The material is not planned

Solution

16.2.88  Error code 70013

Cause

The batch has already been processed.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 471 of 477

MES Weaver

16.2.89  Error code 70014

Cause

No batch data available.

Solution

16.2.90  Error code 70015

Cause

No batch data available.

Solution

16.2.91  Error code 70016

Cause

No batch data available.

Solution

16.2.92  Error code 70017

Cause

Log input batch on: Data could not be taken over

Solution

16.2.93  Error code 70018

Cause

Log input batch off: Data could not be taken over.

Solution

16.2.94  Error code 70019

Cause

Input batch is missing for material %1%

SIS-MWV_30.docx

Version: 1.5.19608

Page 472 of 477

MES Weaver

Solution

16.2.95  Error code 70020

Cause

No carrier material logged on.

Solution

16.2.96  Error code 70021

Cause

%1% carrier batches are logged on.

Solution

16.2.97  Error code 81001

Cause

Machine %1% has not been assigned to the terminal.

Solution

16.2.98  Error code 81002

Cause

No DNC element has been chosen.

Solution

16.2.99  Error code 81003

Cause

Path %1% has not been defined.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 473 of 477

MES Weaver

16.2.100  Error code 81004

Cause

Error "%1%" in reading the file path in paths.lst: %2% Error log: %3%

Solution

16.2.101  Error code 81005

Cause

File %1% could not be loaded onto the terminal.

Solution

16.2.102  Error code 81006

Cause

The element %1% has been blocked.

Solution

16.2.103  Error code 81007

Cause

At least one element of the package %1% has been blocked.

Solution

16.2.104  Error code 81008

Cause

DNC: The file %1% for transferring data to the MWP could not be written.

Solution

16.2.105  Error code 81009

Cause

Error in plausibility check: %1%

SIS-MWV_30.docx

Version: 1.5.19608

Page 474 of 477

MES Weaver

Solution

16.2.106  Error code 81010

Cause

Not all files could be copied onto the terminal for the download.

Solution

16.2.107  Error code 81011

Cause

The element %1% does not contain any load file.

Solution

16.2.108  Error code 81012

Cause

File %1% has not been found for upload.

Solution

16.2.109  Error code 81013

Cause

MWP sends data without reference to machines: MNR or MNRID have to be stated.

Solution

16.2.110  Error code 81014

Cause

It is impossible to filter according to the DNC family in offline mode.

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 475 of 477

MES Weaver

16.2.111  Error code 81015

Cause

When filtering by the DNC family additional parameters have to be stated as the list might get too long.

Solution

16.2.112  Error code 81016

Cause

The list is too long. Not all resources are displayed.

Solution

16.2.113  Error code 81017

Cause

Uploads are not allowed for the selected element.

Solution

16.2.114  Error code 82001

Cause

The order %2% is still assigned to the NC program %1%. The assignment is replaced by the new order

%s.

Solution

16.2.115  Error code 82002

Cause

The file %1% cannot be written.

Solution

16.2.116  Error code 82003

Cause

The file %1% cannot be written.

SIS-MWV_30.docx

Version: 1.5.19608

Page 476 of 477

MES Weaver

Solution

16.2.117  Error code 82004

Cause

No order has been found for the NC program %1%

Solution

16.2.118  Error code 82005

Cause

The maximum number of %2% orders has already been logged on to machine %1%

Solution

SIS-MWV_30.docx

Version: 1.5.19608

Page 477 of 477


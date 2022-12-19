export class Main {
    public static TURN_PAGE_ENDED = "TURN_PAGE_ENDED";
    public static bundle:string = "cocos";

    public static page: string[] = ["fm", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10",  ];

    public static text_node:object = {
        "fm": [],
        "p1": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22","text23"],
        "p2": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18"],
        "p3": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20"],
        "p4": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22","text23"],
        "p5": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22","text23","text24","text25","text26","text27","text28","text29"],
        "p6": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22"],
        "p7": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21"],
        "p8": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19"],
        "p9": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22","text23","text24","text25","text26"],
        "p10": ["text1","text2","text3","text4","text5","text6","text7","text8","text9","text10","text11","text12","text13","text14","text15","text16","text17","text18","text19","text20","text21","text22","text23","text24","text25","text26","text27","text28","text29","text30","text31","text32"],       
    }
    
    public static spine_node: object = {
        "fm": ["fmbg", "fma"],
        "p1": ["bg", "p1bg", "p1a", "p1b", "p1c","p1d","p1e","p1f","p1g","p1h"],
        "p2": ["bg", "p2bg", "p2a", "p2b", "p2c","p2d","p2e","p2f","p2g","p2h","p2i","p2j","p2k","p2m","p2n","p2o","p2p","p2q"],
        "p3": ["bg", "p3bg", "p3a", "p3b", "p3c","p3d","p3e","p3f","p3g","p3h","p3i"],
        "p4": ["bg", "p4bg", "p4a", "p4b", "p4c","p4d","p4e","p4f","p4g","p4h","p4i","p4j","p4k" ],
        "p5": ["bg", "p5bg", "p5a", "p5b", "p5c","p5d","p5e","p5f","p5h"],
        "p6": ["bg", "p6bg", "p6a", "p6b", "p6c","p6d","p6e","p6f","p6g","p6h","p6i","p6j","p6n"],
        "p7": ["bg", "p7bg", "p7a", "p7b", "p7c","p7d","p7e","p7f","p7g","p7h","p7i"],
        "p8": ["bg", "p8bg", "p8a", "p8b", "p8c","p8d","p8e","p8f","p8g","p8h","p8i","p8j","p8m","p8n"],
        "p9": ["bg", "p9bg", "p9a", "p9b", "p9c","p9d","p9e","p9f","p9g","p9h","p9i","p9j","p9n"],
        "p10": ["bg", "p10bg", "p10a","p10b","p10c","p10d","p10e","p10f","p10g","p10h","p10k"],
        
        
        
    };

    public static backPictures: cc.SpriteFrame[] = [];

    public static audio: object = {
        "fm": {
            "fmbg": ["EEPS001","CEPS001"],
            "fma": ["EEPS003","CEPS003"],
        },
        "p1": {
            "p1bg": "EEPS059",
            "p1a": "EEPS088", 
            "p1b": ["EEPS098","CEPS098"],
            "p1c": ["EEPS095","CEPS095"],
            "p1d": ["EEPS091","CEPS091"],
            "p1e": ["EEPS099","CEPS099"],
            "p1f": ["EEPS089","CEPS089"],
            "p1g": ["EEPS0101","CEPS0101"],
            "p1h": ["EEPS093","CEPS093"],
            "text1":["EEPS062","CEPS062"],
            "text2":["EEPS063","CEPS063"],
            "text3":["EEPS064","CEPS064"],
            "text4":["EEPS065","CEPS065"],
            "text5":["EEPS066","CEPS066"],
            "text6":["EEPS067","CEPS067"],
            "text7":["EEPS068","CEPS068"],
            "text8":["EEPS069","CEPS069"],
            "text9":["EEPS070","CEPS070"],
            "text10":["EEPS071","CEPS071"],
            "text11":["EEPS077","CEPS077"],
            "text12":["EEPS078","CEPS078"],
            "text13":["EEPS079","CEPS079"],
            "text14":["EEPS080","CEPS080"],
            "text15":["EEPS081","CEPS081"],
            "text16":["EEPS082","CEPS082"],
            "text17":["EEPS083","CEPS083"],
            "text18":["EEPS084","CEPS084"],
            "text19":["EEPS085","CEPS085"],
            "text20":["EEPS086","CEPS086"],
            "text21":"EEPS103",
            "text22":"EEPS105",
            "text23":"CEPS106"
        },
        "p2": {
            "p2bg": "EEPS108",
            "p2a": ["EEPS126","CEPS126"],
            "p2b": ["EEPS128","CEPS128"],
            "p2c": ["EEPS129","CEPS129"],
            "p2d": ["EEPS131","CEPS131"],
            "p2e": ["EEPS133","CEPS133"],
            "p2f": ["EEPS135","CEPS135"],
            "p2g": ["EEPS137","CEPS137"],
            "p2h": ["EEPS138","CEPS138"],
            "p2i": ["EEPS139","CEPS139"],
            "p2j": ["EEPS145","CEPS145"],
            "p2k": ["EEPS146","CEPS146"],
            "p2m": ["EEPS147","CEPS147"],
            "p2n": ["EEPS148","CEPS148"],
            "p2o": ["EEPS149","CEPS149"],
            "p2p": ["EEPS150","CEPS150"],
            "p2q": ["EEPS151","CEPS151"],
            "text1":["EEPS111","CEPS111"],
            "text2":["EEPS112","CEPS112"],
            "text3":["EEPS113","CEPS113"],
            "text4":["EEPS114","CEPS114"],
            "text5":["EEPS115","CEPS115"],
            "text6":["EEPS116","CEPS116"],
            "text7":["EEPS117","CEPS117"],
            "text8":["EEPS118","CEPS118"],
            "text9":["EEPS119","CEPS119"],
            "text10":["EEPS120","CEPS120"],
            "text11":["EEPS121","CEPS121"],
            "text12":["EEPS122","CEPS122"],
            "text13":["EEPS123","CEPS123"],
            "text14":["EEPS124","CEPS124"],
            "text15":["EEPS125","CEPS125"],
            "text16":"EEPS141",
            "text17":"EEPS143",
            "text18":"CEPS144",
        },
        "p3": {
            "p3bg": "EEPS158",
            "p3a": ["EEPS186","CEPS186"],
            "p3b": ["EEPS187","CEPS187"],
            "p3c": ["EEPS191","CEPS191"],
            "p3d": ["EEPS192","CEPS192"],
            "p3e": ["EEPS193","CEPS193"],
            "p3f": ["EEPS200","CEPS200"],
            "p3g": ["EEPS206","CEPS206"],
            "p3h": ["EEPS207","CEPS207"],
            "p3i": ["EEPS184","CEPS184"],
            "text1":["EEPS161","CEPS161"],
            "text2":["EEPS162","CEPS162"],
            "text3":["EEPS163","CEPS163"],
            "text4":["EEPS164","CEPS164"],
            "text5":["EEPS165","CEPS165"],
            "text6":["EEPS166","CEPS166"],
            "text7":["EEPS167","CEPS167"],
            "text8":["EEPS168","CEPS168"],
            "text9":["EEPS169","CEPS169"],
            "text10":["EEPS170","EEPS171","EEPS172","EEPS173","EEPS174","EEPS175","EEPS176"],
            "text11":["EEPS177","CEPS177"],
            "text12":["EEPS178","CEPS178"],
            "text13":["EEPS179","CEPS179"],
            "text14":["EEPS180","CEPS180"],
            "text15":["EEPS181","CEPS181"],
            "text16":["EEPS182","CEPS182"],
            "text17":["EEPS183","CEPS183"],
            "text18":"EEPS201",
            "text19":"EEPS202",
            "text20":"CEPS204",
        },
        "p4": {
            "p4bg": "EEPS209",
            "p4a": ["EEPS235","CEPS235"],
            "p4b": ["EEPS232","CEPS232"],
            "p4c": ["EEPS236","CEPS236"],
            "p4d": ["EEPS238","CEPS238"],
            "p4e": ["EEPS240","CEPS240"],
            "p4f": ["EEPS241","CEPS241"],
            "p4g": ["EEPS244","CEPS244"],
            "p4h": ["EEPS245","CEPS245"],
            "p4i": ["EEPS251","CEPS251"],
            "p4j": ["EEPS252","CEPS252"],
            "p4k": ["EEPS253","CEPS253"],
            "text1":["EEPS212","CEPS212"],
            "text2":["EEPS213","CEPS213"],
            "text3":["EEPS214","CEPS214"],
            "text4":["EEPS215","CEPS215"],
            "text5":["EEPS216","CEPS216"],
            "text6":["EEPS217","CEPS217"],
            "text7":["EEPS218","CEPS218"],
            "text8":["EEPS219","CEPS219"],
            "text9":["EEPS220","CEPS220"],
            "text10":["EEPS221","EEPS221"],
            "text11":["EEPS222","CEPS222"],
            "text12":["EEPS223","CEPS223"],
            "text13":["EEPS224","CEPS224"],
            "text14":["EEPS225","CEPS225"],
            "text15":["EEPS226","CEPS226"],
            "text16":["EEPS227","CEPS227"],
            "text17":["EEPS228","CEPS228"],
            "text18":["EEPS229","CEPS229"],
            "text19":["EEPS230","CEPS230"],
            "text20":["EEPS231","CEPS231"],
            "text21":"EEPS247",
            "text22":"EEPS249",
            "text23":"CEPS250",
            
        },
        "p5": {
            "p5bg": "EEPS254",
            "p5a": ["EEPS283","CEPS283"],
            "p5b": ["EEPS287","CEPS287"],
            "p5c": ["EEPS289","CEPS289"],
            "p5d": ["EEPS291","CEPS291"],
            "p5e": ["EEPS293","CEPS293"],
            "p5f": ["ep5f","cp5f"],
            // "p5g": ["EEPS301","CEPS301"],
            "p5h": ["ep5h","cp5h"],
            // "p5i": ["EEPS303","CEPS303"],
            "text1":["EEPS257","CEPS257"],
            "text2":["EEPS258","CEPS258"],
            "text3":["EEPS259","CEPS259"],
            "text4":["EEPS260","CEPS260"],
            "text5":["EEPS261","CEPS261"],
            "text6":["EEPS262","CEPS262"],
            "text7":["EEPS263","CEPS263"],
            "text8":["EEPS264","CEPS264"],
            "text9":["EEPS265","CEPS265"],
            "text10":["EEPS267","EEPS267"],
            "text11":["EEPS266","CEPS266"],
            "text12":["EEPS268","CEPS268"],
            "text13":["EEPS269","CEPS269"],
            "text14":["EEPS270","CEPS270"],
            "text15":["EEPS271","CEPS271"],
            "text16":["EEPS272","CEPS272"],
            "text17":["EEPS273","CEPS273"],
            "text18":["EEPS274","CEPS274"],
            "text19":["EEPS275","CEPS275"],
            "text20":["EEPS277","CEPS277"],
            "text21":["EEPS278","CEPS278"],
            "text22":["EEPS279","CEPS279"],
            "text23":["EEPS280","CEPS280"],
            "text24":["EEPS276","CEPS276"],
            "text25":["EEPS281","CEPS281"],
            "text26":["EEPS282","CEPS282"],
            "text27":"EEPS294",
            "text28":"EEPS296",
            "text29":"CEPS297",
        },
        "p6": {
            "p6bg": "EEPS304",
            "p6a": ["EEPS314","CEPS314"],
            "p6b": ["EEPS320","CEPS320"],
            "p6c": ["EEPS321","CEPS321"],
            "p6d": ["EEPS322","CEPS322"],
            "p6e": ["EEPS349","CEPS349"],
            "p6f": ["EEPS313","CEPS313"],
            "p6g": ["EEPS312","CEPS312"],
            "p6h": "p6h",
            "p6i": ["EEPS325","CEPS325"],
            "p6j": ["EEPS351","CEPS351"],
            "p6n": ["EEPS350","CEPS350"],
            "text1":["EEPS307","CEPS307"],
            "text2":["EEPS329","CEPS329"],
            "text3":["EEPS333","CEPS333"],
            "text4":["EEPS306","CEPS306"],
            "text5":["EEPS338","CEPS338"],
            "text6":["EEPS341","CEPS341"],
            "text7":["EEPS335","CEPS335"],
            "text8":["EEPS332","CEPS332"],
            "text9":["EEPS309","CEPS309"],
            "text10":["EEPS310","EEPS310"],
            "text11":["EEPS308","CEPS308"],
            "text12":["EEPS336","CEPS336"],
            "text13":["EEPS331","CEPS331"],
            "text14":["EEPS339","CEPS339"],
            "text15":["EEPS340","CEPS340"],
            "text16":["EEPS337","CEPS337"],
            "text17":["EEPS330","CEPS330"],
            "text18":["EEPS334","CEPS334"],
            "text19":["EEPS311","CEPS311"],
            "text20":"EEPS343",
            "text21":"EEPS345",
            "text22":"CEPS346",
        },
        "p7": {
            "p7bg": "EEPS353",
            "p7a": ["EEPS372","CEPS372"],
            "p7b": ["EEPS373","CEPS373"],
            "p7c": ["EEPS378","CEPS378"],
            "p7d": ["EEPS382","CEPS382"],
            "p7e": ["EEPS385","CEPS385"],
            "p7f": ["EEPS392","CEPS392"],
            "p7g": ["EEPS393","CEPS393"],
            "p7h": ["EEPS394","CEPS394"],
            "p7i": ["EEPS395","CEPS395"],
            "text1":["EEPS357","CEPS357"],
            "text2":["EEPS362","CEPS362"],
            "text3":["EEPS366","CEPS366"],
            "text4":["EEPS356","CEPS356"],
            "text5":["EEPS363","CEPS363"],
            "text6":["EEPS369","CEPS369"],
            "text7":["EEPS371","CEPS371"],
            "text8":["EEPS362","CEPS362"],
            "text9":["EEPS361","CEPS361"],
            "text10":["EEPS360","EEPS360"],
            "text11":["EEPS359","CEPS359"],
            "text12":["EEPS370","CEPS370"],
            "text13":["EEPS367","CEPS367"],
            "text14":["EEPS364","CEPS364"],
            "text15":["EEPS358","CEPS358"],
            "text16":["EEPS365","CEPS365"],
            "text17":"EEPS388",
            "text18":"EEPS390",
            "text19":"CEPS391",
            "text20":["EEPS364","CEPS364"],
            "text21":["EEPS365","CEPS365"]
            
        },
        "p8": {
            "p8bg": "EEPS396",
            "p8a": ["ep8a","cp8a"],
            "p8b": ["EEPS419","CEPS419"],
            "p8c": ["EEPS421","CEPS421"],
            "p8d": ["EEPS423","CEPS423"],
            "p8e": ["EEPS425","CEPS425"],
            "p8f": ["EEPS427","CEPS427"],
            "p8g": ["EEPS432","CEPS432"],
            "p8h": ["EEPS426","CEPS426"],
            "p8i": ["EEPS434","CEPS434"],
            "p8j": ["EEPS435","CEPS435"],
            "p8m": ["EEPS438","CEPS438"],
            "p8n": ["EEPS437","CEPS437"],
            "text1":["EEPS400","CEPS400"],
            "text2":["EEPS407","CEPS407"],
            "text3":["EEPS408","CEPS408"],
            "text4":["EEPS399","CEPS399"],
            "text5":["EEPS410","CEPS410"],
            "text6":["EEPS411","CEPS411"],
            "text7":["EEPS412","CEPS412"],
            "text8":["EEPS409","CEPS409"],
            "text9":["EEPS414","CEPS414"],
            "text10":["EEPS402","EEPS402"],
            "text11":["EEPS403","CEPS403"],
            "text12":["EEPS406","CEPS406"],
            "text13":["EEPS405","CEPS405"],
            "text14":["EEPS413","CEPS413"],
            "text15":["EEPS404","CEPS404"],
            "text16":["EEPS401","CEPS401"],
            "text17":"EEPS423",
            "text18":"EEPS430",
            "text19":"CEPS431",
        },
        "p9": {
            "p9bg": "EEPS439",
            "p9a": ["EEPS465","CEPS465"],
            "p9b": ["EEPS466","CEPS466"],
            "p9c": ["EEPS468","CEPS468"],
            "p9d": ["EEPS469","CEPS469"],
            "p9e": ["ep9e","cp9e"],
            "p9f": ["EEPS474","CEPS474"],
            "p9g": ["EEPS476","CEPS476"],
            "p9h": ["EEPS483","CEPS483"],
            "p9i": ["EEPS467","CEPS467"],
            "p9j": ["EEPS482","CEPS482"],
            "p9n": ["EEPS470","CEPS470"],
            "text1":["EEPS443","CEPS443"],
            "text2":["EEPS451","CEPS451"],
            "text3":["EEPS458","CEPS458"],
            "text4":["EEPS442","CEPS442"],
            "text5":["EEPS460","CEPS460"],
            "text6":["EEPS454","CEPS454"],
            "text7":["EEPS444","CEPS444"],
            "text8":["EEPS448","CEPS448"],
            "text9":["EEPS450","CEPS450"],
            "text10":["EEPS446","EEPS446"],
            "text11":"",
            "text12":["EEPS447","CEPS447"],
            "text13":["EEPS445","CEPS445"],
            "text14":["EEPS456","CEPS456"],
            "text15":["EEPS449","CEPS449"],
            "text16":["EEPS452","CEPS452"],
            "text17":["EEPS457","EEPS457"],
            "text18":["EEPS455","CEPS455"],
            "text19":["EEPS462","CEPS462"],
            "text20":["EEPS463","CEPS463"],
            "text21":["EEPS459","CEPS459"],
            "text22":["EEPS453","CEPS453"],
            "text23":["EEPS461","CEPS461"],
            "text24":"EEPS477",
            "text25":"EEPS479",
            "text26":"CEPS480",
        },
        "p10": {
            "p10bg": "EEPS485",
            "p10a": ["EEPS496","CEPS496"],
            "p10b": ["EEPS498","CEPS498"],
            "p10c": ["EEPS499","CEPS499"],
            "p10d": ["EEPS501","CEPS501"],
            "p10e": ["EEPS505","CEPS505"],
            "p10f": ["EEPS506","CEPS506"],
            "p10g": ["EEPS507","CEPS507"],
            "p10h": ["EEPS042","CEPS042"],
            "p10k": ["EEPS043","CEPS043"],
            "text1":["EEPS488","CEPS488"],
            "text2":["EEPS018","CEPS018"],
            "text3":["EEPS030","CEPS030"],
            "text4":["EEPS035","CEPS035"],
            "text5":["EEPS031","CEPS031"],
            "text6":["EEPS036","CEPS036"],
            "text7":["EEPS037","CEPS037"],
            "text8":["EEPS034","CEPS034"],
            "text9":["EEPS032","CEPS032"],
            "text10":["EEPS033","EEPS033"],
            "text11":["EEPS487","EEPS487"],
            "text12":["EEPS494","CEPS494"],
            "text13":["EEPS022","CEPS022"],
            "text14":["EEPS029","CEPS029"],
            "text15":["EEPS495","CEPS495"],
            "text16":["EEPS489","CEPS489"],
            "text17":["EEPS492","EEPS492"],
            "text18":["EEPS491","CEPS491"],
            "text19":["EEPS019","CEPS019"],
            "text20":["EEPS027","CEPS027"],
            "text21":["EEPS024","CEPS024"],
            "text22":["EEPS036","CEPS036"],
            "text23":["EEPS026","CEPS026"],
            "text24":["EEPS025","CEPS025"],
            "text25":["EEPS493","CEPS493"],
            "text26":["EEPS490","CEPS490"],
            "text27":["EEPS020","CEPS020"],
            "text28":["EEPS032","CEPS032"],
            "text29":["EEPS023","CEPS023"],
            "text30":"EEPS038",
            "text31":"EEPS040",
            "text32":"CEPS041",

           
           
        }
        
    }
};
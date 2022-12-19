import { Main } from "./Main";
import { AudioManager } from "./AudioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Content extends cc.Component {
    @property(cc.Node)
    collider: cc.Node[] = [];

    @property(cc.Node)
    main_spine:cc.Node;

    @property(cc.Node)
    playwith_spine:cc.Node[] = [];

    @property
    text: string = 'hello';
    private page_index: number = 0;
    private page_name: string = '';
    private spine_node: string[];
    private text_node:string[];
    private audio: object;
    private bundle_name:string = '';
    private cur_ske:sp.Skeleton = null;
    private touch_point:cc.Vec2 = null;

    start() {
        
        this.page_index = parseInt(this.node.parent.name);
        this.page_name = Main.page[this.page_index];
        this.spine_node = Main.spine_node[this.page_name];
        this.audio = Main.audio[this.page_name];
        this.text_node = Main.text_node[this.page_name];
        this.bundle_name = Main.bundle;
        let localbundle = cc.assetManager.getBundle(this.bundle_name);
        if(!localbundle){
            cc.assetManager.loadBundle(this.bundle_name,(err,bundle)=>{
                if(!err){
                    console.log("local bundle load");
                    //localbundle = cc.assetManager.getBundle(this.bundle);
                }
            })
        }
        AudioManager.setBundle(this.bundle_name);
        if (0 != this.page_index) {
            var audio_names: any = [];
            for (let key in this.audio) {
                let _name = this.audio[key];
                const type = typeof(_name);
                if(type == "string"){
                    continue
                }
                else{
                    audio_names.push(_name);
                }
                
            }
            cc.log(audio_names);
            AudioManager.preloadAudio(audio_names);
        }
        for (var i = 0; i < this.spine_node.length; i++) {
            let spine_name = this.spine_node[i];
            let spine = this.node.getChildByName(spine_name);
            console.log('spine_name', spine_name);
            if (null != spine) {
                let audio_name = this.audio[spine_name];
                console.log('audio_name', audio_name);
                let ske = spine.getComponent('sp.Skeleton') as sp.Skeleton;
                if(ske != null){
                    ske.paused = true;
                    let spine_root = cc.find("ATTACHED_NODE_TREE/ATTACHED_NODE:root",spine);
                    let spine_touch: cc.Node = null;
                    if(spine_root != null){
                        let bone_root = spine_root.children[0];
                        cc.log('bone_root.name',bone_root.name);
                        spine_touch = bone_root.getChildByName('spine_touch');
                    }
                    cc.log('spine_touch',spine_touch);
                    if(spine_touch != null){
                        spine_touch.on(cc.Node.EventType.TOUCH_START,(touch:cc.Touch)=>{
                            this.touch_point = touch.getLocationInView();
                        });
                        spine_touch.on(cc.Node.EventType.TOUCH_END, (touch:cc.Touch) => {
                            cc.log('spine_touch on event');
                            if(touch.getLocationInView().x == this.touch_point.x && touch.getLocationInView().y == this.touch_point.y){
                                cc.log('ske,this.cur_ske', ske != this.cur_ske);
                                if(ske != this.cur_ske && null !== this.cur_ske){
                                    this.cur_ske.setAnimation(0, 'animation', false);
                                    this.cur_ske.paused = true;
                                }
                                this.cur_ske = ske;
                                ske.paused = false;
                                ske.setAnimation(0, 'animation', false);
                                AudioManager.stopAudio();
                                AudioManager.playAudio(audio_name);
                                
                                ske.setCompleteListener(()=>{
                                    //this.cur_ske = ske;
                                    cc.log("spine touch animation play complete");
                                    //ske.setToSetupPose();
                                    //ske.setAnimation(0, 'animation', false);
                                    //ske.paused = true;
                                });  
                            }
                            
                        });
                    }
                    else{
                        let spine_collider = spine.getComponent(cc.PolygonCollider);
                        let points: cc.Vec2[];
                        if(null != spine_collider){
                            points = spine_collider.points;
                        }
                        spine.on(cc.Node.EventType.TOUCH_START,(touch:cc.Touch)=>{
                            this.touch_point = touch.getLocationInView();
                        });
                        spine.on(cc.Node.EventType.TOUCH_END, (touch:cc.Touch) => {   
                            //cc.log(this.touch_point);
                            //cc.log(touch.getLocationInView());
                            //cc.log(this.touch_point == touch.getLocationInView()); 
                            if(touch.getLocationInView().x == this.touch_point.x && touch.getLocationInView().y == this.touch_point.y){
                                if(null != spine_collider){
                                    let point = spine.convertToNodeSpaceAR(touch.getLocation());
                                    if(cc.Intersection.pointInPolygon(point,points)){
                                        if(ske != this.cur_ske && null !== this.cur_ske){
                                            this.cur_ske.setAnimation(0, 'animation', false);
                                            this.cur_ske.paused = true;
                                        }
                                        this.cur_ske = ske;
                                        ske.paused = false;
                                        ske.setAnimation(0, 'animation', false);
                                        if(this.main_spine != null && spine.name == this.main_spine.name){
                                            for (var i = 0; i < this.playwith_spine.length; i++) {
                                                let pw_ske = this.playwith_spine[i].getComponent('sp.Skeleton') as sp.Skeleton;
                                                if(pw_ske != null){
                                                    pw_ske.paused = false;
                                                    pw_ske.setAnimation(0,'animation1',false);
                                                }
                                            }
                                        }
                                        // ske.setCompleteListener(function(){
                                        //     ske.setAnimation(0,'animation',false);
                                        //     ske.paused = true;
                                        // });
                                         
                                        AudioManager.stopAudio();
                                        AudioManager.playAudio(audio_name);
                                        ske.setCompleteListener(()=>{
                                            //this.cur_ske = ske;
                                            cc.log("spine_collider animation play complete");
                                            //ske.setToSetupPose();
                                            //ske.setAnimation(0, 'animation', false);
                                            //ske.paused = true;
                                        });  
                                    }
                                    else{
                                        cc.log("1");
                                        if(this.collider.length > 0){
                                            cc.log("2");
                                            this.collider.forEach(_colinder => {
                                                
                                            
                                            let _spine_collider = _colinder.getComponent(cc.PolygonCollider);
                                            if(null != _spine_collider){
                                                cc.log("3");
                                                let _point = _colinder.convertToNodeSpaceAR(touch.getLocation());
                                                let _points = _spine_collider.points;
                                                if(cc.Intersection.pointInPolygon(_point,_points)){
                                                    cc.log("4");
                                                    let _audio_name = this.audio[_colinder.name];
                                                    let _ske = _colinder.getComponent('sp.Skeleton') as sp.Skeleton;
                                                    if(_ske != null){
                                                        cc.log("5");
                                                        if(_ske != this.cur_ske && null !== this.cur_ske){
                                                            cc.log("6");
                                                            this.cur_ske.setAnimation(0, 'animation', false);
                                                            this.cur_ske.paused = true;
                                                        }
                                                        this.cur_ske = _ske;
                                                        _ske.paused = false;
                                                        _ske.setAnimation(0, 'animation', false);
                                                        AudioManager.stopAudio();
                                                        AudioManager.playAudio(_audio_name);
                                                        
                                                        _ske.setCompleteListener(()=>{
                                                            //this.cur_ske = ske;
                                                            cc.log("spine animation play complete");
                                                            //ske.setToSetupPose();
                                                            //ske.setAnimation(0, 'animation', false);
                                                            //ske.paused = true;
                                                        });  
                                                    }
                                                }
                                            }
                                        });
                                        }
                                    }
                                }
                                else{
                                    if(ske != this.cur_ske && null !== this.cur_ske){
                                        this.cur_ske.setAnimation(0, 'animation', false);
                                        this.cur_ske.paused = true;
                                    }
                                    this.cur_ske = ske;
                                    ske.paused = false;
                                    ske.setAnimation(0, 'animation', false);
                                    if(this.main_spine != null && spine.name == this.main_spine.name){
                                        for (var i = 0; i < this.playwith_spine.length; i++) {
                                            let pw_ske = this.playwith_spine[i].getComponent('sp.Skeleton') as sp.Skeleton;
                                            if(pw_ske != null){
                                                pw_ske.paused = false;
                                                pw_ske.setAnimation(0,'animation1',false);
                                            }
                                        }
                                    }
                                    // ske.setCompleteListener(function(){
                                    //     ske.setAnimation(0,'animation',false);
                                    //     ske.paused = true;
                                    // }); 
                                    AudioManager.stopAudio();
                                    AudioManager.playAudio(audio_name);
                                    
                                    ske.setCompleteListener(()=>{
                                        //this.cur_ske = ske;
                                        cc.log("spine animation play complete");
                                        //ske.setToSetupPose();
                                        //ske.setAnimation(0, 'animation', false);
                                        //ske.paused = true;
                                    });  
                                }
                            }                            
                            
                        });
                    } 
                    
                }          
            }
        }

        cc.systemEvent.on(Main.TURN_PAGE_ENDED, (pageId: number) => {
            if (null !== this.cur_ske) {
                this.cur_ske.setAnimation(0, 'animation', false);
                this.cur_ske.paused = true;
                this.cur_ske = null;
            }
        })

        for (var i = 0; i < this.text_node.length; i++) {
            let text_name = this.text_node[i];
            let text = this.node.getChildByName(text_name);
            if(null != text){
                let audio_name = this.audio[text_name];
                let animation = text.getComponent(cc.Animation);
                text.on(cc.Node.EventType.TOUCH_START,(touch:cc.Touch)=>{
                    this.touch_point = touch.getLocationInView();
                });
                text.on(cc.Node.EventType.TOUCH_END,(touch:cc.Touch)=>{
                    if(touch.getLocationInView().x == this.touch_point.x && touch.getLocationInView().y == this.touch_point.y){
                        if(null != animation)
                            animation.play();
                        if(null !== this.cur_ske){
                            this.cur_ske.setAnimation(0, 'animation', false);
                            this.cur_ske.paused = true;
                        }
                        AudioManager.stopAudio();
                        AudioManager.playAudio(audio_name);
                    }
                    
                });
            }
        }
        let bg_name = this.page_name + "bg";
        let bg_node = this.node.getChildByName(bg_name);
        if(null !=bg_node){
            bg_node.on(cc.Node.EventType.TOUCH_START,(touch:cc.Touch)=>{
                this.touch_point = touch.getLocationInView();
            });
            bg_node.on(cc.Node.EventType.TOUCH_END,(touch:cc.Touch)=>{
                let audio_name = this.audio[bg_name];
                if(touch.getLocationInView().x == this.touch_point.x && touch.getLocationInView().y == this.touch_point.y && null != audio_name){
                    if(null !== this.cur_ske){
                        this.cur_ske.setAnimation(0, 'animation', false);
                        this.cur_ske.paused = true;
                    }
                    AudioManager.stopAudio();
                    AudioManager.playAudio(audio_name);
                }
            });
        }

    }

    // update (dt) {}
}

import { PICTURE_BOOK_SCROLL_ENDED, TouchDirectionEnum } from "./Types";
import { AudioManager } from "../AudioManager";
import { Main } from "../Main";
import Pages from "./Pages";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PageManger extends cc.Component {

    @property(cc.Node)
    gameContainerNode: cc.Node = null
    public pageIndex = 0;
    public pageName = "";
    public total = 0;
    public audio:object;
    start() {
        this.total = this.gameContainerNode.children.length;
        cc.log('pagesImanger.start');
        //this.hidePageNode();
        // cc.macro.CLEANUP_IMAGE_CACHE = false;
        // cc.dynamicAtlasManager.enabled = true;
    }

    onLoad() {
        this._oriMultTouch = cc.macro.ENABLE_MULTI_TOUCH;
        cc.systemEvent.on(
            PICTURE_BOOK_SCROLL_ENDED,
            (touchDirection) => {
                cc.log('scroll-ended');         
                let changeIdx = 0;
                if (touchDirection == TouchDirectionEnum.LEFT) {
                    changeIdx = this.pageIndex + 1;          
                } else {
                    changeIdx = this.pageIndex - 1;
                }
                this.pageIndex = changeIdx;
                this.hidePageNode();
                //this.showPageNode();
                this.gameContainerNode.children.forEach(el => {   
                    el.zIndex = 1;        
                    cc.log(el.name,el.opacity);     
                    el.getComponent('Pages').reset();
                });                
                this.gameContainerNode.getChildByName(this.pageIndex + '').zIndex = this.pageIndex + 4;
                AudioManager.stopAudio();
                this.pageName = Main.page[this.pageIndex];
                this.audio = Main.audio[this.pageName];
                var audio_names: string[] = [];
                for (let key in this.audio) {
                    let _name: string = this.audio[key] as string;
                    audio_names.push(_name);
                }
                //AudioManager.preloadAudio(audio_names);
                cc.log(this.pageIndex, this.gameContainerNode.children);
                
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jsb.reflection.callStaticMethod("com/jmkid/activities/CocosActivity",
                        "turnPage",
                        "(Ljava/lang/String;)V",
                        (this.pageIndex + 1).toString()
                    );
                }
                if (cc.sys.os == cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod("CocosMsgClass", "turnPage:", (this.pageIndex + 1).toString());
                }

                cc.systemEvent.emit(Main.TURN_PAGE_ENDED,this.pageIndex + 1);
            },
            this
        );
    }

    /**
      * 获取上一页的截图纹理
      *
      * @return {*}  {cc.SpriteFrame}
      * @memberof PanelManger
      */
    getPreBackPic(): cc.SpriteFrame {
        let sf: cc.SpriteFrame = null;
        if (this.pageIndex > 0) {
            if(this.gameContainerNode.getChildByName(this.pageIndex - 1 + '')){
                sf = Main.backPictures[this.pageIndex - 1];
            }
            //sf = this.gameContainerNode.getChildByName(this.pageIndex - 1 + '').getComponent('Pages').backPicture
        }
        return sf
    }

    /**
     * 获取下一页的截图纹理
     *
     * @return {*}  {cc.SpriteFrame}
     * @memberof PanelManger
     */
    getNextBackPic(): cc.SpriteFrame {
        let sf: cc.SpriteFrame = null;
        if (this.pageIndex + 1 < this.total) {
            if(this.gameContainerNode.getChildByName(this.pageIndex + 1 + '')){
                sf = Main.backPictures[this.pageIndex + 1];
            }
            //console.log('getNextBackPic',this.pageIndex);
            //sf = this.gameContainerNode.getChildByName(this.pageIndex + 1 + '').getComponent('Pages').backPicture
        }
        return sf
    }

    /**
     * 将下一页置于当前页下层
     *
     * @memberof PanelManger
     */
    setNextzIndex2Top() {
        const pre = this.gameContainerNode.getChildByName(this.pageIndex - 1 + '')
        const next = this.gameContainerNode.getChildByName(this.pageIndex + 1 + '')
        if (pre) {
            pre.zIndex = this.pageIndex
        }
        if (next) {
            next.zIndex = this.pageIndex+1;
            next.active = true;
        }
    }
    /**
     * 将上一页置于当前页下层
     *
     * @memberof PanelManger
     */
    setPrezIndex2Top() {
        const pre = this.gameContainerNode.getChildByName(this.pageIndex - 1 + '')
        const next = this.gameContainerNode.getChildByName(this.pageIndex + 1 + '')
        if (pre) {
            pre.zIndex = this.pageIndex+1
            pre.active = true;
        }
        if (next) {
            next.zIndex = this.pageIndex
        }
    }

    private _oriMultTouch: boolean = false;
    onDisable() {
        cc.macro.ENABLE_MULTI_TOUCH = this._oriMultTouch;
    }

    /**
     * 隐藏节点
     */
    hidePageNode(){
        let page_index = this.pageIndex;
        for(var i=0;i<this.gameContainerNode.children.length;i++){
            if(i != page_index){
                const page = this.gameContainerNode.getChildByName(i+'');
                if(page && true == page.active){
                    page.active = false;
                }
            }
            // if(i< this.total && i - page_index > 2){
            //     const page = this.gameContainerNode.getChildByName(i+'');
            //     if(page && true == page.active){
            //         page.active = false;
            //     }
            // }
            // if(page_index - i > 2){
            //     const page = this.gameContainerNode.getChildByName(i+'');
            //     if(page && true == page.active){
            //         page.active = false;
            //     }
            // }
            // if(i< this.total && i - page_index > 2){
            //     const page = this.gameContainerNode.getChildByName(i+'');
            //     if(page && 255 == page.opacity){
            //         page.opacity = 0;
            //     }
            // }
            // if(page_index - i > 2){
            //     const page = this.gameContainerNode.getChildByName(i+'');
            //     if(page && 255 == page.opacity){
            //         page.opacity = 0;
            //     }
            // }
        }
    }

    /**
     * 显示节点
     */
    showPageNode(){
        const pre = this.gameContainerNode.getChildByName(this.pageIndex - 1 + '')
        const current = this.gameContainerNode.getChildByName(this.pageIndex + '')
        const next = this.gameContainerNode.getChildByName(this.pageIndex + 1 + '')
        if (current && false == current.active) {
            current.active = true;
        }
        // if (pre && false == pre.active) {
        //     pre.active = true;
        // }
        // if (next && false == next.active) {
        //     next.active = true;
        // }
        // if (pre && 0 == pre.opacity) {
        //     // const pages = pre.getComponent(Pages);
        //     // pages.initData();
        //     // pages.takePicture();
        //     pre.opacity = 1;
        // }
        // // if (current && 0 == current.opacity) {
        // //     const pages = current.getComponent(Pages);
        // //     pages.initData();
        // //     pages.takePicture();
        // //     current.opacity = 1;
        // // }
        // if (next && 0 == next.opacity) {
        //     // const pages = next.getComponent(Pages);
        //     // pages.initData();
        //     // pages.takePicture();
        //     next.opacity = 1;
        // }
        
    }
}

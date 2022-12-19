// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private bundle_name:string = 'cocos';
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log(this.bundle_name);
            cc.assetManager.loadBundle(this.bundle_name,(err,bundle)=>{
                if(!err){
                    console.log("local bundle load");
                    let localbundle = cc.assetManager.getBundle(this.bundle_name);
                    localbundle.loadScene('book', function (err, scene) {
                        cc.director.runScene(scene);
                    });
                    //localbundle = cc.assetManager.getBundle(this.bundle);
                }
            })
    }

    // update (dt) {}
}

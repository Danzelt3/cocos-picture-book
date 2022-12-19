import { Main } from "./Main";

export class AudioManager {
    // private static _audio: cc.AudioClip = null;
    private static _audio_num: number = -1;
    private static bundle: string = '';

    private static _cachedAudioClipMap: Record<string, cc.AudioClip> = {};

    private static timerObj: object = {};

    public static setBundle(bundle_name: string) {
        this.bundle = bundle_name;
    }

    public static preloadAudio(audio_names: any) {
        let localbundle = cc.assetManager.getBundle(this.bundle);
        for (var i = 0; i < audio_names.length; i++) {
            let audios = audio_names[i];

            for (let j = 0; j < audios.length; j++) {
                const _audio_name = audios[j];
                console.log(_audio_name)
                const path = `resources/Audio/${_audio_name}`;
                let cachedAudioClip = AudioManager._cachedAudioClipMap[path];
                if (cachedAudioClip) {
                    console.log('cachedAudioClip', cachedAudioClip);
                }
                else {
                    localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
                        if (err) {
                            console.warn(err);
                            return;
                        }
                        console.log('audio clip', clip);
                        AudioManager._cachedAudioClipMap[path] = clip;
                    });
                }

            }

            // const path = `Audio/${audio_names[i]}`;
            // let cachedAudioClip = AudioManager._cachedAudioClipMap[path];
            // if (cachedAudioClip) {
            //     console.log('cachedAudioClip', cachedAudioClip);
            // }
            // else {
            //     cc.assetManager.resources.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
            //         if (err) {
            //             console.warn(err);
            //             return;
            //         }
            //         console.log('audio clip', clip);
            //         AudioManager._cachedAudioClipMap[path] = clip;
            //     });
            // }
        }
    }

    public static clearTime() {
        for (let key in this.timerObj) {
            clearTimeout(this.timerObj[key])
        }
    }

    public static async playAudio(audio_name: any) {
        // for (let key in this.timerObj) {
        //     clearTimeout(this.timerObj[key])
        // }

        // cc.audioEngine.stop(this._audio_num);
        //cc.log('jym', cc.sys.os);
        if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
            // const video_id:string = this.getAudioByName(audio_name);
            // cc.log('jym', video_id);
            // if (cc.sys.os == cc.sys.OS_ANDROID) {
            //     jsb.reflection.callStaticMethod("com/jmkid/activities/CocosActivity",
            //         "playSound",
            //         "(Ljava/lang/String;)V",
            //         video_id
            //     );
            // }
            // if (cc.sys.os == cc.sys.OS_IOS) {
            //     jsb.reflection.callStaticMethod("CocosMsgClass", "playSound:", video_id);
            // }
        }
        else {
            let localbundle = cc.assetManager.getBundle(this.bundle);
            console.log('localbundle', localbundle);
            if (localbundle) {
                const type = typeof audio_name;
                if ("string" == type) {
                    // for (let key in this.timerObj) {
                    //     clearTimeout(this.timerObj[key])
                    // }
                    const path = `resources/Audio/${audio_name}`;
                    localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
                        if (err) {
                            console.warn(err);
                            return;
                        }
                        console.log('audio clip', clip);
                        this._audio_num = cc.audioEngine.play(clip, false, 1);
                    });
                }
                else {
                    // for (let key in this.timerObj) {
                    //     clearTimeout(this.timerObj[key])
                    // }
                    // const video_id:string = this.getAudioByName(audio_name);
                    // cc.log('video_id',video_id);
                    const audios = audio_name;
                    await this.loadAudios(audios).then(duration_li => {
                        for (let i = 0; i < audios.length; i++) {
                            const _audio_name = audios[i];
                            console.log(_audio_name)
                            const path = `resources/Audio/${_audio_name}`;
                            localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
                                if (i == 0) {
                                    this._audio_num = cc.audioEngine.play(clip, false, 1);
                                }
                                else {
                                    var timeout = 0;
                                    for (let j = 0; j < i + 1; j++) {
                                        timeout += duration_li[j];
                                    }
                                    cc.log('_audio_name', _audio_name);
                                    cc.log('duration_li', duration_li);
                                    cc.log('audios.length', audios.length)
                                    cc.log('timeout', timeout);

                                    this.timerObj[_audio_name] = setTimeout(() => {
                                        this._audio_num = cc.audioEngine.play(clip, false, 1);
                                    }, timeout);
                                }
                            });
                        }
                    });
                    // const audios = audio_name;
                    // var duration_li = [0];
                    // for (let i = 0; i < audios.length; i++) {
                    //     const _audio_name = audios[i];
                    //     const path = `resources/Audio/${_audio_name}`;
                    //     localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
                    //         if (err) {
                    //             console.warn(err);
                    //             return;
                    //         }
                    //         var timeout = 0;
                    //         for (let j = 0; j < duration_li.length; j++) {
                    //             timeout += duration_li[j];
                    //         }
                    //         cc.log('timeout', timeout);
                    //         this.timerObj[_audio_name] = setTimeout(() => {
                    //             this._audio_num = cc.audioEngine.play(clip, false, 1);
                    //         }, timeout);
                    //         duration_li.push(clip.duration * 1000 + 800);
                    //     });

                    // }
                }
            }
        }
    }


    private static async loadAudios(audios: Array<string>): Promise<Array<number>> {
        cc.log("loadAudios");
        let duration: Array<number> = [0];

        let localbundle = cc.assetManager.getBundle(this.bundle);
        for (let i = 0; i < audios.length; i++) {
            const _audio_name = audios[i];
            const path = `resources/Audio/${_audio_name}`;
            localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                duration.push(clip.duration * 1000 + 300);
            });
        }
        return duration;
        //return Promise.resolve()


    }


    // static doplay(audio_name:string, flag:number = 0){
    //     for(let key in this.timerObj){
    //         clearInterval(this.timerObj[key])
    //     }
    //     let localbundle = cc.assetManager.getBundle(this.bundle);
    //     const path = `resources/Audio/${audio_name}`;
    //     if(flag == 1){
    //         localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
    //             if (err) {
    //                 console.warn(err);
    //                 return;
    //             }
    //             return new Promise((resolve,reason)=>{
    //                 cc.log("clip duration",clip.duration);
    //                 this.timerObj[path] = setTimeout(()=>{resolve(Promise)},clip.duration*1000)
    //             })
    //         });

    //     }
    //     else{
    //         localbundle.load(path, cc.AudioClip, (err, clip: cc.AudioClip) => {
    //             if (err) {
    //                 console.warn(err);
    //                 return;
    //             }
    //             console.log('audio clip', clip);
    //             this._audio_num = cc.audioEngine.play(clip, false, 1);
    //         });
    //     }



    // }

    // static getAudioByName(audio_name: string) {
    //     const data_list = Main.sound["data"];
    //     audio_name = audio_name + ".mp3";
    //     for (var i = 0; i < data_list.length; i++) {
    //         //cc.log('jym',data_list[i].node);
    //         //cc.log('jym',audio_name,data_list[i].file_name);
    //         if (audio_name == data_list[i].file_name) {
    //             return data_list[i];
    //         }
    //     }

    //     return "";
    // }

    // static getAudioByName(audio_name: any) {
    //     const data_list = Main.sound["data"];
    //     const type = typeof audio_name;
    //     if ("string" == type) {
    //         audio_name = audio_name + ".mp3";
    //         for (var i = 0; i < data_list.length; i++) {
    //             //cc.log('jym',data_list[i].node);
    //             //cc.log('jym',audio_name,data_list[i].file_name);
    //             if (audio_name == data_list[i].file_name) {
    //                 return data_list[i].video_id;
    //             }
    //         }
    //     }
    //     else{
    //         var video_list : Array<string> = [];
    //         for (let i = 0; i < audio_name.length; i++) {
    //             var _audio_name = audio_name[i];
    //             _audio_name = _audio_name + ".mp3";
    //             for (let j = 0; j < data_list.length; j++) {
    //                 if (_audio_name == data_list[j].file_name) {
    //                     video_list.push(data_list[j].video_id);
    //                 }

    //             }
    //         }
    //         return video_list.join();
    //     }


    //     return "";
    // }

    public static stopAudio() {
        this.clearTime();
        if (-1 != this._audio_num) {
            cc.audioEngine.stop(this._audio_num);
        }

    }
}

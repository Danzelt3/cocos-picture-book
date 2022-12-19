import PageManger from "./pageslManger";
import { Capture } from "./PictureUtil";
import TexturePlus from "./TexturePlus";
import { Main } from "../Main";
import { PICTURE_BOOK_SCROLL_ENDED, TouchDirectionEnum } from "./Types";

const { ccclass, property } = cc._decorator;
const Epsilon = 1e-6;
let temp_v2_vector = new cc.Vec2();
let temp_v2_vector_2 = new cc.Vec2();
let temp_v2_vector_3 = new cc.Vec2();
let temp_v2_vector_4 = new cc.Vec2();
let temp_v2_pos = new cc.Vec2();
let temp_v2_pos_2 = new cc.Vec2();
let _temp_v2 = cc.v2();
let _temp_v2_2 = cc.v2();
let _temp_v3 = cc.v3();
let _temp_v3_2 = cc.v3();


@ccclass
export default class Pages extends cc.Component {

  private _startPos: cc.Vec2 = cc.v2(0, 0); // 开始点
  private _currtPos: cc.Vec2 = cc.v2(0, 0); // 当前点
  private touchDirection: TouchDirectionEnum = TouchDirectionEnum.LEFT; // 翻页方向
  private errorValue = 5; // 拖动多少自动翻页
  private _isAutoScrolling: boolean = false; // 是否处于自动切页中
  public isTouching = false;
  private _isLockTouch: boolean = false; // 当手指滑动到绘本的一半时会自动切页，这个过程中滑动会失效，这时要重新点击屏幕去操作切页
  private _pages_num:string = '3';
  @property({ type: cc.Node })
  shadowNode: cc.Node = null;

  @property({ type: cc.Node })
  TextureNode: cc.Node = null;

  @property({ type: cc.Graphics })
  graph: cc.Graphics = null;

  onLoad() {
    this.setPolyMask(this.node.getComponent(cc.Mask));
    const shadowScale = this.adjustScale();
    this._shadowOffset *= shadowScale;
    this._shadowMaxLength *= shadowScale;
    this._shadowMinLength *= shadowScale;
    this._pages_num = (Main.page.length - 1).toString();

  }
  public adjustScale() {
    const stageW = cc.view.getVisibleSize().width;
    const stageH = cc.view.getVisibleSize().height;
    const scale = Math.min(stageW / 1440, stageH / 1080);
    //cc.log(stageW,stageH)
    return scale;
  }
  private _prePic: cc.SpriteFrame = null;
  private _nextPic: cc.SpriteFrame = null;

  start() {
    //console.log(this.node.name);
    this.initData();
    this._addTouchEvent();
    // this.scheduleOnce(()=>{
    this.takePicture()
    // },1)
  }
  public backPicture: cc.SpriteFrame = null; // 翻页时用到的背面的图片
  /**
   * 生成翻页时需要的图片
   *
   * @memberof MainTimeline
   */
  takePicture() {
    this.backPicture = Capture.Instance.captureNodeToSpriteFrame(this.node, false, false);
    const index = parseInt(this.node.name);
    if (null == Main.backPictures[index]) {
      let sf: cc.SpriteFrame = this.backPicture.clone();
      Main.backPictures[index] = sf;
      if (0 == index) {
        cc.log(Main.backPictures);
        const pageManger = this.node.parent.getComponent(PageManger);
        pageManger.hidePageNode();
      }
    }
  }

  pictureTest(poly, splitUv) {

    const mapPoly = poly
      .map((el) => {
        return cc.v2(el.x, el.y);
      })
      .reverse();
    const uvPoly = splitUv
      .map((el, idx) => {
        return cc.v2(1 - el.x, el.y);
      })
      .reverse();
    this.TextureNode.getComponent(TexturePlus).uvs = uvPoly;

    this.TextureNode.getComponent(TexturePlus).vertices =
      mapPoly;
  }

  /**
   * 初始化包围盒
   *
   * @memberof NewClass
   */
  initData() {

    this._origin_polygons = [
      cc.v2(-this.node.width / 2, -this.node.height / 2),
      cc.v2(this.node.width / 2, -this.node.height / 2),
      cc.v2(this.node.width / 2, this.node.height / 2),
      cc.v2(-this.node.width / 2, this.node.height / 2),
    ];
    this._origin_uvs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(1, 1), cc.v2(0, 1)];
  }

  private _addTouchEvent() {
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      (e: cc.Event.EventTouch) => {
        //cc.log('this.node.name',this.node.name);
        const pageManger = this.node.parent.getComponent(PageManger)
        //console.log(this.node.zIndex);
        this.node.zIndex = pageManger.pageIndex + 3;
        if (this._isAutoScrolling) return;
        this.isTouching = true;
        this.touchDirection = TouchDirectionEnum.LEFT;
        this._isLockTouch = false;
        this._startPos = e.getLocation();
        const inNodePos = this.node.convertToNodeSpaceAR(this._startPos);
        if (inNodePos.x < 0) {
          this.touchDirection = TouchDirectionEnum.RIGHT;
        }

        this._prePic = pageManger.getPreBackPic();
        this._nextPic = pageManger.getNextBackPic();
        // if(pageManger.pageIndex >= 2){
        //     this._nextPic = pageManger.getPushNextBackPic();
        // }        
        if (this.touchDirection == TouchDirectionEnum.LEFT) {
          //cc.log('this._nextPic',this._nextPic);
          this._setTurnPageSpriteFrame(this._nextPic)
          pageManger.setNextzIndex2Top()
        } else {
          this.TextureNode.getComponent(TexturePlus).spriteFrame = this._prePic
          this._setTurnPageSpriteFrame(this._prePic)
          pageManger.setPrezIndex2Top()
        }
      },
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_MOVE,
      (e: cc.Event.EventTouch) => {
        if (this._isLockTouch || this._isAutoScrolling) return;
        const pos = e.getLocation();
        if (
          Math.pow(pos.x - this._startPos.x, 2) +
          Math.pow(pos.y - this._startPos.y, 2) >=
          Math.pow(this.errorValue, 2)
        ) {
          this._currtPos = pos.clone();
          this.onTouchEnd(pos);
        }
      },
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      (e: cc.Event.EventTouch) => {
        if (this._isLockTouch || this._isAutoScrolling) return;
        this.isTouching = false;
        const endPos = e.getLocation();
        if (
          Math.pow(endPos.x - this._startPos.x, 2) +
          Math.pow(endPos.y - this._startPos.y, 2) >=
          Math.pow(this.errorValue, 2)
        ) {
          this.changePage();
        }
      },
      this
    );
    this.node.on(
      cc.Node.EventType.TOUCH_CANCEL,
      (e: cc.Event.EventTouch) => {
        if (this._isLockTouch || this._isAutoScrolling) return;
        this.isTouching = false;
        const endPos = e.getLocation();
        if (
          Math.pow(endPos.x - this._startPos.x, 2) +
          Math.pow(endPos.y - this._startPos.y, 2) >=
          Math.pow(this.errorValue, 2)
        ) {
          this.changePage();
        }
      },
      this
    );
  }

  private _origin_polygons: cc.Vec2[] = []; // 翻页区域的坐标
  private _origin_uvs: cc.Vec2[] = []; // 翻页区域的uv
  /**
   * 是否可以翻页
   *
   * @return {*} 
   * @memberof Pages
   */
  _getCanTurnPage() {
    //const pageManger = this.node.parent.getComponent(PageManger);
    if (this.touchDirection == TouchDirectionEnum.LEFT && this.node.name == this._pages_num) {
      return false
    }
    if (this.touchDirection == TouchDirectionEnum.RIGHT && this.node.name == '0') {
      return false
    }
    return true
  }
  private onTouchEnd(pos: cc.Vec2) {
    let originX = this.node.width / 2;
    _temp_v2 = this._startPos.clone();
    const inNodePos = this.node.convertToNodeSpaceAR(this._startPos);
    if (inNodePos.x < 0) {
      originX = -this.node.width / 2;
    }
    originX = this.node.convertToWorldSpaceAR(cc.v2(originX, 0)).x
    const isCanTurnPage = this._getCanTurnPage();
    if (!isCanTurnPage) return
    _temp_v3.set(cc.v3(originX, _temp_v2.y, 0));
    _temp_v3 = this.node.convertToNodeSpaceAR(_temp_v3);
    _temp_v2.set(cc.v2(_temp_v3.x, _temp_v3.y));
    _temp_v2_2 = pos;
    _temp_v3_2.set(cc.v3(_temp_v2_2.x, _temp_v2_2.y, 0));
    _temp_v3_2 = this.node.convertToNodeSpaceAR(_temp_v3_2);
    _temp_v2_2.set(cc.v2(_temp_v3_2.x, _temp_v3_2.y));
    const { splitUvs, splitPolygons } = this.splitPolygon(_temp_v2, _temp_v2_2);
    this._setShadow(splitPolygons);
    this._drawDeugBoundingBox(splitPolygons);
    const mask = this.node.getComponent(cc.Mask);
    this.polyMask(mask, splitPolygons[0]);
    this.pictureTest(splitPolygons[1], splitUvs[1]);
  }

  private _shadowOffset = 10;// 阴影偏移量
  private _shadowMaxLength = 80;// 阴影的最大宽度
  private _shadowMinLength = 50;// 阴影的最小宽度

  /**
   * 设置书缝隙的阴影
   *
   * @private
   * @param {cc.Vec2[][]} splitPolygons
   * @memberof NewClass
   */
  private _setShadow(splitPolygons: cc.Vec2[][]) {
    this.shadowNode.active = true;
    const centerLinePoints = splitPolygons[0].filter((el) => {
      return splitPolygons[1].find((ele) => {
        return ele.x == el.x && ele.y == el.y;
      });
    });
    let vec2 = cc.v2(0, 0);
    if (centerLinePoints[0].y - centerLinePoints[1].y >= 0) {
      vec2 = cc.v2(centerLinePoints[0].x - centerLinePoints[1].x, centerLinePoints[0].y - centerLinePoints[1].y);
    } else {
      vec2 = cc.v2(-centerLinePoints[0].x + centerLinePoints[1].x, -centerLinePoints[0].y + centerLinePoints[1].y);
    }
    const angle = (vec2.angle(cc.v2(1, 0)) * 180) / Math.PI;
    this.shadowNode.angle = angle;
    let offset = this._shadowOffset;
    if (this.touchDirection == TouchDirectionEnum.RIGHT) {
      offset = - this._shadowOffset;
    }
    this.shadowNode.position = cc.v3(
      (centerLinePoints[0].x + centerLinePoints[1].x) / 2 + offset,
      (centerLinePoints[0].y + centerLinePoints[1].y) / 2,
      0
    );
    this.shadowNode.width = vec2.mag();
    const centerPoint = cc.v2((centerLinePoints[0].x + centerLinePoints[1].x) / 2, (centerLinePoints[0].y + centerLinePoints[1].y) / 2)

    let currHeight = Math.abs(Math.abs(centerPoint.x) / this.node.width * 2) * this._shadowMaxLength
    if (Math.abs(centerPoint.x) < 50) {
      this.shadowNode.opacity = 30
    } else {
      this.shadowNode.opacity = 100
    }
    this.shadowNode.height = Math.max(currHeight, this._shadowMinLength) + offset
    //cc.log(this.shadowNode.x, this.shadowNode.y, this.shadowNode.width, this.shadowNode.height)
  }
  /**
   *
   * 设置debug包围盒，便于调试
   * @private
   * @param {cc.Vec2[][]} splitPolygons
   * @memberof NewClass
   */
  private _drawDeugBoundingBox(splitPolygons: cc.Vec2[][]) {
    // return
    if (!this.graph) return;
    this.graph.clear();
    splitPolygons.forEach((element) => {
      element.forEach((el, idx) => {
        if (idx == 0) {
          this.graph.moveTo(el.x, el.y);
        }
        this.graph.lineTo(el.x, el.y);
        if (idx == element.length - 1) {
          this.graph.lineTo(element[0].x, element[0].y);
        }
      });
      this.graph.stroke();
    });
  }
  /**
   * 分割多边形
   *
   * @param {cc.Vec2} touchStart 触点的起始坐标
   * @param {cc.Vec2} touchEnd // 当前的坐标
   * @param {cc.Vec2[]} polygon // 当前的多边形
   * @param {cc.Vec2[]} uvs
   * @return {*}
   * @memberof NewClass
   */
  splitPolygon(touchStart: cc.Vec2, touchEnd: cc.Vec2) {
    const polygon = this._origin_polygons;
    const uvs = this._origin_uvs;
    if (polygon.length < 3) return { splitPolygons: null, splitUvs: null };
    cc.Vec2.subtract(temp_v2_vector, touchEnd, touchStart);
    temp_v2_vector.multiplyScalar(0.5); //触摸向量
    cc.Vec2.multiplyScalar(temp_v2_vector_2, temp_v2_vector, 1);
    temp_v2_vector_2 = temp_v2_vector_2.rotate(Math.PI / 2); //垂直向量
    cc.Vec2.add(temp_v2_pos, touchStart, temp_v2_vector); //分割中点
    temp_v2_vector.normalizeSelf();
    let splitPolygons: cc.Vec2[][] = [[], []];
    let splitUvs: cc.Vec2[][] = [[], []];
    for (let index = 0; index < polygon.length; index++) {
      const pos = polygon[index];
      const pos_next = polygon[(index + 1) % polygon.length];
      const uv = uvs[index];
      const uv_next = uvs[(index + 1) % uvs.length];

      cc.Vec2.subtract(temp_v2_vector_3, pos, temp_v2_pos);
      const dotValue = this.dumpValue(temp_v2_vector.dot(temp_v2_vector_3));
      cc.Vec2.subtract(temp_v2_vector_3, pos_next, temp_v2_pos);
      const dotValueNext = this.dumpValue(temp_v2_vector.dot(temp_v2_vector_3));
      cc.Vec2.subtract(temp_v2_vector_3, pos_next, pos);
      if (Math.abs(dotValue) === 0) {
        // 刚好在点上
        splitPolygons[0].push(pos);
        splitPolygons[1].push(pos.clone());
        splitUvs[0].push(uv);
        splitUvs[1].push(uv_next.clone());
      } else if (dotValue > 0) {
        // 在前面
        splitPolygons[0].push(pos);
        splitUvs[0].push(uv);
        if (dotValueNext < 0) {
          let [t1, t2] = this.linelinePoint(
            pos,
            temp_v2_vector_3,
            temp_v2_pos,
            temp_v2_vector_2
          );
          temp_v2_pos_2.set(
            cc.v2(
              pos.x + temp_v2_vector_3.x * t1,
              pos.y + temp_v2_vector_3.y * t1
            )
          );

          splitPolygons[0].push(temp_v2_pos_2.clone());
          splitPolygons[1].push(temp_v2_pos_2.clone());
          cc.Vec2.subtract(temp_v2_vector_3, uv_next, uv);
          temp_v2_pos_2.set(
            cc.v2(
              uv.x + temp_v2_vector_3.x * t1,
              uv.y + temp_v2_vector_3.y * t1
            )
          );
          splitUvs[0].push(temp_v2_pos_2.clone());
          splitUvs[1].push(temp_v2_pos_2.clone());
          this._autoTurnPageWhenMovetoCenterLine(splitPolygons)
        }
      } else {
        // 在后面
        // splitPolygons[1].push(pos)
        cc.Vec2.subtract(temp_v2_vector_4, temp_v2_pos, pos);
        const dotLength = temp_v2_vector_4.dot(temp_v2_vector) * 2;
        temp_v2_pos_2.set(
          cc.v2(
            pos.x + temp_v2_vector.x * dotLength,
            pos.y + temp_v2_vector.y * dotLength
          )
        );
        splitPolygons[1].push(temp_v2_pos_2.clone());

        splitUvs[1].push(uv);
        if (dotValueNext > 0) {
          const [t1, t2] = this.linelinePoint(
            pos,
            temp_v2_vector_3,
            temp_v2_pos,
            temp_v2_vector_2
          );
          temp_v2_pos_2.set(
            cc.v2(
              pos.x + temp_v2_vector_3.x * t1,
              pos.y + temp_v2_vector_3.y * t1
            )
          );
          splitPolygons[0].push(temp_v2_pos_2.clone());
          splitPolygons[1].push(temp_v2_pos_2.clone());

          cc.Vec2.subtract(temp_v2_vector_3, uv_next, uv);
          temp_v2_pos_2.set(
            cc.v2(
              uv.x + temp_v2_vector_3.x * t1,
              uv.y + temp_v2_vector_3.y * t1
            )
          );
          splitUvs[0].push(temp_v2_pos_2.clone());
          splitUvs[1].push(temp_v2_pos_2.clone());
          this._autoTurnPageWhenMovetoCenterLine(splitPolygons)
        }
      }
    }

    return { splitPolygons, splitUvs };
  }

  private _distance = 30
  _autoTurnPageWhenMovetoCenterLine(splitPolygons) {
    const centerLinePoints = splitPolygons[0].filter((el) => {
      return splitPolygons[1].find((ele) => {
        return ele.x == el.x && ele.y == el.y;
      });
    });
    if (centerLinePoints.length == 2) {
      if ((Math.abs(centerLinePoints[0].x) < this._distance || Math.abs(centerLinePoints[1].x) < this._distance) && !this._isAutoScrolling) {
        this.changePage();
      }
    }
  }

  reset() {
    this._isAutoScrolling = false;
    this._startPos = cc.v2(0, 0);
    this._currtPos = cc.v2(0, 0);
    this.shadowNode.active = false;
    this.TextureNode.getComponent(TexturePlus).spriteFrame = null;
    this.TextureNode.getComponent(TexturePlus).vertices = [
      new cc.Vec2(0, 0),
      new cc.Vec2(0, 0),
      new cc.Vec2(0, 0),
      new cc.Vec2(0, 0),
    ]
    this.polyMask(this.node.getComponent(cc.Mask), this._origin_polygons)
    // this.backPicture = null;
    // this.shadowNode.y = -2000;
  }
  /**
   * 设置多边形遮罩
   *
   * @param {cc.Mask} mask
   * @param {*} polygon
   * @memberof NewClass
   */
  polyMask(mask: cc.Mask, polygon) {
    // @ts-ignore
    mask._updateGraphics(polygon);
  }
  /**
   * 重写遮罩，使其支持多边形遮罩
   *
   * @param {cc.Mask} mask
   * @memberof NewClass
   */
  public setPolyMask(mask: cc.Mask) {
    // @ts-ignore
    mask._updateGraphics = function (polygon) {
      let node = this.node;
      // @ts-ignore
      let graphics = mask._graphics;
      // Share render data with graphics content
      graphics.clear(false);
      // @ts-ignore
      let width = node._contentSize.width;
      // @ts-ignore
      let height = node._contentSize.height;
      // @ts-ignore
      let x = -width * node._anchorPoint.x;
      // @ts-ignore
      let y = -height * node._anchorPoint.y;
      if (!polygon) {
        graphics.rect(x, y, width, height);
        graphics.close();
        graphics.fill();
        return;
      }
      graphics.lineWidth = 10;
      graphics.fillColor.fromHEX("#ff0000");

      if (polygon.length === 0) polygon.push(cc.v2(0, 0));
      graphics.moveTo(polygon[0].x, polygon[0].y);
      for (let i = 1; i < polygon.length; i++) {
        graphics.lineTo(polygon[i].x, polygon[i].y);
      }
      graphics.lineTo(polygon[0].x, polygon[0].y);
      graphics.fill();
    };
  }
  dumpValue(value: number): number {
    if (Math.abs(value) < Epsilon) {
      return 0;
    } else if (value > 0) {
      return 1;
    } else {
      return -1;
    }
  }

  linelinePoint(p1: cc.Vec2, p1Dir: cc.Vec2, p2: cc.Vec2, p2Dir: cc.Vec2) {
    const a1 = p1Dir.x,
      b1 = -p2Dir.x,
      c1 = p2.x - p1.x;
    const a2 = p1Dir.y,
      b2 = -p2Dir.y,
      c2 = p2.y - p1.y;
    const d = a1 * b2 - a2 * b1,
      d1 = c1 * b2 - c2 * b1,
      d2 = a1 * c2 - c1 * a2;
    const t1 = d1 / d,
      t2 = d2 / d;

    return [t1, t2];
  }

  private _setTurnPageSpriteFrame(spriteFrame: cc.SpriteFrame) {
    this.TextureNode.getComponent(TexturePlus).spriteFrame = spriteFrame
  }

  /**
   * 切页
   *
   * @memberof Pages
   */
  changePage() {
    const isCanTurnPage = this._getCanTurnPage();
    if (!isCanTurnPage) return
    this._isAutoScrolling = true;
    this._isLockTouch = true;
  }
  update(dt) {
    // return 
    if (!this._isAutoScrolling) return;
    let endX = -this.node.width / 2;
    if (this.touchDirection == TouchDirectionEnum.RIGHT) {
      endX = this.node.width / 2;
    }

    const endxInWorld = this.node.convertToWorldSpaceAR(cc.v2(endX, 0)).x
    this._currtPos.x = cc.misc.lerp(this._currtPos.x, endxInWorld, 0.1);
    this._currtPos.y = cc.misc.lerp(this._currtPos.y, this._startPos.y, 0.1);
    if (Math.abs(this._currtPos.x - endxInWorld) < 5) {
      this._currtPos.x = endxInWorld;
    }
    if (Math.abs(this._currtPos.y - this._startPos.y) < 5) {
      this._currtPos.y = this._startPos.y;
    }
    if (this._currtPos.x == endxInWorld && this._currtPos.y == this._startPos.y) {
      this._isAutoScrolling = false;
      this.polyMask(this.node.getComponent(cc.Mask), this._origin_polygons)
      cc.systemEvent.emit(PICTURE_BOOK_SCROLL_ENDED, this.touchDirection)
      return
    }
    this.onTouchEnd(cc.v2(this._currtPos.x, this._currtPos.y));
  }

  onDisable() {
    cc.assetManager.releaseAsset(this.backPicture);
  }
}

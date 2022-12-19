import TextureAssembler from "./TextureAssembler";

let _vec2_temp = new cc.Vec2();
let _mat4_temp = new cc.Mat4();

const { ccclass, inspector, executeInEditMode, mixins, property } =
  cc._decorator;

@ccclass
// @executeInEditMode
export default class TexturePlus extends cc.Sprite {
  _assembler: cc.Assembler = null;

  onLoad() {
    this.node["_hitTest"] = this._hitTest.bind(this);
    // this._updateVerts();

  }

  start() {}

  private _updateVerts() {
    this.setVertsDirty();
  }

  public _validateRender() {}

  public _resetAssembler() {
    let assembler = (this._assembler = new TextureAssembler());
    assembler.init(this);
    this._updateColor();
    this.setVertsDirty();
  }

  _hitTest(cameraPt: cc.Vec2) {
    let node = this.node;
    let size = node.getContentSize(),
      w = size.width,
      h = size.height,
      testPt = _vec2_temp;

    node["_updateWorldMatrix"]();
    // If scale is 0, it can't be hit.
    if (!cc.Mat4.invert(_mat4_temp, node["_worldMatrix"])) {
      return false;
    }
    cc.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);
    // return CommonUtils.isInPolygon(testPt, this.polygon);
  }
  private _uvs: cc.Vec2[] = [
    new cc.Vec2(0, 0),
    new cc.Vec2(1, 0),
    new cc.Vec2(1, 1),
    new cc.Vec2(0, 1),
  ];
  private _vertices: cc.Vec2[] = [
    new cc.Vec2(0, 0),
    new cc.Vec2(0, 0),
    new cc.Vec2(0, 0),
    new cc.Vec2(0, 0),
  ];

  @property({ type: [cc.Vec2] })
  public get uvs() {
    return this._uvs;
  }
  public set uvs(points: cc.Vec2[]) {
    this._uvs = points;
    this._updateVerts();
  }
  @property({ type: [cc.Vec2] })
  public get vertices() {
    return this._vertices;
  }
  public set vertices(points: cc.Vec2[]) {
    this._vertices = points;
    this._updateVerts();
  }
}

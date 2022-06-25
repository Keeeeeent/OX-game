/**
 * HTMLを配列と連動させるクラス　（コントローラー）を作成して
 * ○×ゲームの実装を行っていく。
 */
export default class model{
    private base:[number[],number[],number[]]
    private turn:number
    // 初期化処理
    constructor(){
        this.base = [[null,null,null],[null,null,null],[null,null,null]]
        this.turn = 0
    }
    // 描画処理
    private init():void{
        for (let i = 0; i < this.base.length; i++) {
            for (let j = 0; j < this.base[i].length; j++) {
                if (this.base[i][j] != null) {
                    if (this.base[i][j] === 1) {
                        document.getElementById(i + "." + j).innerText = "×"
                    }else{
                        document.getElementById(i + "." + j).innerText = "○"
                    }
                    }
            }
        }
        this.game()
    }
    // イベントリスナーを設置処理
    public set_listener():void{
        for (let i = 0; i < this.base.length; i++) {
            for (let j = 0; j < this.base[i].length; j++) {
                document.getElementById(i + "." + j).addEventListener("click",()=>{
                    if(this.game()){return}
                    if (this.base[i][j] === null) {
                        this.base[i][j] = this.change_base()
                        this.init()
                    }
                })
            }
        }
    }
    // ○と×を交互にする処理
    private change_base():number{
        if (this.turn === 0) {
            this.turn = 1
            document.getElementById("turn").innerText = "次は　○のターン"
        }else{
            this.turn = 0
            document.getElementById("turn").innerText = "次は　×のターン"
        }
        return this.turn
    }
    // ゲーム判定処理
    private game():boolean{
        for (let i = 0; i < 3; i++) {
            if (this.base[i][0] != null && this.base[i][1] === this.base[i][0] && this.base[i][2] === this.base[i][0]) {
                this.winner_test()
                return true
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.base[0][i] != null && this.base[1][i] === this.base[0][i] && this.base[2][i] === this.base[0][i]) {
                this.winner_test()
                return true
            }
        }
        if(this.base[0][0] != null && this.base[1][1] === this.base[0][0] && this.base[2][2] === this.base[0][0]){
            this.winner_test()
            return true
        }
        if(this.base[0][2] != null && this.base[1][1] === this.base[0][2] && this.base[2][0] === this.base[0][2]){
            this.winner_test()
            return true
        }
        if(this.draw()){
            document.getElementById("turn").innerText = "引き分け！！"
            return true
        }
        return false
    }
    private winner_test():void{
        if (this.turn === 0) {
            document.getElementById("turn").innerText = "○の勝利！！"
        }else{
            document.getElementById("turn").innerText = "×の勝利！！"
        }
    }
    private draw():boolean{
        let null_counter:number = 0
        for (let i = 0; i < this.base.length; i++) {
            for (let j = 0; j < this.base[i].length; j++) {
                if(this.base[i][j] === null){null_counter += 1}
            }
        }
        if(null_counter === 0){return true}
        return false
    }
    public reset():void{
        this.base = [[null,null,null],[null,null,null],[null,null,null]]
        for (let i = 0; i < this.base.length; i++) {
            for (let j = 0; j < this.base[i].length; j++) {
                document.getElementById(i + "." + j).innerHTML= ""
            }
        }
        this.turn = 0
        document.getElementById("turn").innerText = "×のターン"
    }
}
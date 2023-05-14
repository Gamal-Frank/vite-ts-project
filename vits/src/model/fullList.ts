import ListItems from "./listitems";

interface List {
    list:ListItems[],
    load():void,
    save():void,
    clearList():void,
    addItem(itemObj:ListItems):void,
    removeItem(id:string):void
}

export default class fullList implements List{
    static instance:fullList= new fullList()
   private constructor(private _list:ListItems[]=[]){}

    get list():ListItems[]{
        return this._list
    }

    load(): void {
        const storedList:string|null=localStorage.getItem("myList")
        if(typeof storedList!=="string")return
        const parsedList:{_id:string,_item:string,_checked:boolean}[] = JSON.parse(storedList)
        parsedList.forEach(itemObj=>{
            const newListitem = new ListItems(itemObj._id,itemObj._item,itemObj._checked)
            fullList.instance.addItem(newListitem)})
           
            


    }
    save(): void {
        localStorage.setItem("myList",JSON.stringify(this._list))
    }
    clearList(): void {
        this._list=[]
        this.save()
    }
    addItem(itemObj: ListItems): void {
        this._list.push(itemObj)
        this.save
    }
    removeItem(id: string): void {
        this._list=this._list.filter(item=>item.id !== id)
        this.save
    }
}


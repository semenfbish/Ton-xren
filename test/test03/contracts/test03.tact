import "@stdlib/deploy";

contract Test03 with Deployable {
    id: Int as uint32;
    flag1: String = "981171089711632108111120";
    init(id: Int) {
        self.id = id;
    }
    get fun flag(): String {
        return self.flag1;
    }
    get fun id(): Int {
        return self.id;
    }
}

//types of Notification
type Notify = 'sms'|'email'|'push';

//Logger
class Logger{
    private static instance:Logger;
    private constructor(){}

    static getInstance():Logger{
        if(!this.instance){
            this.instance = new Logger;
        }
        return this.instance;
    }
    log(type: Notify, orderId: number, message:string):void{
        console.log(`[LOG] ${type} - ${orderId} - ${new Date().toISOString()} - ${message}`);
    }
}
//interface for types of Notification
interface Notifier{
    send(order: Order, message: string): void;
}

class EmailNotification implements Notifier{
    send(order: Order, message: string): void {
        console.log(`Заказ №${order.orderId} - ${message}`);
    }
}

class SMSNotification implements Notifier{
    send(order: Order, message: string): void {
        console.log(`Заказ №${order.orderId} - ${message}`);
    }
}

class PushNotification implements Notifier{
    send(order: Order, message: string): void {
        console.log(`Заказ №${order.orderId} - ${message}`);
    }
}
//factory
class NotificationFactory{
    static create(type:Notify):Notifier{
        switch(type){
            case "sms":
                return new SMSNotification();
            case "email":
                return new EmailNotification();
            case "push":
                return new PushNotification();
            default:
                throw new Error('Неизвестный тип уведомления');
        }
    }
}
//realization of class Order
class Order{
    private static lastId:number=0;
    public orderId:number;

    constructor(public userEmail:string, public userPhone:string){
        this.orderId = ++Order.lastId;
    }
}

class NotificationService{
    sendNotification(order:Order, type:Notify, message:string){
        const sender = NotificationFactory.create(type);
        sender.send(order, message);
        Logger.getInstance().log(type, order.orderId, message);
    }
}
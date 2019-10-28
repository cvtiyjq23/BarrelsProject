const N =1;//колчечство бочек
const time =6; //время за которое необходимо заполнить ведро (с)
const VedroSize = 15; //размер ведра (в услови 15 литров)

class barrel {
    constructor (BarrelId,BarrelVolume, SuccessfulFilling = 0, NotSuccessfulFilling = 0,EmptyStatusBarrel = false) {
        this.BarrelId = BarrelId;
        this.BarrelVolume = BarrelVolume;
        this.SuccessfulFilling = SuccessfulFilling;
        this.NotSuccessfulFilling = NotSuccessfulFilling;
        this.EmptyStatusBarrel = EmptyStatusBarrel;

    }
}

let  allBarrels = {}; //массив бочек


let volume_1 = 5.0; // объем заполнения 1 этапа (л) float
let volume_2 = 5.0; //объем заполнения 2 этапа (л) float
let velocity_1 = 2.0;// скорость заполнения 1 этапа (л/c) float
let velocity_2 = 3.0; //скорость заполнения 2 этапа (л/c) float
let velocity_3 = 4.0; //скорость заполнения 3 этапа (л/c) float


// Обслуживающие переменые
let Vedro = 0.0;
let GlobalVedro = 0.0;
let ClogStatus = false;
let SecondCounter = 1;
let FillingOneDan = false;
let FillingTowDan = false;
let FillingThreeDan = false;
// Обслуживающие переменые конец

function  Clog () {
    let rand =  Math.round((Math.random() * 4) + 0);
    if (rand === 1)
    {
        return true;
    }
    else {
        return false;
    }
}

function CheckTime(i) {
    if (SecondCounter > time)
    {
        return "TimeOut";
    }

}

function StandartFilling(i,LocalVolume,LocalVelocity,FillingDan) {
    let LocalVedro = 0.0
    while (FillingDan !==true)
    {

        if (CheckTime(i) === "TimeOut"){
            return "TimeOut";
        }
        if ((LocalVedro + LocalVelocity) < LocalVolume) { //налив
            LocalVedro = LocalVedro + LocalVelocity;
            Vedro = Vedro + LocalVelocity;
            allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - LocalVelocity;
        }

        if ((LocalVedro + LocalVelocity) >= LocalVolume) { //доливка
            allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - (LocalVolume - LocalVedro);
            Vedro =Vedro + (LocalVolume - LocalVedro);
            LocalVedro = 0.0;// зануляем ведро так как процесс заполнения ведра завершён
            SecondCounter++;

            FillingDan = true;
            return true;
        }
        SecondCounter++;
    }
}
function CustomFilling(i,LocalVolume,LocalVelocity,FillingDan) {
    let LocalVedro = 0.0;
    while (FillingDan !==true)
    {
        if (CheckTime(i) === "TimeOut"){return "TimeOut";}
          if ((LocalVedro + LocalVelocity) < LocalVolume) { //налив
            if (allBarrels[i].BarrelVolume >= LocalVelocity)
            {
                LocalVedro = LocalVedro + LocalVelocity;
                Vedro = Vedro + LocalVelocity;
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - LocalVelocity;
            }
            else
            {
                if (i === N) {// проверяет есть ли откуда черпать
                    console.log("Есть ли откуда черпать? ")
                    allBarrels[i].EmptyStatusBarrel = true;
                    allBarrels[i].NotSuccessfulFilling++;
                    return "NextBarrelNot";
                } // проверяет есть ли  следующая бочка

                LocalVedro = LocalVedro + allBarrels[i].BarrelVolume;
                    Vedro = Vedro + allBarrels[i].BarrelVolume;
                LocalVedro =LocalVedro  + (LocalVelocity - allBarrels[i].BarrelVolume);
                    Vedro = Vedro + (LocalVelocity - allBarrels[i].BarrelVolume);
                 allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - (LocalVelocity-allBarrels[i].BarrelVolume);
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - allBarrels[i].BarrelVolume;
                allBarrels[i].EmptyStatusBarrel = true;
            }
        }

        //------------------------------------------------------------------------------
        if ((LocalVedro + LocalVelocity) >= LocalVolume) { //доливка



            if (allBarrels[i].EmptyStatusBarrel === true) // если ведро пустое то берём всё из соседнего
            {
                if (LocalVolume === LocalVedro){return true}
                allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - (LocalVolume - LocalVedro);
                LocalVedro =LocalVedro + (LocalVolume - LocalVedro);
                    Vedro = Vedro + (LocalVolume - LocalVedro);
            }

            if (allBarrels[i].BarrelVolume > 0 || allBarrels[i].BarrelVolume > 0.0)
            {
                let NadoDolit =  LocalVelocity - allBarrels[i].BarrelVolume;
                if (i === N) {// проверяет есть ли откуда черпать
                    console.log("Есть ли откуда черпать? ")
                    allBarrels[i].EmptyStatusBarrel = true;
                    allBarrels[i].NotSuccessfulFilling++;
                    return "NextBarrelNot";
                } // проверяет есть ли  следующая бочка
                 LocalVedro =LocalVedro + (NadoDolit - allBarrels[i].BarrelVolume);
                    Vedro =Vedro + (NadoDolit - allBarrels[i].BarrelVolume);
                NadoDolit = NadoDolit - allBarrels[i].BarrelVolume;
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - allBarrels[i].BarrelVolume;
                allBarrels[i].EmptyStatusBarrel = true;
                allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - NadoDolit;
                FillingDan = true;
                return true;
            }
        }
        SecondCounter++;
    }
}
function CheckResBarrel(i,LocalVolume) {

    if (allBarrels[i].BarrelVolume >= LocalVolume) {

        return true;
    }
    else {return false}
}


function Filling(i) {
let LocalVolume =0.0;
let LocalVelocity =0.0;
     if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

    if (FillingOneDan !== true) {
            if (ClogStatus === true){
                LocalVolume = volume_1;
                LocalVelocity = velocity_1 /2;
            }
            else
            {
                LocalVolume = volume_1;
                LocalVelocity = velocity_1;
            }


            if (CheckResBarrel(i,LocalVolume) === true) // если ресурсов хватит просто заполняет если нет то второй метод
            {
                switch(StandartFilling (i,LocalVolume,LocalVelocity,FillingOneDan)) {
                    case "TimeOut":
                        return "TimeOut";
                        break;
                    case true:
                        FillingOneDan = true;
                        break;
                }

            }
            else {
                switch(CustomFilling (i,LocalVolume,LocalVelocity,FillingOneDan)) {
                    case "NextBarrelNot":
                        return "NextBarrelNot";
                        break;
                    case "TimeOut":
                        return "TimeOut";
                        break;
                    case true:
                        FillingOneDan = true;
                        break;
                }
            }
        } // Первая стадия налива

    if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

        if (FillingOneDan === true) {
            SecondCounter++; // повышает счётчик так как при переходе цикл этого не сможет сделать (для первой переходной итерации)
            if (ClogStatus === true){
                LocalVolume = volume_2 ;
                LocalVelocity = velocity_2/2;
            }
            else{
                LocalVolume = volume_2;
                LocalVelocity = velocity_2;
            }


            if (CheckResBarrel(i,LocalVolume) === true) // если ресурсов хватит просто заполняет если нет то второй метод
            {
                switch(StandartFilling (i,LocalVolume,LocalVelocity,FillingTowDan)) {
                    case "TimeOut":
                        return "TimeOut";
                        break;
                    case true:
                        FillingTowDan = true;
                        break;
                }
            }
            else {
                switch(CustomFilling (i,LocalVolume,LocalVelocity,FillingTowDan)) {
                    case "NextBarrelNot":
                        return "NextBarrelNot";
                        break;
                    case "TimeOut":
                        return "TimeOut";
                        break;
                    case true:
                        FillingTowDan = true;
                        break;
                }
            }
        } // Вторая стадия налива

    if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

        if (FillingOneDan === true && FillingTowDan === true) {
            SecondCounter++; // повышает счётчик так как при переходе цикл этого не сможет сделать (для первой переходной итерации)
            if (ClogStatus === true)
            {
                LocalVolume = VedroSize - (volume_1 + volume_2);
                LocalVelocity = velocity_3 /2;
            }
            else
            {
                LocalVolume = VedroSize - (volume_1 + volume_2);
                LocalVelocity = velocity_3;
            }



            if (CheckResBarrel(i,LocalVolume) === true) // если ресурсов хватит просто заполняет если нет то второй метод
            {
                switch(StandartFilling (i,LocalVolume,LocalVelocity,FillingThreeDan)) {
                    case "TimeOut":
                        return "TimeOut";
                        break;

                    case true:
                        FillingThreeDan = true;
                        break;
                }
            }
            else {
                switch(CustomFilling (i,LocalVolume,LocalVelocity,FillingThreeDan)) {
                    case "NextBarrelNot":
                        return "NextBarrelNot";
                        break;
                    case "TimeOut":
                        return "TimeOut";
                        break;
                    case true:
                        FillingThreeDan = true;
                        break;
                }
            }
        } // Третья стадия налива

        if (FillingOneDan === true && FillingTowDan === true && FillingThreeDan === true ){
            allBarrels[i].SuccessfulFilling++;
             FillingOneDan = false;
             FillingTowDan = false;
             FillingThreeDan = false;
             SecondCounter =1;

            console.log("Налив № "+ allBarrels[i].SuccessfulFilling + " Успешно");
            Vedro = 0.0;
        }// Тригер для увиличения успешных наливов в бочке
}

function CreateBarrel() {
    for (let i= 0; i<=N; i++)
    {
        let Barrel = new barrel();
        Barrel.BarrelId = i;
       Barrel.BarrelVolume = Math.floor(Math.random() * (150.0 - 135.0) + 135.0).toFixed(2);
        allBarrels[i] = Barrel;
    }
}

function ChangeBarrelForTestCase2() {
    allBarrels[0].BarrelVolume = 5;
    allBarrels[0].SuccessfulFilling = 8;
    allBarrels[1].BarrelVolume = 140;
    allBarrels[1].SuccessfulFilling = 0;

}
function main() {

    for (let i = 0; i<=N;i++)
    {

        if (Clog() === true) // есть ли засло
        {
            ClogStatus = true;
            console.log("Засор в узле налива")
        }

        //-------------------------------------------
        if (allBarrels[i].EmptyStatusBarrel === false) // проверяем пустая ли бочка
        {console.log("Бочка № " + (allBarrels[i].BarrelId + 1 ) + " - " + allBarrels[i].BarrelVolume + " Литров")
            while (allBarrels[i].EmptyStatusBarrel === false) // выполняем пока бочка не станет пустой
            {
                if (allBarrels[i].SuccessfulFilling < 9 && allBarrels[i].BarrelVolume > 0) //проверяем не стала ли бочка пустой на этой итерации
                {
                    switch(Filling(i) ) {
                        case "NextBarrelNot":
                            allBarrels[i].EmptyStatusBarrel = true;
                            allBarrels[i].NotSuccessfulFilling = allBarrels[i].NotSuccessfulFilling + Vedro;
                            Vedro =0.0;
                            break;
                        case "TimeOut":

                            allBarrels[i].NotSuccessfulFilling = allBarrels[i].NotSuccessfulFilling + Vedro;
                            console.log("Таймаут. Налито  " + Vedro + " литра" );

                            Vedro =0.0;
                            SecondCounter = 1;
                            FillingOneDan = false;
                            FillingTowDan = false;
                            FillingThreeDan = false;
                            ClogStatus = false;

                            continue;
                            break;
                    }

                }
                else {allBarrels[i].EmptyStatusBarrel = true;}
                ClogStatus = false; //в конце налива убирает засор



            }
        }

            console.log("Бочка № " + (i + 1) +" - Налито успешно: " + allBarrels[i].SuccessfulFilling  + " ведер. Провальный налив: " + allBarrels[i].NotSuccessfulFilling + " литров.")

    }

}

CreateBarrel();
//ChangeBarrelForTestCase2 // для тест кейса 2
main();
console.log(allBarrels)











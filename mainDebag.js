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
    console.log("Не тронутая бочка - " + allBarrels[i].BarrelId + " в бочке сейчас " + allBarrels[i].BarrelVolume)
    let LocalVedro = 0.0
    while (FillingDan !==true)
    {

        if (CheckTime(i) === "TimeOut"){
            return "TimeOut";
        }

        console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Время  " +  SecondCounter)
        if ((LocalVedro + LocalVelocity) < LocalVolume) { //налив
            console.log("Зашёл в стандартный налив , сейчас в ведре " + LocalVedro + " и остаток в бочке " + allBarrels[i].BarrelVolume + " Заливаем - " + LocalVelocity)

            LocalVedro = LocalVedro + LocalVelocity;
            Vedro = Vedro + LocalVelocity;
            allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - LocalVelocity;
        }

        if ((LocalVedro + LocalVelocity) >= LocalVolume) { //доливка
            console.log("Зашёл в стандартный Долив, сейчас в ведре  " + LocalVedro + " и остаток в бочке " + allBarrels[i].BarrelVolume)
            allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - (LocalVolume - LocalVedro);
            Vedro =Vedro + (LocalVolume - LocalVedro);
            console.log("Залил вот столько  " + (LocalVolume - LocalVedro) + " и остаток в бочке " + allBarrels[i].BarrelVolume + " ВЫШЕЛ")
            LocalVedro = 0.0;// зануляем ведро так как процесс заполнения ведра завершён
            SecondCounter++;
            console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Время  " +  SecondCounter)

            FillingDan = true;
            return true;
        }
        SecondCounter++;
    }
}
function CustomFilling(i,LocalVolume,LocalVelocity,FillingDan) {
    let LocalVedro = 0.0;
    console.log("Не тронутая бочка - " + allBarrels[i].BarrelId + " в бочке сейчас " + allBarrels[i].BarrelVolume)
    while (FillingDan !==true)
    {
        if (CheckTime(i) === "TimeOut"){return "TimeOut";}
        console.log("000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Время  " +  SecondCounter)
        if ((LocalVedro + LocalVelocity) < LocalVolume) { //налив
            if (allBarrels[i].BarrelVolume >= LocalVelocity)
            {
                console.log("Зашёл в !!!КАСТОМНЫЙ!!! налив и на 1 налив хватает , сейчас в ведре " + LocalVedro + " и остаток в бочке " + allBarrels[i].BarrelVolume + " Заливаем - " + LocalVelocity)
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

                console.log("Зашёл в !!!КАСТОМНЫЙ!!! налив и на 1 налив НЕ хватает , сейчас в ведре " + LocalVedro + " и остаток в бочке " + allBarrels[i].BarrelVolume + " Надо залить - " + LocalVelocity + " Заливаем " + allBarrels[i].BarrelVolume )
                LocalVedro = LocalVedro + allBarrels[i].BarrelVolume;
                    Vedro = Vedro + allBarrels[i].BarrelVolume;
                LocalVedro =LocalVedro  + (LocalVelocity - allBarrels[i].BarrelVolume);
                    Vedro = Vedro + (LocalVelocity - allBarrels[i].BarrelVolume);
                console.log("В бочке до вычета жидкости" + allBarrels[i+1].BarrelVolume)
                allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - (LocalVelocity-allBarrels[i].BarrelVolume);
                console.log("В бочке ПОСЛЕ вычета жидкости" + allBarrels[i+1].BarrelVolume)
                console.log("Залазию в бочку " + allBarrels[i+1].BarrelId + " По тому что в бочке " + allBarrels[i].BarrelId + " Всего жидкости" + allBarrels[i].BarrelVolume + " А нужно " +  LocalVelocity);
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - allBarrels[i].BarrelVolume;
                allBarrels[i].EmptyStatusBarrel = true;



            }

        }

        //------------------------------------------------------------------------------
        if ((LocalVedro + LocalVelocity) >= LocalVolume) { //доливка



            if (allBarrels[i].EmptyStatusBarrel === true) // если ведро пустое то берём всё из соседнего
            {
                if (LocalVolume === LocalVedro){return true}
                console.log("Зашёл в !!!КАСТОМНЫЙ!!! Долив, ГДЕ В БОЧКЕ полностью пусто, сейчас в ведре  " + LocalVedro + " и остаток в бочке " + allBarrels[i].BarrelVolume)
                allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - (LocalVolume - LocalVedro);
                LocalVedro =LocalVedro + (LocalVolume - LocalVedro);
                    Vedro = Vedro + (LocalVolume - LocalVedro);
                console.log("значение локального ведра " + LocalVedro)
                console.log("значение локального обьёма " + LocalVolume)
                console.log("Локальный обьём мину " + (LocalVolume - LocalVedro) + "итог" )
                console.log("Залил вот столько В Кастомной Доливке Где бочка пустая = " + (LocalVolume - LocalVedro) + " и остаток в  следующей бочке " + allBarrels[i+1].BarrelVolume + " ВЫШЕЛ")
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
                console.log("Зашёл в !!!КАСТОМНЫЙ!!! Долив, Где в бочке больше нуля");
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
    console.log("+++++++++++++++++++++++++++++++++ Начало налива ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

    if (FillingOneDan !== true) {
        console.log("_________________________________ПЕРВАЯ СТАДИЯ НАЧАЛАСЬ__________________________________________________________");
            if (ClogStatus === true)
            {
                console.log("засор да, скорость налива была " + velocity_1 )
                LocalVolume = volume_1;
                LocalVelocity = velocity_1 /2;
                console.log("Скорость налива стала -  " + LocalVelocity )
            }
            else
            {
                console.log("засор НЕТ")
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
        console.log("_________________________________ПЕРВАЯ СТАДИЯ ЗАКОНЧИЛАСЬ__________________________________________________________");
        } // Первая стадия налива

    if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

        if (FillingOneDan === true) {
            console.log("_________________________________ВТОРАЯ СТАДИЯ НАЧАЛАСЬ__________________________________________________________");
            SecondCounter++; // повышает счётчик так как при переходе цикл этого не сможет сделать (для первой переходной итерации)
            if (ClogStatus === true){
                console.log("засор да, скорость налива была " + velocity_2 )
                LocalVolume = volume_2 ;
                LocalVelocity = velocity_2/2;
                console.log("Скорость налива стала -  " + LocalVelocity )
            }
            else{
                console.log("засор НЕТ")
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
            console.log("_________________________________ВТОРАЯ СТАДИЯ ЗАКОНЧИЛАСЬ__________________________________________________________");
        } // Вторая стадия налива

    if (CheckTime(i) === "TimeOut"){
        return "TimeOut";
    }

        if (FillingOneDan === true && FillingTowDan === true) {
            console.log("_________________________________ТРЕТЬЯ СТАДИЯ НАЧАЛАСЬ__________________________________________________________");
            SecondCounter++; // повышает счётчик так как при переходе цикл этого не сможет сделать (для первой переходной итерации)
            if (ClogStatus === true)
            {
                console.log("засор да, скорость налива была " + velocity_3 )
                LocalVolume = VedroSize - (volume_1 + volume_2);
                LocalVelocity = velocity_3 /2;
                console.log("Скорость налива стала -  " + LocalVelocity )
            }
            else
            {
                console.log("засор НЕТ")
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
            console.log("_________________________________ТРЕТЬЯ СТАДИЯ ЗАКОНЧИЛАСЬ__________________________________________________________");
        } // Третья стадия налива

    console.log("+++++++++++++++++++++++++++++++++ Конец налива ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

        if (FillingOneDan === true && FillingTowDan === true && FillingThreeDan === true ){
            allBarrels[i].SuccessfulFilling++;
             FillingOneDan = false;
             FillingTowDan = false;
             FillingThreeDan = false;
             SecondCounter =1;

            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! УСПЕШНО ЗАВЕРШЁН налив номер "+ allBarrels[i].SuccessfulFilling + " В Ведре сейчас "+ Vedro+ " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            Vedro = 0.0;


            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(" ")
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
        }

        //-------------------------------------------
        if (allBarrels[i].EmptyStatusBarrel === false) // проверяем пустая ли бочка
        {
            while (allBarrels[i].EmptyStatusBarrel === false) // выполняем пока бочка не станет пустой
            {

                if (allBarrels[i].SuccessfulFilling < 9 && allBarrels[i].BarrelVolume > 0) //проверяем не стала ли бочка пустой на этой итерации
                {



                    switch(Filling(i) ) {
                        case "NextBarrelNot":
                            allBarrels[i].EmptyStatusBarrel = true;
                            allBarrels[i].NotSuccessfulFilling = allBarrels[i].NotSuccessfulFilling + Vedro;
                            console.log("Последнее ведро"+Vedro)
                            console.log("Следующего ведра нет , черпать больше неоткуда , залил - " +  Vedro + " И вышел");
                            Vedro =0.0;
                            break;
                        case "TimeOut":

                            allBarrels[i].NotSuccessfulFilling = allBarrels[i].NotSuccessfulFilling + Vedro;
                            console.log("Налив НЕ УСПЕШНЫЙ налито - " +  Vedro);
                            console.log("+++++++++++++++++++++++++++++++++ Конец НЕ УСПЕШНОГО НАЛИВА "+ Vedro+" ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
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

    }





}

CreateBarrel();
//ChangeBarrelForTestCase2 // для тест кейса 2
main();
console.log(allBarrels)









/*
function CustomFilling(i,LocalVolume,LocalVelocity,FillingDan) {
    while (FillingDan !== true)
    {
        if ((Vedro + LocalVelocity) < LocalVolume) { //налив
            if (allBarrels[i].BarrelVolume >= LocalVelocity) // Если хвотает на налив то наливаем
            {
                console.log("Кастомный заполнение НАЛИВ ХВАТАЕТ " + allBarrels[i].BarrelVolume)
                Vedro = Vedro + LocalVelocity;
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - LocalVelocity;
            }
            else
            { // Если не хватает да же на налив то выливаем всё и берём с другой бочки
                if (i === N) {return "NextBarrelNot"}// проверяет есть ли откуда черать
                if (allBarrels[i].BarrelVolume > 0)
                {
                    console.log("Кастомный заполнение С ДРУГОЙ БОЧКИ ")
                    let Ostatok = LocalVelocity -allBarrels[i].BarrelVolume;
                    Vedro = Vedro+allBarrels[i].BarrelVolume;
                    allBarrels[i].BarrelVolume = 0.0;
                    allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - Ostatok;
                    Vedro =Vedro + Ostatok;
                    Ostatok = 0.0;
                }
                else  // Если вообще пусто лезем в соседнее ведро
                {
                    allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - LocalVelocity;
                    Vedro =Vedro + LocalVelocity;
                }
            }
        }

//-----------------------------------------------------------

        if ((Vedro + LocalVelocity) > LocalVolume)
        { //доливка
            console.log("КАСТОМНАЯ ДОЛИВКА")
            let Nado =LocalVolume - Vedro;
            if (allBarrels[i].BarrelVolume >= Nado) // Если хвотает на налив то наливаем
            {
                console.log("в доливке , НА ДОЛИВ ХВАТАЕТ")
                Vedro = Vedro + Nado;
                allBarrels[i].BarrelVolume = allBarrels[i].BarrelVolume - Nado;
            }

             // Если не хватает да же на налив то выливаем всё и берём с другой бочки

                if (i === N) {// проверяет есть ли откуда черпать
                    console.log("Есть ли откуда черпать? ")
                    allBarrels[i].EmptyStatusBarrel = true;
                    allBarrels[i].NotSuccessfulFilling++;
                    return "NextBarrelNot";
                }
                if (allBarrels[i].BarrelVolume > 0)
                {
                    console.log("Если бочка не пустая")
                    let Ostatok = Nado -allBarrels[i].BarrelVolume;
                    Vedro = Vedro+allBarrels[i].BarrelVolume;
                    allBarrels[i].BarrelVolume = 0.0;
                    allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - Ostatok;
                    Vedro =Vedro + Ostatok;
                    Ostatok = 0.0;
                    Nado = 0.0;
                    FillingDan = true;
                    allBarrels[i].EmptyStatusBarrel = true;
                    return true;
                }
                else  // Если вообще пусто лезем в соседнее ведро
                {
                    console.log("Бочка пустая лезем в соседнее ведро")
                    allBarrels[i+1].BarrelVolume = allBarrels[i+1].BarrelVolume - Nado;
                    Vedro =Vedro + Nado;
                    Nado = 0.0;

                    FillingDan = true;
                    return true;
                }


        }

    }
}
*/




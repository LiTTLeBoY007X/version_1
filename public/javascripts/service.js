$(document).ready(() =>{
    if(window.location.pathname === '/service/Electrical_work'){
        $("#serviceType").html('<h1>บริการติดตั้งอุปกรณ์และซ่อมแซมงานไฟฟ้า</h1>')
    }
    if(window.location.pathname === '/service/CCTV_installation_work'){
        $("#serviceType").html('<h1>บริการติดตั้งกล้องวงจรปิด</h1>')
    }
    if(window.location.pathname === '/service/Satellite_dish_installation_work'){
        $("#serviceType").html('<h1>บริการติดตั้งจานดาวเทียม</h1>')
    }
    if(window.location.pathname === '/service/Air_conditioner_cleaning_work'){
        $("#serviceType").html('<h1>บริการล้างแอร์</h1>')
    }
    //service type
    $.post('/dbcontent/service', function (data) {
        var filenames = data.filenames
        var chunks = [];
        for (let i = 0; i < filenames.length; i++) {
            if (filenames[i].length >= 1) {
                function chunkArray(array, chunkSize) {
                    var chunks = [];
                    for (let i = 0; i < array.length; i += chunkSize) {
                        const chunk = array.slice(i, i + chunkSize);
                        chunks.push(chunk);
                    }
                    return chunks;
                }

                const filename = filenames[i];
                const chunk = chunkArray(filename, 1);
                chunks.push(chunk)
            }
        }
        for (let i = 0; i < data.ids.length; i++) {

            var Htmlpost = `
        <div class='container BackGroud-Content col-7 margin-top-10' style='width: 756px'>
            <div class='row'>
                <div class ='col-1'>
                    <img class= 'picturePostAdmin' src="/images/Poo2.png" alt="">
                </div>
                <div class ='col-2 font-ibm-plexsansthai-regular font-reddit-mono' style='padding-top:12px'>
                    AdminPost
                    <p style='font-size:9px' >${data.Datetime[i]}</p>
            </div> 
            <div class='row' style='margin: 10px 10px auto 10px;'>
                <div class='col-12 contentfeed font-ibm-plexsansthai-regular'>${data.contents[i]}</div>
            </div>
            <div class='row' style='margin: 10px 10px auto 10px'>
                <div class='col-12 text-center'>
                    <div class='PictureContent picturefeed${i} heightpic'>
                        
                    </div>
                </div>
            </div>
        </div>
        `
            $('#contentshow').append(Htmlpost)
            if (chunks[i].length === 2) {
                $(`.picturefeed${i}`).append(`<img class=max-width src=${chunks[i][0]}><img class=max-width src=${chunks[i][1]}>`)
            }
            if (chunks[i].length === 1) {
                $(`.picturefeed${i}`).append(`<img class=max-width src=${chunks[i][0]}>`)
            }
            if (chunks[i].length === 4) {
                console.log(i)
                $(`.picturefeed${i}`).append(`<div class=Tem_1_pic_4><img class='tem_1_pic4_poi_1' src=${chunks[i][0]}><img class='tem_1_pic4_poi_2' src=${chunks[i][1]}><img class='tem_1_pic4_poi_3' src=${chunks[i][2]}><img class='tem_1_pic4_poi_4' src=${chunks[i][3]}></div>`)
            }
            if (data.templates[i] === 'Tem_3_1') {
                console.log(i)
                $(`.picturefeed${i}`).append(`<div class=Tem_1_pic_3><img class='tem_1_pic3_poi_1' src=${chunks[i][0]}><img class='tem_1_pic3_poi_2' src=${chunks[i][1]}><img class='tem_1_pic3_poi_3' src=${chunks[i][2]}></div>`)
            }
            if (data.templates[i] === 'Tem_3_2') {
                console.log(i)
                $(`.picturefeed${i}`).append(`<div class=Tem_2_pic_3><img class='tem_2_pic3_poi_1' src=${chunks[i][0]}><img class='tem_2_pic3_poi_2' src=${chunks[i][1]}><img class='tem_2_pic3_poi_3' src=${chunks[i][2]}></div>`)
            }

        }

    })

})

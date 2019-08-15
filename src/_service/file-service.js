
export const fileService = {
    convertJson
}

/**
 * 
 * @param {*} worksheet 
 */
function convertJson(worksheet) {
    let headers = {};
    let data = [];

    for (let z in worksheet) {
        if (z[0] === "!") continue;
        //parse out the column, row, and value
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        }
        let col = z.substring(0, tt);
        let row = parseInt(z.substring(tt));
        let value = worksheet[z].w;

        //store header names
        if (row == 3 && value) {
            headers[col] = value;
            continue;
        }

        if (row > 3) {
            if (!data[row - 3]) data[row - 3] = {};
            // if (col === 'F' && worksheet[z].t !== 'd') {
            //   continue;
            // }
            data[row - 3][headers[col]] = value;
        }
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();

    return Promise.resolve(data);
}
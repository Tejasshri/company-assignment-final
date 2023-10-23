const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

const dbPath = path.join(__dirname, "seatsDatabase.db");
let db;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}/`)
    );
  } catch (e) {
    console.log(`Server Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/", async (request, response) => {
  try {
    const { type } = request.params;
    function getQuery(rowId) {
      const query = `
            SELECT 
                id, 
                CAST(is_booked AS BOOLEAN) AS booked ,
                seat_no AS seatNo,
                row_id AS rowId,
                CASE 
                    WHEN row_id IN ('A','B','C','D') THEN 540 
                    ELSE 420 
                END AS price
            FROM seat 
            WHERE row_id = '${rowId}'`;
      return query;
    }
    const a = await db.all(getQuery("A"));
    const b = await db.all(getQuery("B"));
    const c = await db.all(getQuery("C"));
    const d = await db.all(getQuery("D"));
    const e = await db.all(getQuery("E"));
    const f = await db.all(getQuery("F"));
    const g = await db.all(getQuery("G"));
    const h = await db.all(getQuery("H"));
    const i = await db.all(getQuery("I"));
    const j = await db.all(getQuery("J"));

    response.send({
      premium: {
        A: a,
        B: b,
        C: c,
        D: d,
      },
      standard: {
        E: e,
        F: f,
        G: g,
        H: h,
        I: i,
        J: j,
      },
    });
  } catch (error) {
    console.log(`Error in get Rows: ${error}`);
  }
});

app.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const query = `
        UPDATE seat 
        SET is_booked = true 
        WHERE id = ${id}
    `;
    const dbResponse = await db.run(query);
    response.send({ msg: "Booked" });
  } catch (error) {
    response.send({ msg: "Invalid Input" });
    console.log("Ohhhh Something went wrong");
  }
});

app.get("/seats", async (request, response) => {
  try {
    const data = await db.all(`
        SELECT  
            row.category,
            COUNT(seat.id) as count
        FROM seat JOIN row
        ON seat.row_id = row.row_id
        WHERE seat.is_booked=false
        GROUP BY row.category ;
      `);

    response.send(data);
  } catch (error) {
    console.log(`Error in count: ${error}`);
  }
});

// setTimeout(async () => {
//   const n = await db.exec(`
//     UPDATE seat
//         SET is_booked = true
//         WHERE id = 100
//   `);
//   console.log("EXECUTED", n);
// }, 1000);

// const func = async function (i, c) {
//   const query = `
//         INSERT INTO seat
//             (is_booked, seat_no, row_id)
//         VALUES
//             (false, ${i}, '${c}') ;
//     `;

//   await db.exec(query);
//   console.log("executed", i);
// };

// function add(start, end, row) {
//   let i = start;
//   let intervalId = setInterval(() => {
//     func(i, row);
//     if (i === end) {
//       clearInterval(intervalId);
//     }
//     i++;
//   }, 100);
// }

// add(11, 14, "A");

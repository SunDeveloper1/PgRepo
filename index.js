import queryRunner from './pg.js';


const query='SELECT * FROM actor where actor_id=1 or actor_id=2';
const result=await queryRunner(query);
console.log(result);
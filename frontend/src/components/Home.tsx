import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกการของบประมาณกิจกรรมชมรม</h1>
        <h4>Requirements</h4>
        <p>
        ระบบจัดการชมรมของมหาวิทยาลัยเรียนดีเป็นระบบที่ให้นักศึกษาซึ่งเป็นสมาชิกชมรมสามารถ login
        เข้าระบบ โดยสมาชิกที่เป็นกรรมการบริหารชมรมสามารถแก้ไขข้อมูลระบบบันทึกการของบประมาณกิจกรรม
        ชมรมของแต่ละชมรมได้ในระบบบันทึกการของบประมาณกิจกรรมชมรมจะมีข้อมูลหมวดหมู่และประเภทการ
        ของบประมาณ เมื่อกรรมการบริหารชมรมบันทึกข้อมูลรายการเรียบร้อย กรรมการบริหารชมรมสามารถ
        ตรวจสอบประวัติการของบประมาณกิจกรรมชมรม 
        </p>
      </Container>
    </div>
  );
}
export default Home;
import * as aws from "aws-sdk";

aws.config.update({
  region: "us-east-1",
});

var docClient = new aws.DynamoDB.DocumentClient();

docClient.get({
  TableName: "organization",
  Key: {
    PK: "O#825193027",
    SK: "B#825193027#5e2c88cf31bdc05885192807f2594e0a",
  },
}),
  (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  };

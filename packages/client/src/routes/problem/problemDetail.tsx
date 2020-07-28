import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import { Row, Col } from "antd";
import { Problem } from "shared/types";

const ProblemDetail: React.FC = () => {
  const [detail, setDetail] = useState<Problem | null>(null);
  const params: any = useParams();

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`http://localhost:8181/problems/${params.problem_id}`, {
        headers: headers,
      })
      .then((response) => {
        setDetail(response.data);
      });
  }, []);

  return <div>
    <Row>
      <Col span={16}>
        <h2>{detail?.title}</h2>
<p>{detail?.description}</p>

<pre>
  {detail?.solutions[0].sourceCodes}
</pre>
      </Col>
        <Col offset={1} span={7}>
          <h3>Solutions</h3>
{detail?.solutions.map(x => <h4>{x.title} {x.timeComplexity}</h4>)}
        </Col>

    </Row>
  </div>;
};

export default ProblemDetail;

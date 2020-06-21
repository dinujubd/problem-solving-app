import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const ProblemDetail: React.FC = () => {
  const [detail, setDetail] = useState<any>(null);
  const params:any = useParams();


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

return <div></div>;
};

export default ProblemDetail;

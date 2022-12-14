import { useMemo } from "react";
import { useState, useEffect } from "react";

const useLaterEffect = (callback, dependency) => {
  const [firstRender, setFirstRender] = useState(false);

  const dependenciesMemo = useMemo(() => dependency, [dependency]);

  useEffect(() => {
    if (firstRender) {
      callback();
    } else setFirstRender(true);
  }, [dependenciesMemo, callback, firstRender]);
};

export default useLaterEffect;

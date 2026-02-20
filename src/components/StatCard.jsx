import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, icon: Icon, color, path }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(path)}>
      <div className="card-left">
        <p>{title}</p>
        <h3>
          <CountUp end={value} duration={1.2} />
        </h3>
      </div>

      <div className="card-icon" style={{ background: color }}>
        <Icon size={24} color="#fff" />
      </div>
    </div>
  );
};

export default StatCard;

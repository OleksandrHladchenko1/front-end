import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Worker } from "../../common/Worker";
import { Modal } from "../../common/Modal";
import { AreYouSureModal } from "../../common/AreYouSureModal";
import { EditWorker } from "../../common/EditWorker";

import { APIInteractor } from "../../../services";

import './AdminPage.scss';
import { CreateWorkerModal } from "../../common/CreateWorkerModal/CreateWorkerModal";
import { Button } from "../../common/Button";
import { ChooseExperience } from "../../common/ChooseExperience/ChooseExperience";

export const AdminPage = () => {
  const [workers, setWorkers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isExperienceModalVisible, setIsExperienceModalVisible] = useState(false);
  const [worker, setWorker] = useState({});
  const [specialist, setSpecialist] = useState({
    id_worker: '',
    id_speciality: '',
    id_problem_type: '',
    experience: '',
  });
  const apiIneractor = new APIInteractor();

  const getWorkers = () => {
    apiIneractor.getAllWorkers().then((data) => {
      setWorkers(data);
    });
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const openDeleteModal = (worker) => {
    setWorker(worker);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id) => {
    setWorker({ id });
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    apiIneractor.getAllWorkers().then((data) => {
      setWorkers(data);
      setIsEditModalOpen(false);
    });
  };

  const deleteWorker = () => {
    setWorkers([...workers.filter((car) => car.id !== worker.id)]);
    apiIneractor.deleteWorker(worker.id);
    setIsDeleteModalOpen(false);
  };

  const workerList = workers.map((worker, i) => 
    <Worker
      worker={worker}
      key={i}
      sequence={i}
      onDelete={openDeleteModal}  
      onEdit={openEditModal}
    />
  );

  const showPlusModal = () => {
    setIsExperienceModalVisible(true);
  };

  const onAddSpeciality = ({ id_worker, id_speciality }) => {
    setSpecialist({
      ...specialist,
      id_worker,
      id_speciality,
    });
    showPlusModal();
  };

  const onSubmitSpecialist = (experience, id_problem_type) => {
    setSpecialist({
      ...specialist,
      experience,
      id_problem_type,
    });
    apiIneractor.addSpecialist({
      id_worker: specialist.id_worker,
      id_speciality: specialist.id_speciality,
      id_problem_type,
      experience,
    }).then(() => {
      setIsExperienceModalVisible(false);
    });
  };

  return (
    <main>
      <Modal isModalOpen={isDeleteModalOpen}>
        <AreYouSureModal
          onCancel={closeDeleteModal}
          onSubmit={deleteWorker}
          headerText={
          <FormattedMessage
            id="areYouSure.title.deleteWorker"
            values={{ fullName: worker.fullName }}
          />}
          mainText={<FormattedMessage id="areYouSure.text.deleteWorker" />}
        />
      </Modal>
      <Modal isModalOpen={isCreateModalOpen}>
        <CreateWorkerModal
          onClose={() => setIsCreateModalOpen(false)}
          onFinish={getWorkers}
        />
      </Modal>
      <Modal isModalOpen={isEditModalOpen}>
        <EditWorker
          onSubmit={closeEditModal}
          onClose={closeEditModal}
          workerId={worker.id}
          onPlus={showPlusModal}
          onAddSpeciality={onAddSpeciality}
        />
      </Modal>
      <Modal isModalOpen={isExperienceModalVisible}>
        <ChooseExperience
          onFinish={onSubmitSpecialist}
        />
      </Modal>
      <article className="admin">
        <div className="admin-container">
          <div className="admin__workers">
            <div className="worker__header">
              <ul className="worker__header-list">
                <li className="worker__header-item first">
                  <FormattedMessage id="adminPage.table.firstName" />
                </li>
                <li className="worker__header-item">
                  <FormattedMessage id="adminPage.table.lastName" />
                </li>
                <li className="worker__header-item">
                  <FormattedMessage id="adminPage.table.fatherName" />
                </li>
                <li className="worker__header-item">
                  <FormattedMessage id="adminPage.table.email" />
                </li>
                <li className="worker__header-item">
                  <FormattedMessage id="adminPage.table.phone" />
                </li>
                <li className="worker__header-item last">
                  <FormattedMessage id="adminPage.table.editDelete" />
                </li>
              </ul>
            </div>
            <div className="worker__container-list">
              {workerList}
            </div>
          </div>
          <div className="worker-new">
            <Button
              text="Create new worker"
              className="worker-new__button success button"
              onClick={() => setIsCreateModalOpen(true)}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

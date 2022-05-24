import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Worker } from "../../common/Worker";
import { Modal } from "../../common/Modal";
import { AreYouSureModal } from "../../common/AreYouSureModal";
import { EditWorker } from "../../common/EditWorker";

import { APIInteractor } from "../../../services";

import './AdminPage.scss';

export const AdminPage = () => {
  const [workers, setWorkers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [worker, setWorker] = useState({});
  const apiIneractor = new APIInteractor();

  useEffect(() => {
    apiIneractor.getAllWorkers().then((data) => {
      setWorkers(data);
    });
  }, []);

/*   useEffect(() => {
    console.log(worker);
  }); */

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
      console.log(data);
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
      <Modal isModalOpen={isEditModalOpen}>
        <EditWorker onSubmit={closeEditModal} onClose={closeEditModal} workerId={worker.id} />
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
            {workerList}
          </div>
        </div>
      </article>
    </main>
  );
};

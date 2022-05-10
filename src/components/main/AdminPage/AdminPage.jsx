import React, { useEffect, useState } from "react";

import { Worker } from "../../common/Worker";
import { Modal } from "../../common/Modal";
import { AreYouSureModal } from "../../common/AreYouSureModal";

import { APIInteractor } from "../../../services";

import './AdminPage.scss';
import { EditWorker } from "../../common/EditWorker/EditWorker";

export const AdminPage = () => {
  const [workers, setWorkers] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [workerId, setWorkerId] = useState('');
  const apiIneractor = new APIInteractor();

  useEffect(() => {
    apiIneractor.getAllWorkers().then((data) => {
      setWorkers(data);
    });
  }, []);

  /* useEffect(() => {
    console.log(workers);
  }); */

  const openDeleteModal = (id) => {
    setWorkerId(id);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (id) => {
    setWorkerId(id);
    setIsEditModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const deleteWorker = () => {
    setWorkers([...workers.filter((car) => car.id !== workerId)]);
    apiIneractor.deleteWorker(workerId);
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
          headerText="Delete worker"
          mainText="Are you sure to delete this worker?"
        />
      </Modal>
      <Modal isModalOpen={isEditModalOpen}>
        <EditWorker onClose={closeEditModal} workerId={workerId} />
      </Modal>
      <article className="admin">
        <div className="admin-container">
          <div className="admin__workers">
            <div className="worker__header">
              <ul className="worker__header-list">
                <li className="worker__header-item first">First Name</li>
                <li className="worker__header-item">Last name</li>
                <li className="worker__header-item">Father Name</li>
                <li className="worker__header-item">E-mail</li>
                <li className="worker__header-item">Phone</li>
                <li className="worker__header-item last">Edit/Delete</li>
              </ul>
            </div>
            {workerList}
          </div>
        </div>
      </article>
    </main>
  );
};
